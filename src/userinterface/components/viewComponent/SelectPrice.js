import { Box } from "@mui/material";
import { useState,useEffect } from "react";
import { postData } from "../../../administrator/services/FetchNodeServices";
import { useLocation } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";
import PlusMinusComponent from "./PlusMinusComponent";

import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';




export default function SelectPrice({product,refreshPage}){
  
  const [units,setUnits]=useState([])
  const dispatch=useDispatch()
  const [selectedProduct,setSelectedProduct]=useState(product) 
  const cart=useSelector((state)=>state.products)
  const cartItems=Object.values(cart)

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const lg = useMediaQuery(theme.breakpoints.down('lg'));
  

  const searchInCart=()=>{

    var searchProduct=cartItems.filter((item)=>{
      return item.productlistid==product.productlistid
    })

   // console.log("search Product",searchProduct)
    if(searchProduct?.length!=0)
    { 
      setSelectedProduct(searchProduct[0])
    }
    else
    {
      product['qty']=0
      setSelectedProduct(product)
    }
   

  }
  useEffect(function(){
    searchInCart()
  },[])
  

    var images=[
        { offer:0, rate:150, stock:'2', weight:'250 G' },
        { offer:250, rate:300, stock:'2', weight:'500 G' },
        { offer:500, rate:600, stock:0, weight:'1 KG' },
    ]

  const fetchAllUnits=async()=>{
     var result=await postData('userInterface/fetch_all_product_by_productid',{productid:product.productid})
      
      setUnits(result.data)
  }
  
    useEffect(function(){
      fetchAllUnits()
    },[])

    const handleClick=(item,index)=>{
      
      item['qty']=0
     setSelectedProduct(item)
    }


    const handleQtyChange=(value)=>{
      
      var product=selectedProduct

      if(value>=1)
      {
        product['qty']=value
        dispatch({type:'ADD_PRODUCT',payload:[product.productlistid,product]})
      }
      else
      { product['qty']=0
        dispatch({type:'DELETE_PRODUCT',payload:[product.productlistid,product]})
      }
     refreshPage()
    }
    
    const FillUnits=()=>{
    return(units.map((item,index)=>{
        return( 
        <div style={{width:'100%',padding:'2%'}}>
          
        
          {item.stock!==0?
          <>
          <Box onClick={()=>handleClick(item,index)} style={{cursor:'pointer',width:sm?100:'80%',height:'65px',border: item.productlistid==selectedProduct.productlistid?'3px solid #74b9ff':'1px solid #192a56',borderRadius:20}}>
         
           <div style={{width:'45%',height:'30%',background:'#74b9ff',marginLeft:'25%',borderBottomRightRadius:6,borderBottomLeftRadius:6}}>
           <div style={{fontWeight:'bold',fontFamily:'Poppins',fontSize:sm?'9px':'12px',display:'flex',justifyContent:'center',color:'#fff'}}>
           <div style={{marginTop:sm?3:0}}> {parseInt(((item.rate-item.offer)/item.rate)*100)}% OFF</div>
           </div>
          
          </div>

          <div style={{display:'flex',justifyContent:'center',fontFamily:'Poppins',fontSize:'13px',fontWeight:'bold'}}>
            {item.weight}{' '}{item.type}
           </div>

           <div style={{display:'flex',justifyContent:'center',fontFamily:'Poppins',fontSize:'13px',fontWeight:'bold',letterSpacing:'1px'}}>
           
            {item.offer!==0?
            
            <><div style={{color:'gray'}}>
            &#8377;<s>{item.rate}</s>
            </div>
 
            <div style={{marginLeft:'10px'}} >
            &#8377;{item.offer}
            </div></>:
            
            <><div style={{color:'gray'}}>
            &#8377;{item.rate}
            </div></>}

           
           </div>
            </Box>
          </>:<>
          <Box onClick={()=>handleClick(item,index)} style={{cursor:'pointer',width:sm?100:'80%',height:'60px',border:item.productlistid==selectedProduct.productlistid?'3px solid #74b9ff':'1px solid #192a56',borderRadius:20,}}>
          <div style={{color:'gray'}}>
          <div style={{width:'50%',height:'18px',background:'#74b9ff',marginLeft:'25%',borderBottomRightRadius:6,borderBottomLeftRadius:6}}>
           <div style={{fontWeight:'bold',fontFamily:'Poppins',fontSize:'12px',display:'flex',justifyContent:'center',color:'#fff'}}>
            {'55% OFF'}
           </div>
          
          </div>

          <div style={{display:'flex',justifyContent:'center',fontFamily:'Poppins',fontSize:'13px',fontWeight:'bold'}}>
            {item.weight}{item.type}
           </div>

           <div style={{display:'flex',justifyContent:'center',fontFamily:'Poppins',fontSize:'13px',fontWeight:'bold',letterSpacing:'1px'}}>
           
            {item.offer!==0?
            
            <><div style={{color:'gray'}}>
            &#8377;<s>{item.rate}</s>
            </div>
 
            <div style={{marginLeft:'10px'}} >
            &#8377;{item.offer}
            </div></>:
            
            <><div style={{color:'gray'}}>
            &#8377;{item.rate}
            </div></>}

            </div>
            <div style={{color:'red',fontFamily:'Poppins',fontSize:'10px',marginLeft:'23%',padding:3}}>
              Out Of Stock
            </div>
           </div>
           </Box>
          </>}
         
           
        
        </div>
        )
}))
    }


return(<div >
     <div style={{display:'flex',justifyContent:'space-around',flexDirection:'row'}}>
      {FillUnits()}
     </div>
     <div style={{marginRight:40}}>
     
      <PlusMinusComponent color={"#74b9ff"} qty={selectedProduct?.qty} onChange={handleQtyChange}/>
    
     </div>
</div>)
}