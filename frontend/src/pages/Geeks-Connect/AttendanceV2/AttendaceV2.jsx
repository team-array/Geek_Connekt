import React from 'react';
import "./AttendanceV2.scss";
import SideBar from "./SideBar/SideBar";
import Profile from "./Profile/Profile";
import axios from "axios";
import {BaseUrl} from "../../../constants";
import Graphs from "./Graphs/Graphs";

const AttendaceV2 = () => {
const [userData, setUserData] = React.useState(null);
const [attendance,setAttendance] = React.useState([]);
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
  React.useEffect(() => {
    const getAttendance = async () => {
      const response = await axios({
        method: "post",
        url: BaseUrl + "/getAttendance",
        data: {
          userId: JSON.parse(localStorage.getItem("user")).id,
        },
      });
      console.log(response);
      if (response.data.success) {
        setAttendance(response.data);
      }
    }
    getAttendance();
  }, []);
    return userData && (
        <div className="AttendaceV2">
            <SideBar userData={userData} attendance={attendance} setpage={setpage} curr={curr}/>
            {
                (curr===0)?
                    <Profile userData={userData} />:<Graphs userData={userData} attendance={attendance}/>
            }
        </div>
    )
}

export default AttendaceV2
