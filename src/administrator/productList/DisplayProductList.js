import { useState,useEffect } from "react";
import { useStyles } from "./ProductListCss";
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





export default function DisplayProductList(){
    const classes=useStyles()
    const navigate=useNavigate()
    const[productList,setProductList]=useState([])
    const[productListId,setProductListId]=useState('')
    const[productId,setProductId]=useState('')
    const[categoryId,setCategoryId]=useState('')
    const[subCategoryId,setSubCategoryId]=useState('')
    const[productListName,setProductListName]=useState('')
    const[description,setDescription]=useState('')
    const[status,setStatus]=useState('')
    const[picture,setPicture]=useState({file:'/assets/shopping-cart.png',bytes:''})
    const[open,setOpen]=useState('')
    const[oldPicture,setOldPicture]=useState('')
    const[btnStatus,setBtnStatus]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [subCategoryList,setSubCategoryList]=useState([])


    const [rate,setRate]=useState('')
    const [offer,setOffer]=useState('')
    const [weight,setWeight]=useState('')
    const [type,setType]=useState('')
    const [stock,setStock]=useState('')
    
    
    
    

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

    const fetchAllProduct=async(cid)=>{
      var result=await postData('product/product_list_by_subcategoryid',{subcategoryid:cid})
      
      setProductList(result.data)
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

    const fillProductList=()=>{
      return productList.map((item)=>{
       
        return (<MenuItem value={item.productid} >{item.productname}</MenuItem>)
      })
    }
    
    
    ////////////////////////////////////
    
   

    const fetchProductList=async()=>{
      
        var result=await getData('productList/productlist_list')
        
        setProductList(result.data)
       
    }

    function showDisplayProduct(){
      
        return(
            <MaterialTable
            title="Product List"
            columns={[ 
              
                {title:'Category', field:'categoryname',
                render: rowData =><div><div>{rowData.categoryname}</div><div>{rowData.subcategoryname}</div></div>
              },
              
                {title:'Product', field:'productname',
                render: rowData =><div><div>{rowData.productname}</div><div>{rowData.productlistname}</div></div>
              },
                
                {title:'Description', field:'description'},
                {title:'Rate ', field:'Rate/Offer',
                render: rowData =><div><div><s>{rowData.rate}</s></div><div>{rowData.offer}</div></div>
              },
                
                {title:'Weight ', field:'weight',
                render: rowData =><div><div>{rowData.weight}{" "}{rowData.type}</div></div>
              },
                {title:'Stock ', field:'Stock/Status',
                render: rowData =><div><div>{rowData.stock}</div><div>{rowData.status}</div></div>
              },
                
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
                onClick: (event) => navigate('/dashboard/productlistinterface')
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
         var body={productlistid:productListId}
          
          var result=await postData('productList/productlist_delete_icon',body)
          
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

        var body={productlistid:productListId,categoryid:categoryId,subcategoryid:subCategoryId,productid:productId,productlistname:productListName,description:description,rate:rate,offer:offer,weight:weight,type:type,stock:stock,status:status}
        var result=await postData('productList/productlist_edit_data',body)
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
        formData.append('productlistid',productListId)
        formData.append('picture',picture.bytes)
        var result=await postData('productList/productlist_edit_icon',formData)

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
        return(<div className={{
         
        }} >
            <div className={{
              width:'80vw',
              height:'auto',
              padding:15,
              background:'#fff',
              borderRadius:10
            }} >
                <Grid container spacing={2} >
                
            <Grid item xs={12}>
               <div className={classes.headingStyleNew}> 
                Product List 
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
            <TextField value={productListName} onChange={(event)=>{setProductListName(event.target.value)}} label="Product list Name " variant="outlined" fullWidth />
           </Grid>
           <Grid item xs={6}>
            <TextField value={description} onChange={(event)=>{setDescription(event.target.value)}} label="Description " variant="outlined" fullWidth />
           </Grid>
           <Grid item xs={6}>
            <TextField value={rate} onChange={(event)=>{setRate(event.target.value)}} label="rate " variant="outlined" fullWidth />
           </Grid>
           
      
           <Grid item xs={6}>
            <TextField value={offer} onChange={(event)=>{setOffer(event.target.value)}} label="Offer% " variant="outlined" fullWidth />
           </Grid>
           <Grid item xs={4}>
            <TextField value={weight} onChange={(event)=>{setWeight(event.target.value)}} label="Weight " variant="outlined" fullWidth />
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
            <TextField value={stock} onChange={(event)=>{setStock(event.target.value)}} label="Stock " variant="outlined" fullWidth />
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
           <Grid item xs={4}>
          <IconButton  color="primary" aria-label="uplode picture" component="label">
            <input onChange={handlePicture}  hidden accept="*image/*" type="file" />
            <PhotoCamera/>
            </IconButton>

         </Grid>
         <Grid item xs={4}>
         <Avatar
          alt="picture"
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
        setProductListId(rowData.productlistid)
        setOffer(rowData.offer)
        setRate(rowData.rate)
        setStatus(rowData.status)
        setStock(rowData.stock)
        setType(rowData.type)
        setWeight(rowData.weight)
       
        setDescription(rowData.description)
        setProductListName(rowData.productlistname)
        setProductId(rowData.productid)
        setSubCategoryId(rowData.subcategoryid)
        
        setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
        setOldPicture(rowData.picture)
        setCategoryId(rowData.categoryid)
        setOpen(true)

    }

    return(<div className={classes.displaycontainer}>
        <div className={classes.diaplaybox}>
            {showDisplayProduct()}
        </div>
        {displayProductDialog()}
    </div>)

}