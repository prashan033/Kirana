import React,{createRef} from "react";
import { useMediaQuery,Paper, Button } from "@mui/material";
import { serverURL } from "../../administrator/services/FetchNodeServices";
import { useTheme } from '@mui/material/styles';
import { useNavigate} from "react-router-dom";



export default function SingleProductDetails(props){
    var item=props.item
    //console.log('xxxxx',item)
    var navigate=useNavigate()
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const xs = useMediaQuery(theme.breakpoints.down('xs'));

   
   

     
      const handleClick=(item)=>{
        navigate(props.url,{state:{product:item}})
      }
  
      
          return(<div onClick={()=>handleClick(item)} style={{margin:sm?8:4}}>
            
            <Paper style={{cursor:'pointer',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:180,height:250}} elevation={4} variant="outlined">
                <div style={{padding:2,display:'flex',justifyContent:'center',alignItems:'center',width:178}}>
                <img src={`${serverURL}/images/${item.picture}`} width='80%' />
               
                </div>
                <div style={{fontFamily:'Poppins',fontSize:14,fontWeight:700,margin:5,textAlign:'center',width:180}}>{item.productlistname}</div>
              <div style={{fontFamily:'Poppins',display:'flex',flexDirection:'column',width:178,padding:2}}>
               <div style={{paddingLeft:10,fontSize:12}}>{item.weight}{" "}{item.type}</div>
               <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
               <div style={{display:'flex',flexDirection:'column'}}>
               <div style={{paddingLeft:10,fontSize:12}}>&#8377; <s>{item.rate}</s></div>
               <div style={{paddingLeft:10,fontSize:12}}>&#8377; {item.offer}</div>
               </div>
               <div style={{paddingRight:10}}>
                <Button  variant="outlined">Add</Button>
               </div>
               </div>
              
              </div>
            </Paper>
            
            </div>)
        
    }


      
      

