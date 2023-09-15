import { makeStyles } from "@mui/styles"

import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';




export const useStyles = makeStyles({

    
    footer: {
        fontFamily:'Poppins',
        fontSize:22,
        fontWeight:'bold',
        marginTop:20,
        marginBottom:'1%',
        marginLeft:'3%'
    },
    footer2:{
        display: 'flex',
         
        justifyContent: 'space-between', 
        flexDirection: 'row' 
    },
    footer3:{
        marginLeft:'5%',
        display:'inline-block',
        width:'200px',
        paddingBlock:'10px'
        
    },
    footer4:{
        border: '1px solid grey', 
        display: 'flex', 
        padding:5, 
        width:"70%", 
        borderRadius: 5
    },
    footer5:{
        fontSize: '13px',
        marginLeft:10 
    }
   
  });