import React from 'react';
import Navbar from './Navbar/Navbar';
import {AppName} from '../../../constants';
import ProfilePage from "../Profile/Profile";
import {useNavigate} from 'react-router-dom';
import Footer from './Footer/Footer';
import Feed from "../Feed/Feed";
import Favorites from "../Favorites/Favorites";
import Events from "../Events/Events";
import {useSelector} from "react-redux";
import AddPost from "../AddPost/AddPost";

const Dashboard = () => {
    const currentPage = useSelector(state => state.currentPage);
    const navigate = useNavigate();
    const logout = () => {
        navigate("/");
    }
    const myprofile = () => {

    }
    const others_profile = () => {
        
    }
    const notifications = () => {

    }
    return (
        <div className="dashboard">
            <Navbar name={AppName} logout={logout} myprofile={myprofile} others_profile={others_profile}
                notifications={notifications}/>
            {
                currentPage === 0 ? <Feed/> :
                    currentPage === 1 ? <Favorites/> :
                        currentPage === 2 ? <AddPost/> :
                            currentPage === 3 ? <Events/> :
                                currentPage === 4 ? <ProfilePage/> : <></>
            }
            <Footer/>
        </div>
    )
}

export default Dashboard;
