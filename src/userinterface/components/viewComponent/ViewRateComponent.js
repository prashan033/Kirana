import { Avatar, Divider } from "@mui/material";
import { getData, serverURL } from "../../../administrator/services/FetchNodeServices";
import TimerIcon from '@mui/icons-material/Timer';
import SelectPrice from "./SelectPrice";
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';



export default function ViewRateComponent({product,refreshPage}){

   
   const theme = useTheme();
   const sm = useMediaQuery(theme.breakpoints.down('sm'));
   const lg = useMediaQuery(theme.breakpoints.down('lg'));

  

   function productDetails(){
      return(
         <div >
           <div style={{marginTop:sm?'0%':'10%',marginBottom:10,fontSize:sm?'12px':'15px'}}>
       {'xxxxx'} / {'xxxxx'} / {product.productlistname}
      </div>

       <div style={{fontSize:sm?'20px':'30px',fontWeight:'bolder',letterSpacing:2,fontFamily:'Poppins'}}>
       {product.productlistname}
       </div>
      
       <div style={{background:'#fff',marginTop:sm?3:8,flexDirection:'row',display:'flex',fontFamily:'Poppins',fontWeight:'bold',fontSize:sm?'10px':'13px'}}>
          <div ><TimerIcon style={{width:sm?'50%':'60%'}}/></div>
          <div style={{marginTop:2}} >10 MINs</div>
       </div>
       
       <div style={{color:'green',fontSize:sm?'12px':'17px',fontFamily:'Poppins',fontWeight:1000,letterSpacing:1,marginTop:sm?0:8}}>
       View all by Amul
       </div>
         </div>
      )
   }

   function whyQuickShopee(){
      return(<div>
         <div style={{fontFamily:'Poppins',fontSize:17,fontWeight:'bold'}}>Why shop from QuickShopee?</div>
       
         <div style={{flexDirection:'row',display:'flex',marginTop:15,fontFamily:'Poppins',fontSize:'14px'}}>
          <div><Avatar src={`/assets/why.avif` } style={{width:55,height:55}} /></div>
          <div style={{display:'flex',flexDirection:'column',justifyItems:'center',marginTop:6,marginLeft:6}}>
          <div style={{fontWeight:600}}>Superfast Delivery</div>
          <div>Get your order delivered to your doorstep at the earliest from dark stores near you.</div>
          </div>
           </div>
  
           <div style={{flexDirection:'row',display:'flex',marginTop:15,fontFamily:'Poppins',fontSize:'14px'}}>
          <div><Avatar src={`/assets/why2.avif` } style={{width:55,height:55}} /></div>
          <div style={{display:'flex',flexDirection:'column',justifyItems:'center',marginTop:6,marginLeft:6}}>
          <div style={{fontWeight:600}}>Best Prices & Offers</div>
          <div>Best price destination with offers directly from the manufacturers.</div>
          </div>
           </div>
  
           <div style={{flexDirection:'row',display:'flex',marginTop:15,fontFamily:'Poppins',fontSize:'14px'}}>
          <div><Avatar src={`/assets/why3.avif` } style={{width:55,height:55}} /></div>
          <div style={{display:'flex',flexDirection:'column',justifyItems:'center',marginTop:6,marginLeft:6}}>
          <div style={{fontWeight:600}}>Wide Assortment</div>
          <div>Choose from 5000+ products across food, personal care, household & other categories.</div>
          </div>
           </div>
           </div>
       
      )
   }
  

   return( <div style={{padding:sm?'1%':'3%'}}>
     
      <div>
         {productDetails()}
      </div>
      
    <Divider style={{marginBottom:sm?15:25,marginTop:sm?15:25}}/>

    <div >
      <SelectPrice product={product} refreshPage={refreshPage}  />
    </div>

    {!lg?<div >
      {whyQuickShopee()}    
    </div>
    :<></>}

    

    </div>)
}