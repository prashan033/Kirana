import { Avatar } from "@mui/material"
import { serverURL } from "../../../administrator/services/FetchNodeServices"

export default function CartOffer(){
    return(<div style={{padding:6,marginLeft:10}}>
        <div style={{display:'flex',flexDirection:'row',marginTop:8}}>
    <Avatar src={`/assets/offer2.jpg` } style={{width:35,height:36}} />
    <div style={{fontFamily:'Poppins',fontSize:14,fontWeight:'bold',marginTop:10,marginLeft:6}}>Avail Offers / Coupons</div>
    </div>
    </div>)
}