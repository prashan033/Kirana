import { Avatar, Button } from "@mui/material"
import Login from "../popUpComponent/Login"
import { useNavigate } from "react-router-dom"
import { useState } from "react"



export default function CartAdders(props){
  const[status,setStatus]=useState(false)
  const navigate=useNavigate()
  
  const handleClick=()=>{
    
    /* navigate('/makepayment') */

    if(props.btnTitle=='ADD ADDERS TO PROCEED')
     {setStatus(true)
      
     }
     else
     { navigate('/makepayment')  } 
  }

  const showAddress=()=>{
    return props.userAddress.map((item)=>{
      return(<div style={{flexDirection:'column',display:'flex'}}>
             <div><font style={{fontWeight:700}} >Name</font> : {item.username}</div>
             <div><font style={{fontWeight:700}} >Address1</font> : {item.addressone}</div>
             <div><font style={{fontWeight:700}} >Address2</font> : {item.addresstwo}</div>
             <div><font style={{fontWeight:700}} >Location</font> : {item.city},{item.state},{item.pincode}</div>
      </div>)
    })
  }


    return(<div style={{paddingLeft:24,marginRight:24,display:'flex',flexDirection:'column'}}>
           
              {props.btnTitle!='Pay'?<>
              <div style={{marginLeft:55,flexDirection:'row',display:'flex',marginTop:30}}>
                <div>
                  <Avatar src={`/assets/location.png` } style={{width:27,height:45}} variant="square"/>
                </div>

                <div style={{fontFamily:'Poppins',fontSize:15,fontWeight:'bold',marginTop:12,marginLeft:10}}>
                Enter your delivery address
                </div>
            </div>
              
              </>:<>
              <div style={{flexDirection:'row',display:'flex',marginTop:30}}>
                {showAddress()}
              </div>
              </>}
              

            <div style={{marginTop:16,marginBottom:16}}>
             <Button variant="contained" fullWidth style={{background:'#ff4757'}} onClick={handleClick} >{props.btnTitle}</Button>
             
             <Login setStatus={setStatus} status={status} setBtnTitle={props.setBtnTitle} setUserAddress={props.setUserAddress} userAddress={props.userAddress}/>
            </div>  
     </div>)
}