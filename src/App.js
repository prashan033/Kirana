import { Routes,BrowserRouter as Router,Route } from "react-router-dom";
import AdminLoginInterface from "./administrator/adminlogin/AdminLoginInterface";
import DashBoard from "./administrator/adminlogin/Dashboard";
import Home from "./userinterface/screens/Home";
import ProductViewWithCategory from "./userinterface/screens/ProductViewWithCategory";
import ViewProductComponent from "./userinterface/screens/ViewProductComponent";
import Cart from "./userinterface/screens/Cart";
import LoginOtp from "./userinterface/components/popUpComponent/LoginOtp";
import Login from "./userinterface/components/popUpComponent/Login";
import UserInfo from "./userinterface/components/popUpComponent/UserInfo";
import MakePayment from "./userinterface/screens/MakePayment";
import ClippedDrawer from "./userinterface/components/popUpComponent/UserInfo"; 
import User from "./userinterface/components/popUpComponent/UserInfo";





function App() {
  return (
    <div>
        <Router>
          <Routes>
         
            <Route element={<AdminLoginInterface />} path="/adminlogininterface" />
            <Route element={<DashBoard />} path="/dashBoard/*" />
            <Route element={<Home />} path="/home" />
            <Route element={<ProductViewWithCategory />} path="/productviewwithcategory" />
            <Route element={<ViewProductComponent />} path="/viewproductcomponent" />
            <Route element={<Cart />} path="/cart" />
            <Route element={<LoginOtp />} path="/loginotp" />
            <Route element={<Login />} path="/login" />
            <Route element={<UserInfo />} path="/userinfo" />
            <Route element={<MakePayment />} path="/makepayment" />
            <Route element={<ClippedDrawer/>} path="/ClippedDrawer" />
            <Route element={<User/>} path="/user" />
            
            
             </Routes>
        </Router>
    </div>
  )
}

export default App;

