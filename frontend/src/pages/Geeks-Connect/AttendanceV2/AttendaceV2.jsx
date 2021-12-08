import React from 'react';
import "./AttendanceV2.scss";
import SideBar from "./SideBar/SideBar";
import Profile from "./Profile/Profile";
import axios from "axios";
import {BaseUrl} from "../../../constants";

const AttendaceV2 = () => {
const [userData, setUserData] = React.useState(null);
const [curr,setcurr] = React.useState(0);
const setpage = (page) => {
    setcurr(page);
}
  React.useEffect(() => {
    const getUserData = async () => {
      const response = await axios({
        method: "post",
        url: BaseUrl + "/getUserDetails",
        data: {
          token: localStorage.getItem("jwt"),
        },
      });
      if (response.data.success) {
        setUserData(response.data.user);
      }
    };
    getUserData();
  }, []);
    return userData && (
        <div className="AttendaceV2">
            <SideBar userData={userData} setpage={setpage} curr={curr}/>
            {
                (curr===0)?
                    <Profile userData={userData}/>:""
            }
        </div>
    )
}

export default AttendaceV2
