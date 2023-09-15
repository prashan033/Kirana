import { useState,useEffect } from "react";
import MaterialTable from "@material-table/core";
import { Avatar, } from "@mui/material";
import { useStyles } from "./SubCategoriesCss"
import { getData,serverURL } from "../services/FetchNodeServices";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2"; 
import {  Grid,TextField,Button,FormControl,InputLabel,IconButton,MenuItem } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useNavigate } from "react-router-dom";


export default function DisplayAllSubCategory() {
    const classes=useStyles()
    const navigate=useNavigate()
    const[subCategoryList,setSubCategoryList]=useState([])
    const[open,setOpen]=useState(false)

    const [icon,setIcon]=useState({file:'/assets/shopping-cart.png',bytes:''})
    const [subCategoryId,setSubCategoryId]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [subCategoryName,setSubCategoryName]=useState('')
    const [status,setStatus]=useState('')
    const [btnStatus,setBtnStatus]=useState('')
    const [oldIcon,setOldIcon]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [error,setError]=useState({})

    useEffect(function(){
      fetchAllCategory()
    },[])
    
    const fetchAllCategory=async()=>{
      var result=await getData('Category/category_list')
      setCategoryList(result.data)
    }

    const fillCategory=()=>{
      return categoryList.map((item)=>{
       
        return <MenuItem value={item.categoryid} >{item.categoryname}</MenuItem>

      })
 
    
    }

    const fetchSubCategoryList=async()=>{
        var result=await getData('subCategory/subcategory_list')
        setSubCategoryList(result.data)
       
        
    }

    const handleError=(input,value)=>{
      setError((prev)=>({...prev,[input]:value}))
     }
 
     const validation=()=>{
       var isValid=true
       if(!categoryId)
       { handleError('categoryName','plz input category name .. ')
         isValid=false
       }

       if(!subCategoryName)
       { handleError('categoryName','plz input sub category name .. ')
         isValid=false
       }
 
       if(!status)
       { handleError('status','plz input sub category status .. ')
         isValid=false
       }
 
       /*if(!icon.bytes)
       { handleError('icon','plz select icon for category.. ')
         isValid=false
       }*/
       return isValid
     }

    
    function showSubCategory(){
        return(
            <MaterialTable
            title="Sub Category List"
            columns={[ 
               
                {title:'Sub Category', field:'subcategoryid'},
                {title:'Category ', field:'categoryname'},
                {title:'Name', field:'subcategoryname'},
                {title:'Status', field:'status'},
                {title:'Icon', field:'icon',
             render: rowData => <Avatar src={`${serverURL}/images/${rowData.icon}`} style={{width:75}} variant='rounded'/>}
            ]}
            data={subCategoryList}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'edit category',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add Sub category',
                isFreeAction: true,
                onClick: (event) => navigate('/dashboard/subcategorynew')
              }
            ]}
            options={{
              search: true
            }}
          />
        )
    }

    const handleOpen=(rowData)=>{
      
        setCategoryId(rowData.categoryid)
        setSubCategoryId(rowData.subcategoryid)
        setSubCategoryName(rowData.subcategoryname)
        setStatus(rowData.status)
        setIcon({file:`${serverURL}/images/${rowData.icon}`,bytes:''})
        setOldIcon(rowData.icon)
        setOpen(true)

    }

    const handleClose=()=>{
        setOpen(false)
    }

    function displaySubCategoryDialog(){
       return(
        <Dialog
        open={open}
        onClose={handleClose}
      >
        
        <DialogContent>
         {showSubCategoryForm()}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >Cancel</Button>
         
        </DialogActions>
      </Dialog>

       )
    }

    useEffect(function(){
        fetchSubCategoryList()
  
    },[])

    const handleEdit=async()=>{
        setOpen(false)
      if(validation())
      {
        var body={subcategoryid:subCategoryId,categoryid:categoryId,subcategoryname:subCategoryName,status:status}

        var result=await postData('subCategory/subcategory_edit_data',body)

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
    fetchSubCategoryList()

    }

    const handlePiture=(event)=>{
        setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
       setBtnStatus(true)
    } 

    const handleEditIcon=async()=>{
        setBtnStatus(false)
        setOpen(false)
        var formData=new FormData()
        formData.append('subcategoryid',subCategoryId)
        formData.append('icon',icon.bytes)
        var result=await postData('subcategory/subcategory_edit_icon',formData)

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
       fetchSubCategoryList()

    }   

    const handleCancel=()=>{
        setIcon({file:`${serverURL}/images/${oldIcon}`,bytes:''})
        setBtnStatus(false)
    }
    
    const handleDelete=async()=>{
        setOpen(false)
        var body={subcategoryid:subCategoryId}
         
         var result=await postData('subcategory/subcategory_delete_icon',body)
         
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
         
       
       fetchSubCategoryList()
       

    }

    function showSubCategoryForm(){
        return(
            <div className={{
              width:'30vw',
              height:'auto',
              padding:15,
              background:'#fff',
              borderRadius:10

            }}>
          <Grid container spacing={2} >
          <Grid item xs={12}>
          <div className={classes.headingStyleNew}>
             ADD New Sub Category
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
         onChange={(event)=>{setCategoryId(event.target.value)}} 
         onFocus={()=>handleError('categoryid',null)}
            error={error.categoryId?true:false} 
       >
         <MenuItem>Select Category</MenuItem>
         {fillCategory()}
         </Select>
         </FormControl>
         <div className={classes.errorText}>{error.categoryId}</div>
           </Grid>

           <Grid item xs={12}>
               <TextField value={subCategoryName} error={error.subCategoryName?true:false} helperText={error.subCategoryName} onFocus={()=>handleError('subCategoryName',null)} onChange={(event)=>{setSubCategoryName(event.target.value)}}   label='Sub Category' variant="outlined" fullWidth />
           </Grid>
          
           <Grid item xs={12}>
           <FormControl fullWidth>
         <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
         labelId="demo-simple-select-label"
         id="demo-simple-select"
         value={status}
         label="Satus"
         onChange={(event)=>{setStatus(event.target.value)}}
         onFocus={()=>handleError('status',null)}
            error={error.status?true:false} 
         
       >
          <MenuItem value='-select Status-'>-select Status-</MenuItem>
         <MenuItem value='Continue'>Continue</MenuItem>
         <MenuItem value='disContinue'>Discontinue</MenuItem>
         <MenuItem value='Popular'>Popular</MenuItem>
         <MenuItem value='Trending'>Trending</MenuItem>
       </Select>
       </FormControl>
       <div className={classes.errorText}>{error.status}</div>
           </Grid>
           <Grid item xs={4}>
         <IconButton  color="primary" aria-label="uplode picture" component="label">
           <input onChange={handlePiture} hidden accept="*image/*" type="file" />
           <PhotoCamera/>
           </IconButton>
           

        </Grid>
        <Grid item xs={4}>
        <Avatar
         alt="icon"
         src={icon.file}
         sx={{ width: 56, height: 56 }}
         variant="rounded"
        />
        </Grid>
        <Grid item xs={4}>
            {btnStatus?<>
            <Button onClick={handleEditIcon}>Save</Button>
            <Button onClick={handleCancel} >Cancel</Button></>:<></>}

           </Grid>
           <Grid item xs={6}>
               <Button onClick={handleEdit} variant="contained" fullWidth>Edit</Button>
           </Grid>
           <Grid item xs={6}>
               <Button onClick={handleDelete} variant="contained" fullWidth>Delete</Button>
           </Grid>

       </Grid>


     </div>
  

        )
    }
    
    return(<div className={classes.displaycontainer}>
        <div className={classes.diaplaybox}>
         {showSubCategory()}
        </div>
        {displaySubCategoryDialog()}
    </div>)
}