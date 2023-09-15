
import React,{createRef} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../administrator/services/FetchNodeServices";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material/styles';
import { Paper, useMediaQuery } from "@mui/material";


export default function AddComponent(props){
    var sliderRef=createRef()
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.up('md'));
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };

      var images=[
        {id:1,images:'morning.avif'},
        {id:2,images:'banner2.avif'},
        {id:3,images:'banner3.avif'},
        {id:4,images:'banner4.avif'},
        {id:5,images:'banner5.avif'},
        {id:6,images:'banner6.avif'},
        
      
              ]
    
    const showImages=()=>{
        return images.map((item)=>{
            return(<div  >
                <img src={`${serverURL}/images/${item.images}`} width='98%' style={{borderRadius:15}} />
            </div>)
        })
    }

    const handleBackClick=()=>{
        sliderRef.current.slickPrev()
    }

    const handleForwardClick=()=>{
        sliderRef.current.slickNext()
    }

      return(
        <div style={{position:'relative'}}>

        {matches?<><Paper style={{position:'absolute',top:'35%',left:'1%',zIndex:1,width:50,height:50,borderRadius:24,background:'#fff',opacity:0.7,display:'flex',alignItems:'center',justifyContent:'center'}}>
        <ArrowBackIosNewIcon onClick={handleBackClick} style={{color:'#000'}}/>
            </Paper></>:<></>}
        
         <Slider {...settings} ref={sliderRef} >
          {showImages()}
         </Slider>
        
        {matches?<> <Paper style={{position:'absolute',top:'35%',right:'1%',zIndex:1,width:50,height:50,borderRadius:24,background:'#fff',opacity:0.7,display:'flex',alignItems:'center',justifyContent:'center'}}>
        < ArrowForwardIosIcon onClick={handleForwardClick} style={{color:'#000'}}/>
            </Paper></>:<></>}
        
       </div>
      )

}
