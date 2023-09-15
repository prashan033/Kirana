import { Divider, Grid } from "@mui/material";
import ViewImageComponent from "../components/viewComponent/ViewImagesComponent";
import ViewRateComponent from "../components/viewComponent/ViewRateComponent";
import Header from "../components/Header";
import Footer from "../components/footer/Footer";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import User from "../components/popUpComponent/UserInfo";


export default function ViewProductComponent(){

    const [open, setOpen] = useState(false)
    
   const theme = useTheme();
   const sm = useMediaQuery(theme.breakpoints.down('sm'));
   const lg = useMediaQuery(theme.breakpoints.down('lg'));
   
    const location=useLocation()
   const navigate=useNavigate()
  //console.log("location",location)
  // console.log("location",location.state.categoryid)
  const [refresh,setRefresh]=useState(false) 
  

  
  var product=location.state.product

  const refreshPage=()=>{
    setRefresh(!refresh)
  }

 

 

    return (<div>
        <Header setOpen={setOpen} />
        <div>
         <User open={open} setOpen={setOpen} />
        </div>
         <div style={{padding:20,display:'flex',alignItems:'center',flexDirection:'column',marginTop:'6%',marginLeft:sm?'1%':'4%',marginRight:sm?'1%':'2%'}}>
         
        <Grid container spacing={2} >
          <Grid item xs={sm?12:6}>
               
               <div style={{display:'flex',flexDirection:'row'}}>
               
               <div style={{paddingRight:sm?'0%':'3%',marginTop:sm?40:0,width:'100%'}}>
                <ViewImageComponent product={product} />
               </div>
               <div>
               {!lg?<>
                <Divider orientation="vertical"/>
               </>:<></>}
                   
               </div>
               </div>
           </Grid>

            <Grid item xs={sm?12:6}>
                <div >
                <ViewRateComponent product={product} refreshPage={refreshPage}  />
                </div>
            
            </Grid>
        </Grid>

        <div style={{marginTop:40}}></div>
        <Footer/>
        </div>
    </div>)
}


   /*<Grid item xs={sm?12:6}>
               
               <div style={{display:'flex',flexDirection:'row'}}>
               
               <div style={{padding:'3%'}}>
                <ViewImageComponent product={product} />
               </div>
               <div>
                   <Divider orientation="vertical"/>
               </div>
               </div>
           </Grid>*/