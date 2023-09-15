import { useState } from "react"
import { useStyles } from "./CategoryCss";
import {Avatar,  Grid,TextField,Button,FormControl,InputLabel,Select,IconButton,MenuItem } from "@mui/material"
import { PhotoCamera } from "@mui/icons-material";
import { postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2"; 
import ViewListIcon from '@mui/icons-material/ViewList';
import { useNavigate } from "react-router-dom";


  

export default function CategoryInterface()
{   const classes=useStyles()
  const navigate=useNavigate()
    const [statu,setStatu]=useState('')
    const [icon,setIcon]=useState({file:'/assets/shopping-cart.png',bytes:''})
    const [categoryName,setCategoryName]=useState('')
    const [error,setError]=useState({})

    const handlePicture=(event)=>{
      setIcon({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      handleError('icon',null)
    }
    
    const handleError=(input,value)=>{
     setError((prev)=>({...prev,[input]:value}))
    }

    const validation=()=>{
      var isValid=true
      if(!categoryName)
      { handleError('categoryName','plz input category name .. ')
        isValid=false
      }

      if(!statu)
      { handleError('status','plz input category status .. ')
        isValid=false
      }

      if(!icon.bytes)
      { handleError('icon','plz select icon for category.. ')
        isValid=false
      }
      return isValid
    }

    const handleClick=async()=>{
      
      
    if(validation())
    { var formData=new FormData()
      formData.append('categoryname',categoryName)
      formData.append('status',statu)
      formData.append('icon',icon.bytes)
      
      var result=await postData('category/categorysubmit',formData)
     
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

    return(<div className={classes.container}>
        <div className={classes.box}>
          <Grid container spacing={2}>
          <Grid item xs={12} style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}} >
          <div className={classes.headingStyle}>
           ADD New Category
          </div>
          <div>
            <ViewListIcon onClick={()=>navigate("/dashboard/displayallcategory")} />
          </div>
         </Grid>
         <Grid item xs={12}>
          <TextField error={error.categoryName?true:false} helperText={error.categoryName} onFocus={()=>handleError('categoryName',null)} onChange={(event)=>{setCategoryName(event.target.value)}} label="Category Name" variant="outlined" fullWidth/>
         </Grid>
         <Grid item xs={12}>
         <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Status</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={statu}
          label="status"
          onChange={(event)=>{setStatu(event.target.value)}}
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
            <input onChange={handlePicture} hidden accept="*image/*" type="file" />
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