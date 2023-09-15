
import React,{createRef, useEffect, useState} from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { postData, serverURL,getData } from "../../../administrator/services/FetchNodeServices";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme } from '@mui/material/styles';
import { Paper, useMediaQuery ,Avatar,Divider} from "@mui/material";
import Description from "./Description";



export default function ViewImageComponent({product}){
    
    var sliderRef=createRef()
    const theme = useTheme();
    const [picture,setPicture]=useState([])
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const xs = useMediaQuery(theme.breakpoints.down('xs'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));

    const matches = useMediaQuery(theme.breakpoints.up('md'));
    const[image,setImage]=useState('')
    const[change,setChange]=useState('')
    const[productList,setProductList]=useState([])


    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow:sm?5:md?3:lg?4:6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
      };

     var images=[
        {id:1,images:'g1.jpeg'},
        {id:1,images:'g2.jpeg'},
        {id:1,images:'g3.jpeg'},
        {id:1,images:'g4.jpeg'},
        {id:1,images:'g1.jpeg'},
        {id:1,images:'g2.jpeg'},
        {id:1,images:'g3.jpeg'},
      
              ]

        const fetchAllPictures=async()=>{
            var result=await postData('userInterface/fetch_all_multipal_images_by_productid',{productlistid:product.productlistid})
            setPicture(result.data[0].pictures.split(","))
           
        }

        const fetchAllProductList=async()=>{
            var result=await postData('userInterface/productlist_list',{productlistid:product.productlistid})
            setProductList(result.data)
        }

       const handleChangeImage=(item)=>{
        setImage(`${serverURL}/images/${item}`)
        setChange(2)
       }       

       

       useEffect(function(){
        fetchAllPictures()
        fetchAllProductList()
       },[])

       
    
    const showImages=()=>{
        
        return picture.map((item)=>{
            return(<div style={{display:'flex',justifyContent:'center'}}>
            <Paper onClick={()=>handleChangeImage(item)} style={{width:sm?'40px':'60px',height:sm?'40px':'60px',padding:sm?4:8,marginLeft:'8%'}}  variant='outlined'>
             <img src={`${serverURL}/images/${item}`} width='98%'    />
            </Paper>
            </div>
            )
        })
    }
    

    const productImage=()=>{
        
        return productList.map((item)=>{
            return( <div style={{width:'50%',height:'50%'}}>
            <Avatar  src={`${serverURL}/images/${item.picture}`} style={{width:'100%',height:'100%'}} variant="square" />
            </div>
            )
        })
    }
  

    const handleBackClick=()=>{
        sliderRef.current.slickPrev()
    }

    const handleForwardClick=()=>{
        sliderRef.current.slickNext()
    }

      return(<div style={{width:'100%'}}>
         <div style={{display:'flex',justifyContent:'center'}}>
         {change!=2?
         <>
         {productImage()}
         </>
         :
         <div style={{width:'50%',height:'50%'}}>
          <Avatar src={image} style={{width:'100%',height:'100%'}} variant="square" />
          </div>
         
         }
    
         
         </div>
     
        <div style={{position:'relative',padding:'9%'}}>

        {matches?<><Paper style={{position:'absolute',top:'36%',left:'1%',zIndex:1,width:45,height:45,borderRadius:34,background:'#fff',opacity:0.7,display:'flex',alignItems:'center',justifyContent:'center'}} elevation={4} variant='outlined'>
        <ArrowBackIosNewIcon onClick={handleBackClick} style={{color:'#000'}}/>
            </Paper></>:<></>}
        
         <Slider {...settings} ref={sliderRef} >
          {showImages()}
         </Slider>
        
        {matches?<> <Paper style={{position:'absolute',top:'36%',right:'1%',zIndex:1,width:45,height:45,borderRadius:34,background:'#fff',opacity:0.7,display:'flex',alignItems:'center',justifyContent:'center'}} elevation={4} variant='outlined'>
        < ArrowForwardIosIcon onClick={handleForwardClick} style={{color:'#000'}}/>
            </Paper></>:<></>}
            
           
       </div>
       
       <Divider style={{marginBottom:sm?0:40}} />
      
       {!lg?<>
        <Description />
        </>:<></>}
                   
     

       </div>
      )

}
