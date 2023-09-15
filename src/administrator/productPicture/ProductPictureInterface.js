import { useState,useEffect } from "react";
import { useStyles } from "./ProductPictureCss";
import { Grid,TextField,Button,MenuItem,InputLabel,Select } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import Swal from "sweetalert2";
import { DropzoneArea } from "material-ui-dropzone";
import { getData,postData } from "../services/FetchNodeServices";



export default function ProductPictureInterface(){
    const classes=useStyles()
    
    const [pictures,setPictures]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryId,setSubCategoryId]=useState('')
    const [productId,setProductId]=useState('')
    const [productListId,setProductListId]=useState('')


    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])
    const [productList,setProductList]=useState([])
    const [productListList,setProductListList]=useState([])

     /////fill categoryid and subcategoryid///

     useEffect(function(){
        fetchAllCategory()
      },[])
      
      const fetchAllCategory=async()=>{
        var result=await getData('category/category_list')
        setCategoryList(result.data)
      }

      const fetchAllSubCategory=async(cid)=>{
        var result=await postData('subcategory/subcategory_list_by_categoryid',{categoryid:cid})
        setSubCategoryList(result.data)
      }

      const fetchAllProduct=async(sid)=>{
        var result=await postData('product/product_list_by_subcategoryid',{subcategoryid:sid})
        
        setProductList(result.data)
      }
      
      const  fetchAllProductList=async(lid)=>{
        var result=await postData('productList/productlist_list_by_productid',{productid:lid})
        
        setProductListList(result.data)
      }

      const fillCategory=()=>{
        return categoryList.map((item)=>{
         
          return <MenuItem value={item.categoryid} >{item.categoryname}</MenuItem>
        })
      }

      const fillSubCategory=()=>{
        return subCategoryList.map((item)=>{
         
          return <MenuItem value={item.subcategoryid} >{item.subcategoryname}</MenuItem>
        })
      }

      const fillProductList=()=>{
        return productList.map((item)=>{
         
          return (<MenuItem value={item.productid} >{item.productname}</MenuItem>)
        })
      }
     
      const fillProductListList=()=>{
        return productListList.map((item)=>{
         
          return (<MenuItem value={item.productlistid} >{item.productlistname} ({item.weight} {item.type})</MenuItem>)
        })
      }
     
  
      const handleCategoryChange=(event)=>{
        setCategoryId(event.target.value)
        fetchAllSubCategory(event.target.value)
      }
      const handleSubCategoryChange=(event)=>{
        setSubCategoryId(event.target.value)
        fetchAllProduct(event.target.value)
      }
      const handleProductChande=(event)=>{
        setProductId(event.target.value)
        fetchAllProductList(event.target.value)
      }
      

      ////////////////////////////////////


    const handleClick=async()=>{
        var formData=new FormData()
        formData.append('pictures',pictures)
        formData.append('categoryid',categoryId)
        formData.append('subcategoryid',subCategoryId)
        formData.append('productid',productId)
        formData.append('productlistid',productListId)
        pictures.map((item,index)=>{
            formData.append('picture'+index,item)
        })

        var result=await postData('productPicture/productpicture_image_submit',formData)

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
                <Grid item xs={12}>
                    <div className={classes.headingStyleNew}>
                        Product Picture
                    </div>
                </Grid>
                <Grid item xs={3}>
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
            <Grid item xs={3}>
           <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sub Categories</InputLabel>
           <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subCategoryId}
          label="Sub Categories"
          onChange={handleSubCategoryChange} 
           
        >
          <MenuItem>Select Sub Category</MenuItem>
          {fillSubCategory()}
          </Select>
          </FormControl>
            </Grid>
            <Grid item xs={3}>
           <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Product</InputLabel>
           <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={productId}
          label="Product"
          
          onChange={handleProductChande}
           
        >
          <MenuItem>Select Product</MenuItem>
          {fillProductList()}
          </Select>
          </FormControl>
            </Grid>
            <Grid item xs={3}>
           <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Product List</InputLabel>
           <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={productListId}
          label="Product List"
          
          onChange={(e)=>setProductListId(e.target.value)}
           
        >
          
          {fillProductListList()}
          </Select>
          </FormControl>
            </Grid>
                
                <Grid item xs={12}>
           <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={"Drag and drop an Product Picture here or click"}
            onChange={(files) => setPictures(files)}
            filesLimit={7}
            />
           </Grid>
          
           <Grid item xs={6}>
            <Button onClick={handleClick} fullWidth variant="contained" >Submit</Button>
           </Grid>
           <Grid item xs={6}>
           <Button fullWidth variant="contained" >Reset</Button>
          </Grid>

            </Grid>
         
        </div>
    </div>)
}