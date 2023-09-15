import Header from "../components/Header";
import { useEffect, useState } from "react";
import Footer from "../components/footer/Footer";
import { useNavigate,useLocation } from "react-router-dom";
import { postData } from "../../administrator/services/FetchNodeServices";
import SubCategoryComponent from "../components/SubCategoryComponent";
import { Grid,useMediaQuery } from "@mui/material";
import SingleProductDetails from "../components/SingleProductDetails";
import User from "../components/popUpComponent/UserInfo";

import { useTheme } from '@mui/material/styles';


export default function ProductViewWithCategory(props){
   const [subCategory,setSubCategory]=useState([])
   const [subCategoryId,setSubCategoryId]=useState('')
   const [subCategoryName,setSubCategoryName]=useState('')
   const [productList,setProductList]=useState([])
   const location=useLocation()
   const navigate=useNavigate()

   const [open, setOpen] = useState(false)
   
   const theme = useTheme();
   const sm = useMediaQuery(theme.breakpoints.down('sm'));
   const md = useMediaQuery(theme.breakpoints.down('md'));
   const xs = useMediaQuery(theme.breakpoints.down('xs'));
   const lg = useMediaQuery(theme.breakpoints.down('lg'));


  //console.log("location",location)
  // console.log("location",location.state.categoryid) 

   const fetchAllSubCategory=async()=>{
    var result=await postData('userInterface/fetch_all_subcategory_by_categoryid',{categoryid:location.state.categoryid})
    
     setSubCategory(result.data)
 }

 const fetchAllProductsSubCategory=async(scid)=>{
   
   var result=await postData('userInterface/fetch_all_product_by_subcategory',{subcategoryid:scid})
   
    setProductList(result.data)
}

const fetchAllProductsByCategory=async()=>{
   
   var result=await postData('userInterface/fetch_all_product_by_categoryid',{categoryid:location.state.categoryid})

    setProductList(result.data)
}

 const getSubCategoryId=(scid,subcategoryname)=>{
   
    setSubCategoryName(subcategoryname)
    setSubCategoryId(scid)
    fetchAllProductsSubCategory(scid)
 }

  useEffect(function(){
   fetchAllProductsByCategory()
 },[])


   useEffect(function(){
    fetchAllSubCategory()
   },[])

   const listOfProducts=()=>{
      return productList.map((item)=>{
        // {console.log('pp',item)}
        return(
         <div >
          <SingleProductDetails item={item} url={"/viewproductcomponent"}/>
         </div>
        ) 
      })
   }

    return(
       <div >
       <Header setOpen={setOpen} />
        <div>
         <User open={open} setOpen={setOpen} />
        </div>
         <div style={{display:'flex',alignItems:'center',flexDirection:'column',marginTop:sm?'19%':'6%',marginLeft:sm?'2%':'4%',marginRight:'2%'}}>
         <Grid container spacing={2}>
            <Grid item xs={sm?12:2}  >
           <SubCategoryComponent data={subCategory} getSubCategoryId={getSubCategoryId}  />
           </Grid>
           <Grid item xs={sm?12:10}  >
         
            <div style={{fontFamily:'Poppins',fontSize:22,fontWeight:'bold',padding:10}}>
               {subCategoryName} ({productList.length}) Items
            </div>
            <div style={{display:'flex',flexWrap:'wrap',flexDirection:'row'}}>
             {listOfProducts()}
             </div>
           </Grid>
           </Grid>
           
        
         </div>
         <div style={{margin:'4%'}}>
            <Footer   />
         </div>
      </div>)
}

