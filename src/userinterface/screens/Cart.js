import {  Grid, Paper, Button } from "@mui/material";
import Header from "../components/Header";
import CartTip from "../components/cartComponent/CartTip";
import LearnMore from "../components/cartComponent/LearnMore";
import CartOffer from "../components/cartComponent/CartOffer";
import CartAdders from "../components/cartComponent/CartAdders";
import CartProduct from "../components/cartComponent/CartProduct";
import { useSelector } from "react-redux";
import CartBill from "../components/cartComponent/CartBill";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import User from "../components/popUpComponent/UserInfo";


export default function Cart(){

   const navigate=useNavigate()
   const dispatch=useDispatch()
   const theme = useTheme();
   const sm = useMediaQuery(theme.breakpoints.down('sm'));
   const md = useMediaQuery(theme.breakpoints.down('md'));
   const lg = useMediaQuery(theme.breakpoints.down('lg'));
   
  const [refresh,setRefresh]=useState(false)
  const [userAddress,setUserAddress]=useState([])
  const [btnTitle,setBtnTitle]=useState('ADD ADDERS TO PROCEED')
  const [open, setOpen] = useState(false)
  
  const cart=useSelector((state)=>state.products)
  const cartData=Object.values(cart)
  

  const pageRefresh=()=>{
   setRefresh(!refresh)
  }

 
const handleEmpty=()=>{
   dispatch({type:'CLEAR_CART',payload:[]})
     
}
  

    return(<div style={{background:'#f1f2f6',height:'745px'}}>
       <Header setOpen={setOpen} />
        <div>
         <User open={open} setOpen={setOpen} />
        </div>

        {cartData.length!=0?
        
       <div style={{padding:90,paddingLeft:sm?10:250,paddingRight:sm?10:250,marginTop:sm?2:0}}>       
        <Grid container spacing={2}>

           <Grid item xs={12} md={12}> 
              <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
                <div style={{fontFamily:'Poppins',fontSize:'140%',fontWeight:'bolder'}}>
                  Cart ( {cartData.length} Items )
                  </div>
                
                 <div >
                  <Button onClick={handleEmpty} color='warning'variant='outlined'  >Empty cart</Button>
                 </div>
             
              </div>
           </Grid>

            <Grid item xs={sm?12:7} md={12} lg={7}>
               

              <Paper elevation={2}  style={{marginTop:3}} >
                 <CartProduct cartData={cartData} pageRefresh={pageRefresh} />
              </Paper>

              <Paper elevation={2}  style={{height:140,marginTop:13}} >
                 <CartTip />
              </Paper>

              <Paper elevation={2} style={{height:90,marginTop:13}} >
                 <LearnMore />
              </Paper>
            </Grid>

            <Grid item xs={sm?12:5} md={12} lg={5}>

              <Paper elevation={2}  style={{height:70,marginTop:6}}>
               <CartOffer />
              </Paper>

              <Paper elevation={2}  style={{marginTop:13}}>
               <CartBill  pageRefresh={pageRefresh}  />
              </Paper>

              <Paper elevation={2} style={{height:160,marginTop:13,height:'auto'}}>
               <CartAdders btnTitle={btnTitle} setBtnTitle={setBtnTitle} setUserAddress={setUserAddress} userAddress={userAddress} />
              </Paper>
            </Grid>

        </Grid>
        
       </div>

    :
<div   style={{width:'100%',height:sm?'893px':'745px',background:'#f1f2f6',display:'flex',justifyContent:'center',alignItems:'center'}}>
  <div>
   <Button color='warning' variant='outlined' onClick={()=>{navigate('/home')}}>shop something</Button>
   </div>
</div>
  
   }
     </div>
     )

}

