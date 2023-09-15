import { useState,useEffect } from "react"
import { useStyles } from "./ProductInterfaceCss"
import { Grid,TextField,Avatar,IconButton, Button,MenuItem,Select,InputLabel,FormControl} from "@mui/material"
import { PhotoCamera } from "@mui/icons-material"
import { postData,getData } from "../services/FetchNodeServices"
import Swal from "sweetalert2"
import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate } from "react-router-dom";


export default function ProductInterface(){
    const classes=useStyles()
    const navigate=useNavigate()
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [productName,setProductName]=useState('')
    const [description,setdescription]=useState('')
    const [status,setStatus]=useState('')
    const [picture,setPicture]=useState({file:'/assets/shopping-cart.png',bytes:''})
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])

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

    const fillSubCategory=()=>{
      return subCategoryList.map((item)=>{
       
        return <MenuItem value={item.subcategoryid} >{item.subcategoryname}</MenuItem>
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
        formData.append('productname',productName)
        formData.append('description',description)
        formData.append('status',status)
        formData.append('picture',picture.bytes)

        var result=await postData('product/productsubmit',formData)
        
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

    return(<div className={classes.container} >
        <div className={classes.box} >
            <Grid container spacing={2} >
                <Grid item xs={12} style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <div className={classes.headingStyle}>
                    Add Product
                 </div>
                 <div>
            <ViewListIcon onClick={()=>navigate("/dashboard/displayproduct")} />
          </div>
                </Grid>
                <Grid item xs={12}>
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
            <Grid item xs={12}>
           <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sub Categories</InputLabel>
           <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subCategoryId}
          label="Sub Categories"
          onChange={(event)=>{setSubCategoryId(event.target.value)}} 
           
        >
          <MenuItem>Select Category</MenuItem>
          {fillSubCategory()}
          </Select>
          </FormControl>
            </Grid>
             <Grid item xs={12} >
               <TextField onChange={(event)=>{setProductName(event.target.value)}} label="Product Name" variant="outlined" fullWidth />
             </Grid>
             <Grid item xs={12} >
               <TextField onChange={(event)=>{setdescription(event.target.value)}} label="description" variant="outlined" fullWidth />
             </Grid>
             <Grid item xs={12} >
             <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="status"
          onChange={(event)=>{setStatus(event.target.value)}}
          
        >
           <MenuItem value='-select Status-'>-select Status-</MenuItem>
          <MenuItem value='Continue'>Continue</MenuItem>
          <MenuItem value='disContinue'>Discontinue</MenuItem>
          <MenuItem value='Popular'>Popular</MenuItem>
          <MenuItem value='Trending'>Trending</MenuItem>
        </Select>
      </FormControl>
             </Grid>
             <Grid item xs={6}>
          <IconButton  color="primary" aria-label="uplode picture" component="label">
            <input  onChange={handlePicture} hidden accept="*image/*" type="file" />
            <PhotoCamera/>
            </IconButton>
         </Grid>
         <Grid item xs={6}>
         <Avatar
          alt="icon"
          src={picture.file}
          sx={{ width: 56, height: 56 }}
          variant="rounded"
         />
         </Grid>
         <Grid item xs={6} >
               <Button onClick={handleSubmit}  variant="contained" fullWidth >Submit</Button>
             </Grid>
             <Grid item xs={6} >
               <Button  variant="contained" fullWidth >Cancel</Button>
             </Grid>

            </Grid>

        </div>

    </div>)
}