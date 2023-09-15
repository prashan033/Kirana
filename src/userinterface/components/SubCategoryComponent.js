import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Grid,Paper,Avatar } from '@mui/material';
import { serverURL } from '../../administrator/services/FetchNodeServices';
import { useNavigate } from 'react-router-dom';
import ViewImageComponent from './viewComponent/ViewImagesComponent';
import { useMediaQuery,FormControl,InputLabel,Select,IconButton,MenuItem } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';




export default function SubCategoryComponent({data,getSubCategoryId}){
    const navigate=useNavigate()

    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    
   

   const handleClick=(item)=>{ 
    
     getSubCategoryId(item.subcategoryid,item.subcategoryname)
   
     
   }

 
   

   const listViews=()=>{
    
    
   return data.map((item)=>{
    
      return ( 
      <ListItem disablePadding>
      <ListItemButton onClick={()=>handleClick(item)}  >
        <ListItemIcon>
        <Avatar src={`${serverURL}/images/${item.icon}`} style={{width:35,height:35}} />
        </ListItemIcon>
        
        <ListItemText  primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}  >{item.subcategoryname}</span>} />
      </ListItemButton>
    </ListItem>
    
   )})
   }

 


    return(<div style={{marginBottom:20}}>
      
        <div>
            <Paper elevation={3} style={{background:"#fff",flexDirection:'column',display:'flex',alignItems:'center',justifyContent:'center',width:sm?380:200,marginBottom:sm?0:10}}>
                
              {sm?<></>:md?<>
               </>:<>
               <Avatar src={`/assets/top1.avif` } style={{width:200,height:150}} variant='square' ></Avatar>
             </>}
             
            </Paper>
                
            <List>
          
            {listViews()}
           
             
            </List>
            
        </div>
       

           
    </div>)
}