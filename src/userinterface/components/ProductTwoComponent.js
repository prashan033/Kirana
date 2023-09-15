import React,{createRef} from "react";
import Slider from "react-slick";
import { useMediaQuery,Paper, Button } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../administrator/services/FetchNodeServices";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material/styles';



export default function ProductTwoComponent(props){
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const xs = useMediaQuery(theme.breakpoints.down('xs'));

    var sliderRef=createRef()
    var color=['#55efc4','#81ecec','#ffeaa7','#dfe6e9','#fd79a8','#f7f1e3','#ccae62','#786fa6']
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: xs?1:sm?2:md?3:lg?4:7,
        slidesToScroll: 1,
        autoplay: false,
        autoplaySpeed: 3000,
      };

      var images=[
        {id:1,name:'Amul Milk',images:'p1.avif',price:'300',offer:'20%',weight:'200g'},
        {id:2,name:'Amul Butter',images:'p2.avif',price:'200',offer:'20%',weight:'200g'},
        {id:3,name:'Amul Paped',images:'p3.avif',price:'100',offer:'20%',weight:'200g'},
        {id:4,name:'Butter Milk',images:'p4.avif',price:'400',offer:'20%',weight:'300g'},
        {id:5,name:'Amul Crud',images:'p5.avif',price:'600',offer:'20%',weight:'400g'},
        {id:6,name:'Amul Ghee',images:'p6.avif',price:'700',offer:'20%',weight:'500g'},
        {id:7,name:'Amul Choklate',images:'p1.avif',price:'400',offer:'20%',weight:'600g'},
        {id:6,name:'Amul Ghee',images:'p6.avif',price:'700',offer:'20%',weight:'500g'},
        {id:7,name:'Amul Choklate',images:'p1.avif',price:'400',offer:'20%',weight:'600g'},
        
               ]
    
    const showImages=()=>{
        return props.products.map((item)=>{
          return(<div style={{margin:2}}>
            <Paper style={{marginBottom:10,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',width:180,height:250}} elevation={4} variant="outlined">
                <div style={{padding:2,display:'flex',justifyContent:'center',alignItems:'center',width:178}}>
                <img src={`${serverURL}/images/${item.picture}`} width='80%' />
               
                </div>
                <div style={{fontFamily:'Poppins',fontSize:14,fontWeight:700,margin:5,textAlign:'center',width:180}}>{item.productlistname}</div>
              <div style={{fontFamily:'Poppins',display:'flex',flexDirection:'column',width:178,padding:2}}>
               <div style={{paddingLeft:10,fontSize:12}}>{item.weight}{" "}{item.type}</div>
               <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
               <div style={{display:'flex',flexDirection:'column'}}>
               <div style={{paddingLeft:10,fontSize:12}}>&#8377; <s>{item.rate}</s></div>
               <div style={{paddingLeft:10,fontSize:12}}>&#8377; {item.offer}</div>
               </div>
               <div style={{paddingRight:10}}>
                <Button  variant="outlined">Add</Button>
               </div>
               </div>
              </div>
            </Paper>
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
        <div>
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
           
         <Slider {...settings} ref={sliderRef} >
          {showImages()}
         </Slider>
        
        
       </div>
      )

}