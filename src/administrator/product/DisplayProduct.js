import { useState,useEffect } from "react";
import { useStyles } from "./ProductInterfaceCss";
import { getData,serverURL,postData } from "../services/FetchNodeServices";
import {  Grid,Avatar,TextField,Button,FormControl,InputLabel,Select,IconButton,MenuItem } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material";
import MaterialTable from "@material-table/core";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Swal from "sweetalert2";
import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate } from "react-router-dom";





export default function DisplayProduct(){
    const classes=useStyles()
    const navigate=useNavigate()
    const[productList,setProductList]=useState([])
    const[productId,setProductId]=useState('')
    const[categoryId,setCategoryId]=useState('')
    const[subCategoryId,setSubCategoryId]=useState('')
    const[productName,setProductName]=useState('')
    
    const[description,setDescription]=useState('')
    const[status,setStatus]=useState('')
    const[picture,setPicture]=useState({file:'/assets/shopping-cart.png',bytes:''})
    const[open,setOpen]=useState('')
    const[oldPicture,setOldPicture]=useState('')
    const[btnStatus,setBtnStatus]=useState('')
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
    
   

    const fetchProductList=async()=>{
      
        var result=await getData('product/product_list')
      
        setProductList(result.data)
       
    }

    function showDisplayProduct(){
      
        return(
            <MaterialTable
            title="Product "
            columns={[ 
                {title:'product Id', field:'productid'},
                {title:'Category', field:'categoryname'},
                {title:'SubCategory', field:'subcategoryname'},
                {title:'Product', field:'productname'},
                {title:'Discription', field:'description'},
                {title:'Status', field:'status'},
                {title:'Picture', field:'picture',
              render: rowData => <Avatar src={`${serverURL}/images/${rowData.picture}`} style={{width:75}} variant='rounded'/>}
            ]}
            data={productList}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Cotegory',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add product',
                isFreeAction: true,
                onClick: (event) => navigate('/dashboard/productinterface')
              }
            ]}
            options={{
              search: true
            }}
          />
        )
    }
    
    useEffect(function(){
        fetchProductList()
    },[])

    const handleClose=()=>{
        setOpen(false)
    }

    function displayProductDialog(){
        return(
            <Dialog
            open={open}
            onClose={handleClose}
          >
            
            <DialogContent>
             {showProductForm()}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} >Cancel</Button>
             
            </DialogActions>
          </Dialog>
        )
    }
    
    const handleDeleteData=async()=>{

        setOpen(false)
         var body={productid:productId}
          
          var result=await postData('product/product_delete_icon',body)
          
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
          
        
          fetchProductList()
        


    }

    const handleEditData=async()=>{
        setOpen(false)

        var body={productid:productId,categoryid:categoryId,subcategoryid:subCategoryId,productname:productName,description:description,status:status}
        var result=await postData('product/product_edit_data',body)
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
       fetchProductList()
      
    }
     
    const handleEditIcon=async()=>{
        setBtnStatus(false)
        setOpen(false)
        var formData=new FormData()
        formData.append('productid',productId)
        formData.append('picture',picture.bytes)
        var result=await postData('product/product_edit_icon',formData)

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
       fetchProductList()
      

    }

    const handleCancel=()=>{
        setPicture({file:`${serverURL}/images/${oldPicture}`,bytes:''})
        setBtnStatus(false)
    }

    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setBtnStatus(true)
      }

    function showProductForm(){
        return(<div  >
            <div className={{
                 width:'30vw',
                 height:'auto',
                 padding:15,
                 background:'#fff',
                 borderRadius:10
            }} >
                <Grid container spacing={2} >
                    <Grid item xs={12}>
                     <div className={classes.headingStyle}>
                        Add Product
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
                   <TextField value={productName} onChange={(event)=>{setProductName(event.target.value)}} label="Product Name" variant="outlined" fullWidth />
                 </Grid>
                 <Grid item xs={12} >
                   <TextField value={description} onChange={(event)=>{setDescription(event.target.value)}} label="Discription" variant="outlined" fullWidth />
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
                 <Grid item xs={4}>
              <IconButton  color="primary" aria-label="uplode picture" component="label">
                <input  onChange={handlePicture} hidden accept="*image/*" type="file" />
                <PhotoCamera/>
                </IconButton>
             </Grid>
             <Grid item xs={4}>
             <Avatar
              alt="icon"
              src={picture.file}
              sx={{ width: 56, height: 56 }}
              variant="rounded"
             />
             </Grid>
             <Grid item xs={4}>
            {btnStatus?<>
            <Button onClick={handleEditIcon}>Save</Button>
            <Button onClick={handleCancel} >Cancel</Button></>:<></>}

           </Grid>
             <Grid item xs={6} >
                   <Button onClick={handleEditData}  variant="contained" fullWidth >Edit</Button>
                 </Grid>
                 <Grid item xs={6} >
                   <Button onClick={handleDeleteData} variant="contained" fullWidth >Delete</Button>
                 </Grid>
    
                </Grid>
    
            </div>
    
        </div>)
    }

    const handleOpen=(rowData)=>{
        
        fetchAllSubCategory(rowData.categoryid)
        setProductId(rowData.productid)
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setProductName(rowData.productname)
      
        setDescription(rowData.description)
        setStatus(rowData.status)
        setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
        setOldPicture(rowData.picture)
        setOpen(true)

    }

    return(<div className={classes.displaycontainer}>
        <div className={classes.diaplaybox}>
            {showDisplayProduct()}
        </div>
        {displayProductDialog()}
    </div>)

}