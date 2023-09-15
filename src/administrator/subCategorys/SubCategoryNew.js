import { useState,useEffect } from "react";
import { useStyles } from "./SubCategoriesCss";
import { Grid,TextField,Button,FormControl,InputLabel,MenuItem,Select,IconButton,Avatar } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { getData, postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import ViewListIcon from '@mui/icons-material/ViewList';

export default function SunCategoryNew(){
    const classes=useStyles()
    const navigate=useNavigate()
    const [status,setStatus]=useState('')
    const [categoryId,setCategoryId]=useState('')
    const [icon,setIcon]=useState({file:'/assets/shopping-cart.png',bytes:''})
    const [subCategoryName,setSubCategoryName]=useState('')
    const [categoryList,setCategoryList]=useState([])
    const [error,setError]=useState({})
  

   /* fill category id or name */

    useEffect(function(){
      fetchAllCategory()
    },[])
    
    const fetchAllCategory=async()=>{
      var result=await getData('category/category_list')
      setCategoryList(result.data)
    }

    const fillCategory=()=>{
      return categoryList.map((item)=>{
       
        return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      })
    }

   ////////////////////////////////////////////////////////////////  
   const handlePiture=(event)=>{
    setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    handleError('icon',null)
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
     { handleError('subCategoryName','plz input sub category name .. ')
       isValid=false
     }

     if(!status)
     { handleError('status','plz input sub category status .. ')
       isValid=false
     }

     if(!icon.bytes)
     { handleError('icon','plz select icon for sub category.. ')
       isValid=false
     }
     return isValid
   }


   const handleClick=async()=>{
    
    if(validation())
    {
    var formData=new FormData()
    formData.append('subcategoryname',subCategoryName)
    formData.append('categoryid',categoryId)
    formData.append('status',status)
    formData.append('icon',icon.bytes)
    var result=await postData('subCategory/subcategorysubmit',formData)

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

   }

  return(<div className={classes.container} >
     <div className={classes.box}>
        <Grid container spacing={2} >
           <Grid item xs={12} style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
           <div className={classes.headingStyleNew}>
              ADD New Sub Category
            </div>
            <div>
            <ViewListIcon onClick={()=>navigate("/dashboard/displayallsubcategory")} />
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
          onFocus={()=>handleError('categoryid',null)}
          error={error.categoryId?true:false}
          onChange={(event)=>{setCategoryId(event.target.value)}} 
           
        >
          <MenuItem>Select Category</MenuItem>
          {fillCategory()}
          </Select>
          </FormControl>
          <div className={classes.errorText}>{error.categoryId}</div>
            </Grid>

            <Grid item xs={12}>
            <TextField error={error.subCategoryName?true:false} helperText={error.subCategoryName} onFocus={()=>handleError('subCategoryName',null)} onChange={(event)=>{setSubCategoryName(event.target.value)}} label="Sub Category Name" variant="outlined" fullWidth/>
            </Grid>
           
            <Grid item xs={12}>
            <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
           <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={status}
          label="Status"
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
            <Grid item xs={6}>
          <IconButton  color="primary" aria-label="uplode picture" component="label">
            <input onChange={handlePiture} hidden accept="*image/*" type="file" />
            <PhotoCamera/>
            </IconButton>
            
            <div className={classes.errorText}>{error.icon}</div>
         </Grid>
         <Grid item xs={6}>
         <Avatar
          alt="icon"
          src={icon.file}
          sx={{ width: 56, height: 56 }}
          variant="rounded"
         />
         </Grid>
            <Grid item xs={6}>
                <Button onClick={handleClick} variant="contained" fullWidth>Submit</Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="contained" fullWidth>Reset</Button>
            </Grid>

        </Grid>

     </div>
  </div>)
}