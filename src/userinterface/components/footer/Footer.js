import React, { useEffect, useState } from "react";
import { Divider, Grid} from "@mui/material";
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AppleIcon from '@mui/icons-material/Apple';
import { useMediaQuery } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { getData,serverURL } from "../../../administrator/services/FetchNodeServices";
import { useStyles } from "./FooterCss";

export default function Footer(props) {

    const [category,setCategory]=useState([])
    const clasess=useStyles()
    const theme = useTheme();
    const sm = useMediaQuery(theme.breakpoints.down('sm'));
    const md = useMediaQuery(theme.breakpoints.down('md'));
    const lg = useMediaQuery(theme.breakpoints.down('lg'));

    useEffect(function(){
        fetchcategory()
    },[])

    const fetchcategory=async()=>{
        var result=await getData('userinterface/fetch_all_category_for_footer')
        setCategory(result.data)
    }    

    

    return (<div>

        <Divider/>
        <div className={clasess.footer} >
            <div>
            Categories
            </div>
        </div>
        <div style={{marginBottom:'2%'}} >
            <div >
            {category.map((item)=>{
                return(<span className={clasess.footer3}>{item.categoryname}</span>)
              })}
        </div>
        </div>
        <Divider />

        <div className={clasess.footer2 } style={{margin:sm?10:50}} >

            <Grid container spacing={3}>
                <Grid item xs={12} md={4} lg={3} xl={3} sm={6}>

                    <div style={{fontFamily:'Poppins',fontSize:'40px'}} >Quickshopee</div>
                    <div style={{ display: 'flex', color: 'grey' }}>
                    <span style={{marginTop:20}}>
                        <span><InstagramIcon /></span>
                        <span style={{marginLeft:20}}><TwitterIcon /></span>
                        <span style={{marginLeft:20}}><FacebookIcon /></span>
                        <span style={{marginLeft:20}}><LinkedInIcon /></span>
                        </span>
                    </div>

                    <div style={{ color: 'grey', marginTop: 20 }}>
                        @ King Technologies Private Limited
                    </div>

                </Grid>
                <Grid item xs={12} md={4} lg={3} xl={3} sm={6}>
                    <div style={{ paddingLeft:sm?0:100 }}>
                        <p>Home</p>
                        <p>Dilevary Areas</p>
                        <p>Careers</p>
                        <p>Delivery Areas</p>
                        <p>Custemer Support</p>
                        
                    </div>
                </Grid>
                <Grid item xs={12} md={4} lg={3} xl={3} sm={6}>
                    <div style={{ paddingLeft:sm?0:md?0:100}}>
                        <p>Privacy Policy</p>
                        <p>Terms of Use</p>
                        <p>Responsible Disclosure Policy</p>
                    </div>
                </Grid>
                <Grid item xs={12} md={4} lg={3} xl={3} sm={6}>
                    <div style={{ paddingLeft:sm?0:md?100:lg?0:100 }}>

                        <p>Download App</p>
                        
                        <p className={clasess.footer4 }>
                            <div ><img src={`/assets/playstore.avif` } height="19px" width="19px" /></div>
                            <div className={clasess.footer5}>Get it on play store</div>
                        </p>

                        <p className={clasess.footer4 } >
                            <AppleIcon />
                        <div className={clasess.footer5}>Get it on app store</div>
                        </p>
                    </div>
                </Grid>
            </Grid>
        </div></div>
    )
}