import React from 'react'
import logo1 from './img/logo.png'
import notification from './img/notification.png'
import inbox from './img/inbox.png'
import video from './img/video.png'
import search from './img/search.png'
import ppic from './img/profile-pic.png'

import './profile.css';

export const Navbar = () => {
    return (
        <div>
        <nav>
            <div className="nav-left">
                <img src={logo1} alt="" className="logo"/>
                <ul>
                    <li><img src={notification} alt="" /></li>
                    <li><img src={inbox} alt="" /></li>
                    <li><img src={video} alt="" /></li>
                </ul>
            </div>
            <div className="nav-right">
                <div className="search-box">
                    <img src={search} alt="" />
                    <input type="text" placeholder="Search"/>
                </div>
                <div className="nav-user-icon online">
                    <img src={ppic} alt="" />
                </div>
            </div>
        </nav>
    </div>
    
    )
}
