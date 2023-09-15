import { useEffect,useState } from "react";
import { Chip,Avatar, Icon } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';


export default function PlusMinusComponent(props){
   // console.log("qqqq",props.qty)
    const [value,setValue]=useState('')
    useEffect(()=>{
        setValue(props.qty)
    },[props])

    const handlePlusClick=()=>{
        setValue((prev)=>{
            if(prev<5)
            {props.onChange(prev+1)
            return prev+1 }
            else
            {props.onChange(prev)
                return prev}
        })
    }

   
    const handleMinusClick=()=>{
        setValue((prev)=>{
            if(prev>=1)
            {props.onChange(prev-1)
            return prev-1}
           
        })
    }
    

    return (<div style={{display:'flex',justifyContent:'space-between',flexDirection:'row',width:90,margin:9,marginBottom:20,marginTop:'4%',marginBottom:'4%'}}>
            {value==0?<>
            <Chip label="ADD" style={{background:'#74b9ff'}}  onClick={handlePlusClick} />
            </>
            :
            <>
           <div style={{display:'flex',flexDirection:'row',padding:1}}>
            <Avatar onClick={handlePlusClick} style={{cursor:'pointer',width:30,height:30,background:props.color}} >+</Avatar>
            <div style={{width:25,height:25,borderRadius:5,display:'flex',justifyContent:'center',fontSize:20}}>{value}</div>
            <Avatar onClick={handleMinusClick} style={{cursor:'pointer',width:30,height:30,background:props.color}}>-</Avatar>
           </div>
           </>}
           </div>)

}

// <div onClick={handlePlusClick} style={{cursor:'pointer',border:'1px solid #718093',width:60,height:35,borderRadius:6,display:'flex',justifyContent:'center',alignItems:'center',fontSize:14,fontWeight:600,color:'#218c74'}}>ADD</div>

   //<div onClick={handlePlusClick} style={{cursor:'pointer',width:25,height:25,background:'#00a8ff',borderRadius:25,color:'#fff',justifyContent:'center',display:'flex'}}>+</div>
   //<div style={{width:25,height:25,border:'1px solid #74b9ff',borderRadius:5,display:'flex',justifyContent:'center'}}>{value}</div>
   //<div onClick={handleMinusClick} style={{cursor:'pointer',width:25,height:25,background:'#00a8ff',borderRadius:25,color:'#fff',justifyContent:'center',display:'flex'}}>-</div>
   