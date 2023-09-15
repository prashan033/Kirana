import React,{createRef} from "react";
import Slider from "react-slick";
import { useMediaQuery } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../administrator/services/FetchNodeServices";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material/styles';
import { useNavigate} from "react-router-dom";


export default function CircleScrollComponent(props){
    const theme = useTheme();
    const navigate=useNavigate()
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const md = useMediaQuery(theme.breakpoints.down('md'));

    var sliderRef=createRef()
    var color=['#55efc4','#81ecec','#ffeaa7','#dfe6e9','#fd79a8','#f7f1e3','#ccae62','#786fa6']
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: sm?3:md?4:lg?5:7,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
      };

      var images=[
        {id:1,images:'Detergent.png',name:'Detergent'},
        {id:2,images:'rice.png',name:'Rice'}, 
        {id:3,images:'Edible Oil.jpeg',name:'Edible Oils'},
        {id:4,images:'dairy.png',name:'dairy & bakery'},
        {id:5,images:'SaltSugar.jpeg',name:'Salt & Sugar'},
        {id:6,images:'indianspices.jpeg',name:'Indian Masala'},
        {id:7,images:'rice.png',name:'Rice'}, 
        {id:5,images:'SaltSugar.jpeg',name:'Salt & Sugar'},
        {id:6,images:'indianspices.jpeg',name:'Indian Masala'}
               ]
    
    const showImages=()=>{
        return props.category.map((item)=>{
            return(<div onClick={()=>handleClick(item)} style={{cursor:'pointer',display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                <div style={{padding:2,display:'flex',justifyContent:'center',alignItems:'center',width:sm?90:180,height:sm?90:180,borderRadius:sm?45:90,background:color[parseInt(Math.random()*(color.length-1))]}}>
                <img src={`${serverURL}/images/${item.icon}`} width='80%' />
               
                </div>
                <div style={{fontFamily:'Poppins',fontSize:sm?10:14,fontWeight:700,margin:5,textAlign:'center',width:sm?90:180}}>{item.categoryname}</div>
            </div>)
        })
    }

    const handleBackClick=()=>{
        sliderRef.current.slickPrev()
    }

    const handleForwardClick=()=>{
        sliderRef.current.slickNext()
    }

    const handleClick=(item)=>{
      navigate("/productviewwithcategory",{state:{categoryid:item.categoryid}})
    }

      return(
        <div >
              <div style={{padding:5,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{fontFamily:'Poppins',fontSize:!lg?22:16,fontWeight:'bold',marginBottom:10}}>
             {props.title}
            </div>
          {!lg?<><div style={{display:'flex',flexDirection:'row',width:'4%'}}>
            <div >
        <ArrowBackIosNewIcon onClick={handleBackClick} style={{color:'#000'}}/>
            </div>
            <div >
        < ArrowForwardIosIcon onClick={handleForwardClick} style={{color:'#000'}}/>
            </div>
            </div></>:<></>}
            </div>
           
         <Slider {...settings} ref={sliderRef}>
          {showImages()}
         </Slider>
        
        
       </div>
      )

}