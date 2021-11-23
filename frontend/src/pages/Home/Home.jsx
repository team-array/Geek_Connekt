import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import {HomePage,Main,MainContext,ImgContainer} from './Home.styles.jsx';
import {AppName} from "../../constants";
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import SocialUpdate from "../../assets/SocialUpdate.png";
import {useNavigate} from 'react-router-dom';

const Home = () => {
    const navigation = useNavigate();
    const onclick_login = () => {
        navigation('/login');
    }
    return (
        <HomePage>
            <Navbar name={AppName} action="Login" action_func = {onclick_login}/>
            <Main>
                <MainContext data-aos="fade-right">
                    <h1 style={{color:"#",fontWeight:"bold",wordSpacing:"0.3rem",wordWrap:"break-word"}}>Welcome to <span style={{color:"#0630ba",wordSpacing:"0rem"}}>{AppName}</span></h1>
                    <p style={{fontSize:"1.5rem",fontWeight:"600",color:"#444",fontStyle:"normal"}}>a social media platform for cmr college of engineering and technology.This is a web application that acts as a private social network for students, alumni, faculty and management of an institution</p>
                    {/* <p className="mt-0" style={{fontSize:"1.5rem",fontWeight:"600",color:"#444"}}>web application that acts as a private social network for students, alumni, faculty and management of an institution</p> */}
                    <Button variant="contained" className="MainContextButton"
                        style={{
                            fontSize:"1.2rem",
                            fontWeight:"800",
                            // color:"#0630ba",
                        }}
                        onClick={onclick_login}
                    >Get Started &nbsp; <ArrowForwardIosIcon style={{fontSize:"1.2rem"}}/></Button>
                </MainContext>
                <ImgContainer img={SocialUpdate} data-aos="fade-left">
                </ImgContainer>
                
            </Main>
        </HomePage>
    )
}

export default Home;
