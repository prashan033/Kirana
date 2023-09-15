import { Divider, Paper } from "@mui/material"
import { serverURL } from "../../../administrator/services/FetchNodeServices"
import PlusMinusComponent from "../viewComponent/PlusMinusComponent"
import { useState } from "react";

import { useDispatch,useSelector } from "react-redux";


export default function CartProduct({cartData,pageRefresh}){
    
    
  const dispatch=useDispatch()

    const handleQtyChange=(selectedProduct,value)=>{
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
        pageRefresh()
      }


    return(<div>
        
            {
                cartData.map((item)=>{
                    return(
                    <div >
                        <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'100%',marginTop:'1%',paddingTop:'2%'}}>
                        <div style={{width:'18%',height:'auto',marginLeft:'3%'}}>
                        <img src={`${serverURL}/images/${item.picture}`} width='100%' />
                        </div>
                         
                         <div style={{marginLeft:20,width:'60%'}}>
                         <div style={{fontSize:14,marginTop:'2%',marginBottom:'1%'}}>{item.productlistname}</div>
                         <div style={{fontSize:12}}>{item.offer>0?<>&#8377;{item.offer}/{item.weight} &nbsp;{item.type}</>:<>{item.rate}/{item.weight} &nbsp;{item.type}</>}
                         <div style={{fontSize:12}}>{item.weight} &nbsp;{item.type}</div>
                         <div style={{marginTop:'1%',fontSize:12}}>
                         {item.offer==0?<div style={{fontWeight:500,fontSize:15}}>&#8377;{item.rate*item.qty}</div>:<div style={{fontWeight:500,fontSize:15}}>&#8377;<s>{item.rate*item.qty}</s>&nbsp;&#8377;{item.offer*item.qty}</div>}
                         </div>
                         </div>

                         </div>
                         
                       <div style={{width:'25%',padding:'4%'}}>
                        <PlusMinusComponent qty={item?.qty} color={'#ff4757'}
                       onChange={(value)=>handleQtyChange(item,value)}
                       />
                   </div>
                   </div>
                   <div style={{marginTop:'2%',marginRight:'2%',marginLeft:'2%'}}>
                    <Divider/>
                    </div>
                    </div>)
                        
                    
                })
            }
        
    </div>)
}