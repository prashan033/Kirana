import { AppBar,Toolbar,useMediaQuery,Badge } from "@mui/material";
import { useState } from "react";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import FormControl from '@mui/material/FormControl';
import { useTheme } from '@mui/material/styles';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


export default function Header(props){
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const lg = useMediaQuery(theme.breakpoints.up('lg'));
    const navigate=useNavigate()
    
    var products=useSelector((state)=>state.products)
    var totalproducts=Object.keys(products)

    const handleClick =  () => {
      props.setOpen(true )
    };

   
    return(
    <div style={{width:'100wv'}}>
        <AppBar style={{background:'#fff',width:'100%'}}>
            <Toolbar >
            <div style={{display:'flex',alignItems:'center',width:'100%',height:'100%'}}>
            <div onClick={()=>{navigate('/home')}} style={{cursor:'pointer',color:'#000',fontFamily:'Poppins',fontSize:24}}>
            {matches?`QuickShopee`:`QS`} 
           </div>
            
            <div style={{display:'flex',justifyContent:'center',width:'70%',paddingLeft:3,paddingRight:3}}>
            <FormControl sx={{ m: 1, width:matches?`60%`:`80%` }} variant="filled">
          <OutlinedInput
            id="filled-adornment-weight"
            endAdornment={<InputAdornment position="end"><SearchIcon/></InputAdornment>}
            aria-describedby="outlined-weight-helper-text"
            inputProps={{
              'aria-label': 'weight',
            }}
            style={{
              borderRadius:30,
              
            }}
          />
          </FormControl>
            </div>

           <div style={{color:'#2980b9',marginLeft:'auto',display:'flex',justifyContent:"space-between"}}>
           <Badge badgeContent={totalproducts.length} color="success" style={{marginRight:lg?20:5}}>
            <ShoppingCartIcon onClick={()=>navigate('/cart')} style={{padding:'10%',cursor:'pointer'}} />
            </Badge>
            <PersonIcon onClick={handleClick} style={{cursor:'pointer',padding:'5%',marginRight:lg?20:0}}/>
           
           </div>
           </div>
            </Toolbar>
           
        </AppBar>
    </div>)

}