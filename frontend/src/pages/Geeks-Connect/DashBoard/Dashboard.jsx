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
import { BaseUrl } from "../../../constants";
import News from "../News/News";
import { io } from "socket.io-client";

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
        socket = io("http://localhost:8000");
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
    const myprofile = () => {};
    const others_profile = () => {};
    const notifications = async () => {
        dispatch({ type: "SET_NOTIFICATIONS", payload: !showNotifications });
        if (newNotificationCount > 0) {
            try {
                axios({
                    url: `http://localhost:8000/deleteUserNotification`,
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
    return (
        <div className="dashboard">
            <AcheivementsForm />
            <Navbar
                name={AppName}
                logout={logout}
                myprofile={myprofile}
                others_profile={others_profile}
                notifications={notifications}
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
            <Footer />
        </div>
    );
};

export default Dashboard;
