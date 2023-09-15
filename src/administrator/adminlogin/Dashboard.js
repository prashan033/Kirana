import { AppBar,Toolbar,Grid,Paper,Avatar } from "@mui/material";
import { serverURL } from "../services/FetchNodeServices";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/Inbox';
import { Routes,Route } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import CategoryInterface from "../categories/CategoryInterface";
import DisplayAllCategory from "../categories/DisplayAllCategory";
import SubCategoryNew from "../subCategorys/SubCategoryNew";
import DisplayAllSubCategory from "../subCategorys/DisplayAllSubCategory";
import ProductInterface from "../product/ProductInterface";
import DisplayProduct from "../product/DisplayProduct";
import BannersInterface from "../banners/BannersInterface";
import ProductListInterface from "../productList/ProductListInterface";
import DisplayProductList from "../productList/DisplayProductList";
import ProductPictureInterface from "../productPicture/ProductPictureInterface";
import AdminLoginInterface from "../adminlogin/AdminLoginInterface";



export default function DashBoard(){
 
    var admin=JSON.parse(localStorage.getItem("ADMIN"))
    const navigate=useNavigate()

    const handleLogOut=()=>{
      navigate('/adminlogininterface')
    }

    return(<div>
       <AppBar style={{background:'#fff'}} >
         <Toolbar>
            <div  style={{color:'#000',fontFamily:'Poppins',letterSpacing:1,fontWeight:'bold',fontSize:24}}>
                QuickShopee
            </div>
         </Toolbar>
       </AppBar>

       <div  style={{marginTop:'5%'}}>
       <Grid container spacing={2}>
            <Grid item xs={2}>
             <Paper style={{display:'flex',flexDirection:'column',margin:5,padding:5,marginRight:5,marginBottom:10}}>
                
                <Paper elevation={3} style={{background:"#bdc3c7",flexDirection:'column',display:'flex',alignItems:'center',justifyContent:'center',width:200,padding:10,marginBottom:10}}>
                   
                 <Avatar src={`${serverURL}/images/pic.jpg` } style={{width:70,height:70}} />
                 
                 <div style={{fontFamily:'Poppins',fontWeight:'bold',paddingBottom:5}}>
                 {admin.adminname}
                  </div>
                  
                  <div style={{fontSize:12,fontFamily:'Poppins',fontWeight:'bold',paddingBottom:5}}>
                    {admin.emailid}
                  </div>

                </Paper>
         <List>
          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/dashboard/displayallcategory')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Category</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/dashboard/displayallsubcategory')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Sub Category</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={()=>navigate('/dashboard/displayproduct')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Product</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton  onClick={()=>navigate('/dashboard/displayproductlist')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Product List</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton  onClick={()=>navigate('/dashboard/productpictureinterface')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Product Picture</span>} />
            </ListItemButton>
          </ListItem>

        
          <ListItem disablePadding>
            <ListItemButton  onClick={()=>navigate('/dashboard/bannersinterface')}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Banner</span>} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton  onClick={handleLogOut}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary={<span style={{fontFamily:'Poppins',fontWeight:'700'}}>Logout</span>} />
            </ListItemButton>
          </ListItem>
          
        </List>

             </Paper>
            </Grid>
            <Grid item xs={10}>
              {/* Dashboard Routers */}
         <Routes>
         <Route element={<CategoryInterface/>} path="/categoryinterface" />
            <Route element={<DisplayAllCategory/>} path="/displayallcategory" />
            <Route element={<SubCategoryNew/>} path="/subcategorynew" />
            <Route element={<DisplayAllSubCategory/>} path="/displayallsubcategory" />
            <Route element={<ProductInterface/>} path="/productinterface" />
            <Route element={<DisplayProduct/>} path="/displayproduct" />
            <Route element={<BannersInterface />} path="/bannersinterface" />
            <Route element={<DisplayProductList/>} path="/displayproductlist" />
            <Route element={<ProductListInterface />} path="/productListinterface" />
            <Route element={<ProductPictureInterface/>} path="/productpictureinterface" />
            


         </Routes>
            </Grid>
           

         </Grid>
         </div>
        
    </div>)
}