import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { serverURL } from "../../administrator/services/FetchNodeServices";
import useRazorpay from "react-razorpay";
import { useEffect } from "react";

export default function MakePayment(){

const Razorpay = useRazorpay();
const navigate=useNavigate()
const dispatch=useDispatch()

    var user=useSelector((state)=>state.user)
    var userdata=Object.values(user)
    console.log("USERDATA",userdata)
    const products = useSelector((state)=>state.products);
    const productList=Object.values(products)
    let total=productList.reduce((a,b)=>{
       return a+b.offer*b.qty;
    },0);

 const handlePayment = () => {
 // const order = await createOrder(params); //  Create order on your backend

    const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH", // Enter the Key ID generated from the Dashboard
    amount: total*100+500, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: "INR",
    name: "Quick Shopee",
    description: "Test Transaction",
    //image: `http://${serverURL}/images/pic.jpg`,
   
    
    handler: (res)=> {

     dispatch({type:'CLEAR_CART',payload:[]})
     navigate("/home")

    },

    prefill: {
      name: userdata[0].username,
      email: "youremail@example.com",
      contact: userdata[0].mobileno,
    },

    notes: {
      address: "Razorpay Corporate Office",
    },

    theme: {
      color: "#3399cc",
    },

  };

  const rzpay = new window.Razorpay(options);
  rzpay.open();
}

  useEffect(function(){
   var timeout=setTimeout(handlePayment,1000)
  },[])

  return(
    <div>

    </div>
  )
}