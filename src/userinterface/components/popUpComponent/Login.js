import { useEffect, useState } from 'react';
import { Button, Paper, TextField } from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import InputAdornment from '@mui/material/InputAdornment';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { postData } from '../../../administrator/services/FetchNodeServices';
import { useNavigate } from 'react-router-dom';
import LoginOtp from './LoginOtp';
import CloseIcon from '@mui/icons-material/Close';



export default function Login(props){
    const [getOpen, setOpen] = useState(props.status)
    
    const [openOtp,setOpenOtp]=useState(false)
    const [mobileno, setMobileno] = useState('')
    const[otpGen,setOtpGen]=useState('')
    const[handleDialog,setHandleDialog]=useState(true)



    useEffect(function(){
     setOpen(props.status)

    },[props])


   const handleClose=()=>{
    props.setStatus(false)
   }

   const generateOtp=()=>{
    var otp=parseInt(Math.random()*8999)+1000
    setOtpGen(otp)
    alert(otp)
   }

   
   const handleNext=()=>{
      setOpenOtp(true)
      setOpen(false)
      generateOtp()
   }
   
  
   
    
const openNumberDilog=()=>{
  return (<Dialog
        open={getOpen}
        onClose={handleClose}
        sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "500px",
                borderRadius:5  // Set your width here
              },
            },
          }}
      >
        <DialogTitle style={{fontFamily:'Poppins',fontSize:22,}}>
          <div onClick={handleClose} style={{display:'flex',justifyContent:'flex-end',cursor:'pointer'}}>
          <CloseIcon/>
          </div>
          <div style={{display:'flex',justifyContent:'center'}}>
          {"Phone Number Verification"}
          </div>
          
        </DialogTitle>

        <DialogContent style={{background:'#f1f2f6'}}>
            <DialogContentText   style={{display:'flex',justifyContent:'center',marginTop:'6%',fontFamily:'Poppins',fontSize:15,fontWeight:'bold'}}>
            Enter your phone number to
            </DialogContentText>
            <DialogContentText  style={{display:'flex',justifyContent:'center',marginTop:'2%',fontFamily:'Poppins',fontSize:15,fontWeight:'bold',marginBottom:'3%'}}>
            Login/Sign up
            </DialogContentText>
            <DialogActions style={{cursor:'pointer',display:'flex',justifyContent:'center',flexDirection:'column'}}>
              <TextField
              onChange={(event)=>setMobileno(event.target.value)}
              color='success'
              id="outlined-start-adornment"
              sx={{  width: '35ch' }}
              InputProps={{
                startAdornment: <InputAdornment position="start"><PhoneIphoneIcon/>+91-</InputAdornment>,
                style: {
                height: "45px",
                  },
                 }}
               />
             <div style={{display:'flex',justifyContent:'center',marginTop:'4%'}}>
             <Button style={{width:300,height:'43px',display:'flex',justifyContent:'center',alignItems:'center',border:'1px solid #27ae60',borderRadius:4,background:'#27ae60',marginRight:8,color:'#fff'}} 
             onClick={handleNext} >
               Next
             </Button>
            
             </div>
        </DialogActions>
            <DialogContentText style={{display:'flex',justifyContent:'center',marginTop:'3%',fontFamily:'Poppins',fontSize:12,color:'gray'}}>  
                 By continuing, you agree to our
            </DialogContentText>
            <DialogContentText style={{display:'flex',justifyContent:'center',marginTop:'1%',fontFamily:'Poppins',fontSize:12,color:'gray',color:'green',marginBottom:'1%'}}>
                  <span style={{color:'green'}}><u >Terms of service</u> &nbsp; <u>Privacy policy</u></span>
            </DialogContentText>
        </DialogContent>
        
      </Dialog>)}
     

    
   
    return(<div >
        <div>
        {openNumberDilog()}
        </div>
        
        <LoginOtp otp={otpGen} openOtp={openOtp} setOpenOtp={setOpenOtp} setBtnTitle={props.setBtnTitle} setStatus={props.setStatus}   mobileno={mobileno} setUserAddress={props.setUserAddress} userAddress={props.userAddress} />
    </div>)
}