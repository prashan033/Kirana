import { useEffect } from "react"
import { Avatar, Divider } from "@mui/material"
import { serverURL } from "../../../administrator/services/FetchNodeServices"
import { useSelector } from "react-redux"


export default function CartBill(props){
    useEffect(function(){
        props.pageRefresh() 
    })

    
  const cart=useSelector((state)=>state.products)
  const cartData=Object.values(cart)

  var totalOffer=cartData.reduce((p1,p2)=>{
    return p1+(p2.offer*p2.qty)
  },0)


  var totalAmount=cartData.reduce((p1,p2)=>{
   return p1+(p2.rate*p2.qty)
 },0)

 var totalSavings=totalAmount-totalOffer



    return(<div style={{padding:'5%'}}>

       <div style={{flexDirection:'row',display:'flex',justifyContent:'space-between',fontWeight:500,marginTop:'2%'}}>
        <div>Item Total</div>
        <div>{totalOffer==0?<div>&#8377; {totalAmount}</div>:<div>&#8377; <s>{totalAmount}</s>&nbsp; &#8377;{totalOffer}</div>}</div>
       </div>

       <div style={{flexDirection:'row',display:'flex',justifyContent:'space-between',marginTop:'1%',fontSize:15}}>
        <span>Handling Charge&nbsp;
        <u style={{color:'#009432'}}>(₹10 saved)</u></span>
        <div>&#8377;<s>15</s> <font style={{fontWeight:700}}>&#8377;5</font></div>
       </div>

       <div style={{flexDirection:'row',display:'flex',justifyContent:'space-between',marginTop:'1%',fontSize:15}}>
       <span>Delivery Fee &nbsp;<u style={{color:'#009432'}}>(₹5 saved)</u></span>
       <div>&#8377;<s >35</s> <font style={{fontWeight:700}}>&#8377;0</font></div>
       </div>

       <div style={{flexDirection:'row',display:'flex',justifyContent:'space-between',fontWeight:500,marginTop:'3%'}}>
        <div>To Pay</div>
        <div style={{fontSize:19}}> {totalOffer==0?<><font style={{color:'red'}} >&#8377;{totalAmount+5}</font></>:<font style={{color:'red'}} >&#8377;{totalOffer+5}</font>}</div>
       </div>
       
       <div style={{marginTop:'3%',marginBottom:'4%'}}>
        <Divider />
       </div>
    </div>)
}