import { Avatar } from "@mui/material"
import { serverURL } from "../../../administrator/services/FetchNodeServices"

export default function LearnMore(){
    return(<div style={{padding:9,marginLeft:10}}>
        <div style={{display:'flex',flexDirection:'row',marginTop:8}}>
    <Avatar src={`/assets/safty.webp` } style={{width:90,height:60}} variant="square"  />
    <div style={{fontFamily:'Poppins',fontSize:15,fontWeight:'bold',marginTop:12,marginLeft:10}}>See how we ensure our delivery partner’s safety</div>
    </div>
    </div>)
}