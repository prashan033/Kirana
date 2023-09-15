import { useState,useEffect } from "react";
import { useStyles } from "./ProductListCss";
import { Button,Grid,TextField,Avatar,IconButton,MenuItem,Select,InputLabel,FormControl } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { postData,getData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate } from "react-router-dom";

export default function ProductListInterface(){
    const classes=useStyles()
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [productId,setProductId]=useState('')
    const [productListName,setProductListName]=useState('')
    const [description,setDescription]=useState('')
    const [rate,setRate]=useState('')
    const [offer,setOffer]=useState('')
    const [weight,setWeight]=useState('')
    const [type,setType]=useState('')
    const [stock,setStock]=useState('')
    const [status,setStatus]=useState('')
    const [picture,setPicture]=useState({file:'/assets/shopping-cart.png',bytes:''})
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [productList,setProductList]=useState([])

    const navigate=useNavigate()


     /////fill categoryid and subcategoryid///

     useEffect(function(){
      fetchAllCategory()
    },[])
    
    const fetchAllCategory=async()=>{
      var result=await getData('category/category_list')
      setCategoryList(result.data)
    }

    const fillCategory=()=>{
      return categoryList.map((item)=>{
       
        return <MenuItem value={item.categoryid} >{item.categoryname}</MenuItem>
      })
    }

    const fetchAllSubCategory=async(cid)=>{
      var result=await postData('subcategory/subcategory_list_by_categoryid',{categoryid:cid})
      setSubCategoryList(result.data)
    }

    const handleCategoryChange=(event)=>{
      setCategoryId(event.target.value)
      fetchAllSubCategory(event.target.value)
    }

    const handleSubCategoryChange=(event)=>{
      setSubCategoryId(event.target.value)
      fetchAllProduct(event.target.value)
    }

    const fillSubCategory=()=>{
      return subCategoryList.map((item)=>{
       
        return <MenuItem value={item.subcategoryid} >{item.subcategoryname}</MenuItem>
      })
    }

    const fetchAllProduct=async(cid)=>{
      var result=await postData('product/product_list_by_subcategoryid',{subcategoryid:cid})
      
      setProductList(result.data)
    }

    const fillProductList=()=>{
      return productList.map((item)=>{
       
        return (<MenuItem value={item.productid} >{item.productname}</MenuItem>)
      })
    }
    
    ////////////////////////////////////


    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleSubmit=async()=>{

        var formData=new FormData()
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subCategoryId)
        formData.append('productid',productId)
        formData.append('productlistname',productListName)
        formData.append('description',description)
        formData.append('rate',rate)
        formData.append('offer',offer)
        formData.append('weight',weight)
        formData.append('type',type)
        formData.append('stock',stock)
        formData.append('status',status)
        formData.append('picture',picture.bytes)
        
        var result=await postData('productList/productlistsubmit',formData)
      
        if(result.status)
      {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: result.message,
          showConfirmButton: false,//true krne pr OK krne pr hi alert htega
          timer: 1500
        })
      }
      else
      {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: result.message,
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
    

    return(<div className={classes.container}>
         <div className={classes.box}>
          <Grid container spacing={2}>
            <Grid item xs={12} style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
              
               <div className={classes.headingStyleNew}> 
                Product List 
                </div>
                <div>
            <ViewListIcon onClick={()=>navigate("/dashboard/displayproductlist")} />
          </div>
            </Grid>
            <Grid item xs={4}>
           <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Categories</InputLabel>
           <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryId}
          label="Categories"
          
          onChange={handleCategoryChange} 
           
        >
          <MenuItem>Select Category</MenuItem>
          {fillCategory()}
          </Select>
          </FormControl>
            </Grid>
            <Grid item xs={4}>
           <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sub Categories</InputLabel>
           <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subCategoryId}
          label="Sub Categories"
          onChange={handleSubCategoryChange} 
           
        >
          <MenuItem>Select Category</MenuItem>
          {fillSubCategory()}
          </Select>
          </FormControl>
            </Grid>
            <Grid item xs={4}>
           <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Product</InputLabel>
           <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={productId}
          label="Product Name"
          onChange={(e)=>{setProductId(e.target.value)}} 
           
        >
          <MenuItem>Select Product</MenuItem>
          {fillProductList()}
          </Select>
          </FormControl>
            </Grid>
           <Grid item xs={6}>
            <TextField onChange={(event)=>{setProductListName(event.target.value)}} label="Product list Name " variant="outlined" fullWidth />
           </Grid>
           <Grid item xs={6}>
            <TextField onChange={(event)=>{setDescription(event.target.value)}} label="Description " variant="outlined" fullWidth />
           </Grid>
           <Grid item xs={6}>
            <TextField onChange={(event)=>{setRate(event.target.value)}} label="rate " variant="outlined" fullWidth />
           </Grid>
           <Grid item xs={6}>
            <TextField onChange={(event)=>{setOffer(event.target.value)}} label="Offer% " variant="outlined" fullWidth />
           </Grid>
           <Grid item xs={4}>
            <TextField onChange={(event)=>{setWeight(event.target.value)}} label="Weight " variant="outlined" fullWidth />
           </Grid>
           <Grid item xs={4}>
           <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Type"
          onChange={(event)=>{setType(event.target.value)}}
          
        >
          
          <MenuItem value='g'>g</MenuItem>
          <MenuItem value='Kg'>Kg</MenuItem>
          <MenuItem value='Ml'>Ml</MenuItem>
          <MenuItem value='Ltrs'>Ltrs</MenuItem>
          <MenuItem value='Picecs'>Pieces</MenuItem>
        </Select>
      </FormControl>
      </Grid>
      
          
      <Grid item xs={4}>
            <TextField onChange={(event)=>{setStock(event.target.value)}} label="Stock " variant="outlined" fullWidth />
           </Grid>
           <Grid item xs={12}>
         <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="status"
          onChange={(event)=>{setStatus(event.target.value)}}
          
        >
           
          <MenuItem value='Continue'>Continue</MenuItem>
          <MenuItem value='disContinue'>Discontinue</MenuItem>
          <MenuItem value='Popular'>Popular</MenuItem>
          <MenuItem value='Trending'>Trending</MenuItem>
        </Select>
      </FormControl>
         </Grid>
           <Grid item xs={6}>
          <IconButton  color="primary" aria-label="uplode picture" component="label">
            <input onChange={handlePicture}  hidden accept="*image/*" type="file" />
            <PhotoCamera/>
            </IconButton>

         </Grid>
         <Grid item xs={6}>
         <Avatar
          alt="picture"
          src={picture.file}
          sx={{ width: 56, height: 56 }}
          variant="rounded"
         />
         </Grid>
         <Grid item xs={6}>
          <Button onClick={handleSubmit} variant="contained" fullWidth>Submit</Button>
         </Grid>
         <Grid item xs={6}>
         <Button variant="contained" fullWidth>Reset</Button>
         </Grid>
          </Grid>
         </div>
    </div>)
}