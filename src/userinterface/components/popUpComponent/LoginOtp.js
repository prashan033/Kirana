import { useState,useEffect } from 'react';
import { Button, TextField,Grid,Avatar } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useMediaQuery,FormControl,InputLabel,Select,MenuItem } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { postData,serverURL } from '../../../administrator/services/FetchNodeServices';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';


export default function LoginOtp(props){
 
    const [openOtp,setOpenOtp]=useState(props.openOtp)

    const dispatch=useDispatch()
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    
   

    const[getInputOtp,setInputOtp]=useState('')

    //////// Info States ////

    const [info,setInfo]=useState(false)
    const [title,setTitle]=useState('')
    const [userName,setUserName]=useState('')
    const [emailId,setEmailId]=useState('')
    const [mobileNo,setMobileNo]=useState(props.mobileno)
    const [addressOne,setAddressOne]=useState('')
    const [addressTwo,setAddressTwo]=useState('')
    const [state,setState]=useState('')
    const [city,setCity]=useState('')
    const [pinCode,setPinCode]=useState('')
   const [addressStatus,setAddressStatus]=useState('')
   const[handleDialog,setHandleDialog]=useState(true)
   const [message,setMessage]=useState('')
    





    useEffect(function(){
      if(handleDialog)
      { 
      setOpenOtp(props.openOtp)
      } 
    },[props.openOtp])
    


   const CheckOtp=(event)=>{

    var inputOtp='' 
    //alert(document.getElementById('first').value)
    if(document.getElementById('first').value.length==1)
    {
      document.getElementById('second').focus()
      inputOtp+=document.getElementById('first').value
    }
     if(document.getElementById('second').value.length==1)
    {
      document.getElementById('third').focus()
      inputOtp+=document.getElementById('second').value
    }
     if(document.getElementById('third').value.length==1)
    {
      document.getElementById('fourth').focus()
      inputOtp+=document.getElementById('third').value
    }
     if(document.getElementById('fourth').value.length==1)
    {
      inputOtp+=document.getElementById('fourth').value
      setInputOtp(inputOtp)
    }
   }

      const openOtpDilog=()=>{
        return (
        <div><Dialog
              open={openOtp}
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
                 <div onClick={handleClose} style={{display:'flex',justifyContent:'flex-Start',fontFamily:'Poppins',fontSize:15,color:'green'}}>
                    Back
                 </div>
                <div style={{display:'flex',justifyContent:'center'}}>
                {"Phone Number Verification"}
               </div>
          
        </DialogTitle>
      
              <DialogContent style={{background:'#f1f2f6'}}>
                  <DialogContentText   style={{display:'flex',justifyContent:'center',marginTop:'5%',fontFamily:'Poppins',fontSize:15,fontWeight:'bold'}}>
                    Enter 4 digit code sent to your phone
                  </DialogContentText>

                  <DialogContentText  style={{display:'flex',justifyContent:'center',marginTop:'2%',fontFamily:'Poppins',fontSize:15,fontWeight:'bold',marginBottom:'2%'}}>
                    {`+91XXXXXX${props.mobileno.substring(6)}`}
                  </DialogContentText>

                <DialogActions style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
                  <div >
                    <div style={{display:'flex',justifyContent:'space-around',marginTop:'2%',flexDirection:'row'}}>

                     <div  style={{width:74,marginRight:'3%',height:43,justifyContent:'center',display:'flex',alignItems:'center'}}>
                      <TextField id='first' onChange={(event)=>CheckOtp(event)} color='success'/>
                     </div>

                     <div  style={{width:74,marginRight:'3%',height:43,justifyContent:'center',display:'flex',alignItems:'center'}}>
                      <TextField id='second' onChange={(event)=>CheckOtp(event)}  variant="outlined"  color='success' />
                     </div>

                     <div   style={{width:74,marginRight:'3%',height:43,justifyContent:'center',display:'flex',alignItems:'center'}}>
                      <TextField id='third' onChange={(event)=>CheckOtp(event)} color='success'/>
                     </div>

                     <div  style={{width:74,marginRight:'0%',height:43,justifyContent:'center',display:'flex',alignItems:'center'}}>
                       <TextField id='fourth' onChange={(event)=>CheckOtp(event)} color='success'/>
                     </div>

                   </div>
                   </div>
                    <div style={{marginTop:'5%',display:'flex',justifyContent:'center'}}>
                    <div  style={{width:300,height:'43px',display:'flex',justifyContent:'center',alignItems:'center',border:'1px solid #27ae60',borderRadius:4,background:'#27ae60',marginRight:8}}
                    onClick={handle}>
                     Submit
                   </div>
                  </div>
                </DialogActions>
                <DialogActions>
                  
                </DialogActions>

                  <DialogContentText>  
                   <div style={{cursor:'pointer',display:'flex',justifyContent:'center',marginTop:'1%',marginBottom:'2%',fontFamily:'Poppins',fontSize:18,color:'green'}}>
                     Resent Code
                     
                   </div>
                   <div style={{color:'red',fontSize:14,display:'flex',justifyContent:'center'}}>
                      {message}
                     </div>
                  </DialogContentText>
              </DialogContent>
            </Dialog>
            </div>)
            }

            const handleClose=()=>{
              props.setOpenOtp(false)
              setOpenOtp(false)
             }

      const handle=async()=>{
            
             if(parseInt(props.otp)==parseInt(getInputOtp))
           {  props.setOpenOtp(false)
              props.setStatus(false)
            var mobilenostatus=await postData('userInterface/check_mobile_no',{mobileno:props.mobileno})
            if(mobilenostatus.status)
            {
                var addressstatus=await postData('userInterface/check_address_by_mobile_no',{mobileno:props.mobileno})
                if(addressstatus.status)
                { setHandleDialog(false)
                  props.setBtnTitle('Pay')
                  props.setUserAddress(addressstatus.data)
                  dispatch({type:'ADD_USER',payload:[addressstatus.data[0]]})
                }
                else
                { 
                  setHandleDialog(false)
                  setInfo(true)
                }
            }
            else
            {
            setHandleDialog(false)
                props.setOpenOtp(false)
              setInfo(true)
            }     
       }
       else
       { 
        setMessage('Otp Incorrect')
    }

      }





    const handleSubmit=async()=>{

      
      var body={username:title+" "+userName,emailid:emailId,mobileno:props.mobileno,addressone:addressOne,addresstwo:addressTwo,state:state,city:city,pincode:pinCode,addressstatus:'default'}
       
      var result=await postData('userInterface/add_address',body)
     
      setInfo(false)
      if(result.status)
      {  
              var addressstatus=await postData('userInterface/check_address_by_mobile_no',{mobileno:props.mobileno})
                if(addressstatus.status)
                { setHandleDialog(false)
                  props.setBtnTitle('Pay')
                  props.setUserAddress(addressstatus.data)
                  dispatch({type:'ADD_USER',payload:[addressstatus.data[0]]})
                }
               else
               {
                Swal.fire({
                  position: 'center',
                  icon: 'error',
                  title: 'Somethinge is worng please relogin ',
                  showConfirmButton: false,
                  timer: 1500
                })
               }
       
      }
     }

     
     
    const openUserInfoDialog=()=>{
      return (<Dialog
            open={info}
            
            sx={{
                "& .MuiDialog-container": {
                
                  "& .MuiPaper-root": {
                    width: "100%",
                    height: "100%",
                    maxWidth: "870px",
                    maxHeight:'510px',
                    borderRadius:5  // Set your width here
                  },
                },
              }}
             >
          <div style={{display:'flex',flexDirection:'row'}}>

                {sm?<> 
                </>:<>
                <DialogTitle style={{fontFamily:'Poppins',fontSize:22,justifyContent:'center',display:'flex',width:sm?'90%':'39%',height:'478px',backgroundColor:'#ffffff'}}>
                  <Avatar src={`/assets/map2.jpg` } style={{width:'100%',background:'green',height:'465px',marginTop:'2%',borderRadius:20}} variant="square"/>
                </DialogTitle>
                </>}
           

            <DialogTitle style={{fontFamily:'Poppins',fontSize:22,height:50,paddingTop:sm?'7%':'3%',justifyContent:'center',display:'flex',width:sm?'86%':'49%',height:'467px',background:'#fffff'}}>
              <div>
                 

                  <Grid container spacing={2}>
                     <div style={{fontFamily:'Poppins',fontSize:20,fontWeight:600,marginLeft:'3%',marginTop:'2%'}}>
                       Enter complete address
                     </div>

                      <div style={{fontFamily:'Poppins',fontSize:13,color:'grey',fontWeight:600,marginBottom:'1%',marginLeft:'3%'}}>
                        This allow us to find you easily and give you timely delivery experience
                      </div>

                      <Grid item xs={3}>
                       <FormControl fullWidth size="small">
                        <InputLabel id="demo-simple-select-label">Title</InputLabel>
                         <Select
                           value={title}
                           label="Title"
                           onChange={(event)=>setTitle(event.target.value)}
                          >
                          <MenuItem value='Mr'>Mr</MenuItem>
                          <MenuItem value='Mrs'>Mrs</MenuItem>
                          <MenuItem value='Miss'>Miss</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={9}>
                      <TextField onChange={(event)=>setUserName(event.target.value)} variant='outlined' label='Name'  size="small"  fullWidth />
                      </Grid>

                      <Grid item xs={6}>
                      <TextField onChange={(event)=>setEmailId(event.target.value)} variant='outlined' label='Email Id'  size="small"  fullWidth />
                      </Grid>

                      <Grid item xs={6}>
                      <TextField disabled value={props.mobileno} onChange={(event)=>setMobileNo(event.target.value)} variant='outlined' label='Number'  size="small"  fullWidth />
                      </Grid>

                      <Grid item xs={12}>
                      <TextField onChange={(event)=>setAddressOne(event.target.value)} variant='outlined' label='Home Address'  size="small"  fullWidth />
                      </Grid>

                      <Grid item xs={12}>
                      <TextField onChange={(event)=>setAddressTwo(event.target.value)} variant='outlined' label='Office Address'  size="small"  fullWidth />
                      </Grid>

                      <Grid item xs={4}>
                      <TextField onChange={(event)=>setState(event.target.value)} variant='outlined' label='State'  size="small"  fullWidth />
                      </Grid>

                      <Grid item xs={4}>
                      <TextField onChange={(event)=>setCity(event.target.value)} variant='outlined' label='City'  size="small"  fullWidth />
                      </Grid>

                      <Grid item xs={4}>
                      <TextField onChange={(event)=>setPinCode(event.target.value)} variant='outlined' label='Pin Code'  size="small"  fullWidth />
                      </Grid>

                      <Grid item xs={12}>
                      <TextField  variant='outlined' label='Hobbies' size='small' fullWidth />
                      </Grid>

                      <Grid item xs={12}>
                      <Button fullWidth onClick={handleSubmit} variant="contained">Submit</Button>
                         </Grid>
                  </Grid>
              </div>
            </DialogTitle>
          </div> 
        </Dialog>)}





   
    return(<div >
        <div>
        {openOtpDilog()}
        </div>
        {openUserInfoDialog()}
    </div>)
}