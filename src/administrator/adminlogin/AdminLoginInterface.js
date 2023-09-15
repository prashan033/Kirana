import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { postData } from '../services/FetchNodeServices';

function Copyright(props) {
 

  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://numericinfosystem.com/">
        Numeric Infosystem Pvt Ltd.
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminLoginInterface() {
  const navigate=useNavigate()
  const[emailId,setEmailId]=useState('')
  const[password,setPassword]=useState('')

  const handleClick=async()=>{
   var result=await postData('adminLogin/checkadminlogin',{emailid:emailId,password:password})

   if(result.status)
   { localStorage.setItem("ADMIN",JSON.stringify(result.data))
     navigate('/dashboard')
   }
   else
   {
     Swal.fire({
       position: 'center',
       icon: 'error',
       title: result.message,
       showConfirmButton: true,
       timer: 1500
     })
   }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
          
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e)=>{setEmailId(e.target.value)}}
                autoFocus
              />

              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e)=>{setPassword(e.target.value)}}
                autoComplete="current-password"
              />

              <Button
                onClick={handleClick}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >

                Sign In
              </Button>
              
              <Copyright sx={{ mt: 5 }} />
            </Box>
          
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}