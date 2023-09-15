import React ,{ useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import {Avatar, Paper} from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import { serverURL } from '../../../administrator/services/FetchNodeServices';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';


export default function User(props) {
 

  const [open, setOpen] = useState(props.open)
  
  useEffect(function(){
    setOpen(props.open)
  },[props.open])


  const handleClose = () => {
    props.setOpen(false)
  };

 
  const page=()=>{
  return(<div>
    <div style={{margin:'10%',display:'flex',justifyContent:'center'}}>
                   <Avatar src={`/assets/pic.png` } style={{width:70,height:70}} />
                 </div>
                  <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                   // onKeyDown={handleListKeyDown}
                   
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </MenuList>
                </ClickAwayListener>
                </div>
    
  )
  
  }

  return (
    
      <Snackbar
        anchorOrigin={{  vertical: 'top', horizontal: 'right' }}
        open={open}
        autoHideDuration={6000}
        style={{width:'10%',marginTop:'55px'}}
      >
        <Paper elevation={2} onClose={handleClose} style={{background:'white'}} sx={{ width: '100%' }}>
       {page()}
       </Paper>
      </Snackbar>
      
  );
}