

export default function CartTip(){
   return(<div style={{display:'flex',flexDirection:'column',justifyContent:'space-around',height:110}}>
     <div style={{padding:25,marginTop:28}}>
      <div style={{fontFamily:'Poppins',fontSize:17,fontWeight:'bold'}}>Delivery Partner Tip</div>
      <div style={{fontFamily:'Poppins',fontSize:15,color:'gray',marginTop:7}}>The entire amount will be sent to your delivery partner</div>
      
      <div style={{display:'flex',flexDirection:'row',marginTop:10,justifyContent:'space-between',width:320}}>
       <div style={{width:70,height:30,border:'1px solid #b2bec3',borderRadius:30,justifyContent:'center',display:'flex'}}>&#8377;10</div>
       <div style={{width:70,height:30,border:'1px solid #b2bec3',borderRadius:30,justifyContent:'center',display:'flex'}}>&#8377;10</div>
       <div style={{width:70,height:30,border:'1px solid #b2bec3',borderRadius:30,justifyContent:'center',display:'flex'}}>&#8377;10</div>
       <div style={{width:70,height:30,border:'1px solid #b2bec3',borderRadius:30,justifyContent:'center',display:'flex'}}>&#8377;10</div>
     </div>
     </div>
  
   </div>)
}