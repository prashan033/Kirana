import Header from "../components/Header";
import CircleScrollComponent from "../components/CircleScrollComponents";
import ProductComponent from "../components/ProductComponent";
import { postData,getData } from "../../administrator/services/FetchNodeServices";
import { useEffect, useState } from "react";
import AddComponent from "../components/AddComponent";
import ProductTwoComponent from "../components/ProductTwoComponent";
import BannersComponent from "../components/BannersComponent";
import Footer from "../components/footer/Footer";
import User from "../components/popUpComponent/UserInfo";

import {Avatar, Paper} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { serverURL } from "../../administrator/services/FetchNodeServices"; 
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';




export default function Home(props){
  // var color=['#55efc4','#81ecec','#ffeaa7','#fab1a0','#dfe6e9','#fd79a8','#f7f1e3','#ccae62','#786fa6']
    
   const[banners,setBanners]=useState([])
   const[category,setCategory]=useState([])
   const[productMilk,setProductMilk]=useState([])

   const fetchAllBanners=async()=>{
      var result=await getData('userInterface/fetch_all_banners')
      var images=result.data.banners.split(",")
       setBanners(images)
   }

   const fetchAllCategorie=async()=>{
      var result=await getData('userInterface/fetch_all_category')
       setCategory(result.data)
   }

   const fetchAllProducts=async(subcategoryname)=>{
      var result=await postData('userInterface/fetch_product_by_category',{subcategoryname:subcategoryname})
       setProductMilk(result.data)
   }

   useEffect(function(){
     // fetchAllBanners()
      fetchAllCategorie()
      fetchAllProducts('Milk,Bread & Butter')
   },[])


   const [open, setOpen] = useState(false)




    return(
       <div >
        <Header setOpen={setOpen} />
        <div>
         <User open={open} setOpen={setOpen} />
        </div>
         <div style={{marginTop:82,display:'flex',marginLeft:'3%',marginRight:'3%',alignItems:'center',flexDirection:'column'}}>
         <div style={{width:'100%'}}>
          <BannersComponent images={banners}/>
         </div>
         <div style={{width:'100%',marginTop:10}}>
          <AddComponent />
         </div>
         <div style={{width:'100%',marginTop:20}}>
          <CircleScrollComponent category={category} title="Popular Categories" />
         </div>
         <div style={{width:'100%',marginTop:20}}>
          <ProductComponent title="Milk,Bread & Butter" products={productMilk} />
         </div>
         <div style={{width:'100%',marginTop:20}}>
          <CircleScrollComponent category={category} title="Popular Items" />
         </div>
         
         <div style={{marginBottom:100}}>
        
         </div>
        
        
         </div>
         <div  style={{marginLeft:"2%",marginRight:'2%'}}>
            <Footer />
         </div>
      </div>)
}