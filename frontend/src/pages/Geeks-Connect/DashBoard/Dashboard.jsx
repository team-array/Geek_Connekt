import React, { useEffect, useState } from "react";
import Navbar from "./Navbar/Navbar";
import { AppName } from "../../../constants";
import ProfilePage from "../Profile/Profile";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer/Footer";
import Feed from "../Feed/Feed";
import Favorites from "../Favorites/Favorites";
import Events from "../Events/Events";
import { useSelector, useDispatch } from "react-redux";
import AddPost from "../AddPost/AddPost";
import ProfessionalTools from "../ProfessionalTools/ProfessionalTools";
import Notifications from "../Notifications/Notifications";
import StarOfTheMonth from "../StarOfTheMonth/StarOfTheMonth";
import AcheivementsForm from "../AcheivementsForm/AcheivementsForm";
import axios from "axios";
import { BaseUrl,Ws } from "../../../constants";
import News from "../News/News";
import { io } from "socket.io-client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { notification } from 'antd';

const openNotificationWithIcon = type => {
  notification[type.type]({
    message: type.message,
    description:
        type.description,
  });
};

let socket;

const Dashboard = () => {
  const currentPage = useSelector((state) => state.currentPage);
  const showNotifications = useSelector((state) => state.showNotifications);
  const newNotificationCount = useSelector(
    (state) => state.newNotificationCount
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    socket = io(Ws);
    // console.log(socket);
  }, []);

  useEffect(() => {
    // console.log("Changed: ", socket);
    if (socket) {
      socket.on("like", (data) => {
        // console.log(data);
        dispatch({
          type: "SET_NEW_NOTIFICATION",
          payload: {
            type: "Like",
            title: data.lickedBy,
            postId: data.postId,
            image: data.profilePic,
            message: "Liked your post",
          },
        });
        dispatch({
          type: "SET_NEW_NOTIFICATION_COUNT",
        });
      });
      socket.on("comment", (data) => {
        // console.log(data);
        dispatch({
          type: "SET_NEW_NOTIFICATION",
          payload: {
            type: "Comment",
            title: data.lickedBy,
            postId: data.postId,
            image: data.profilePic,
            message: "Commented on your post",
          },
        });
        dispatch({
          type: "SET_NEW_NOTIFICATION_COUNT",
        });
      });
    }
  }, []);

  useEffect(() => {
    if (socket !== null && socket !== undefined) {
      const userId = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).id
        : null;
      socket.emit("newUser", userId);
    }
  }, [socket]);

  const logout = async () => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const response = await axios({
        url: `${BaseUrl}/logout`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        data: {
          token: localStorage.getItem("jwt"),
        },
      });
      dispatch({ type: "SET_LOADING", payload: false });
      localStorage.removeItem("jwt");
      window.location.reload();
    } catch (err) {
      dispatch({ type: "SET_LOADING", payload: false });
      console.log(err);
    }
  };
  const notes = () => {
    navigate("/notes");
  };
  const myprofile = () => {};
  const others_profile = () => {};
  const notifications = async () => {
    dispatch({ type: "SET_NOTIFICATIONS", payload: !showNotifications });
    if (newNotificationCount > 0) {
      try {
        axios({
          url: BaseUrl + `/deleteUserNotification`,
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            token: localStorage.getItem("jwt"),
          },
        });
      } catch (err) {
        console.log(err);
      }
      dispatch({
        type: "SET_NEW_NOTIFICATION_COUNT_BACKEND",
        payload: 0,
      });
    }
  };
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadAttendance = () => {
    setOpen(true);
  };
  const uploadXlsx = async (event) => {
    event.preventDefault();
    let items = event.target.files[0];
    try {
        dispatch({ type: "SET_LOADING", payload: true });
        if (items !== null) {
            const formData = new FormData();
            formData.append("file", items);
            formData.append("token", localStorage.getItem("jwt"));
            const response = await axios({
                url: BaseUrl + `/uploadAttendance`,
                method: "POST",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                data: formData,
            });
            dispatch({ type: "SET_LOADING", payload: false });
            setOpen(false);
            if(response.data.success) {
                openNotificationWithIcon({
                    type: "success",
                    message: "Attendance Status",
                    description: response.data.message,
                });
            }
        }
    } catch (err) {
        console.log(err);
        dispatch({ type: "SET_LOADING", payload: false });
    }
}
  const chatwindow = () => {
      navigate("/chat");
  }
  return (
    <div className="dashboard">
      {open && (
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {"Upload Excel File for Uploading Attendance"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              click on upload to update attendance only excel files will be
              uploaded or else click on cancel to close.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              cancel
            </Button>
            <input
              accept=".xlsx"
              style={{ display: "none" }}
              id="raised-button-file"
              type="file"
              onChange={uploadXlsx}
            />
            <label htmlFor="raised-button-file">
              <Button
                autoFocus
                component="span"
                color="primary"
              >
                Upload
              </Button>
            </label>
          </DialogActions>
        </Dialog>
      )}
      <AcheivementsForm />
      <Navbar
        name={AppName}
        logout={logout}
        myprofile={myprofile}
        others_profile={others_profile}
        notifications={notifications}
        notes={notes}
        uploadAttendance={uploadAttendance}
        chatwindow={chatwindow}
      />
      {showNotifications ? <Notifications /> : ""}
      {currentPage === 0 ? (
        <Feed />
      ) : currentPage === 1 ? (
        <Favorites />
      ) : currentPage === 2 ? (
        <AddPost />
      ) : currentPage === 3 ? (
        <Events />
      ) : currentPage === 4 ? (
        <ProfilePage />
      ) : currentPage === 5 ? (
        <ProfessionalTools />
      ) : currentPage === 6 ? (
        <StarOfTheMonth />
      ) : currentPage === 7 ? (
        <News />
      ) : (
        ""
      )}
      {!open && <Footer />}
    </div>
  );
};

export default Dashboard;
