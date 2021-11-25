import React from 'react'
import { Profilepage } from './components/Profilepage'
import EditProfile from "./EditProfile/EditProfile";

const Profile = () => {
    return (
       <div style={{background:'#efefef'}}>
            <Profilepage/>
            <EditProfile/>
       </div>

    )
}

export default Profile
