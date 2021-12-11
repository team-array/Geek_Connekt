import React, { useState, useEffect } from "react";
import ApproveRequests from "./approveRequests/ApproveRequests";
import LoginPage from "./loginPage/LoginPage";
import axios from "axios";
const HomePageController = () => {
    const [isAuth, setisAuth] = useState();

    const [loading, setLoading] = useState();
    const checkAuth = async () => {
        if (!localStorage.getItem("rootToken")) {
            setisAuth(false);
            setLoading(false);
        } else {
            try {
                const result = await axios({
                    method: "get",
                    url: "http://localhost:8000/userAuth",
                    params: {
                        token: localStorage.getItem("rootToken"),
                    },
                });
                // console.log(result);
                if (result.data.msg === "success") {
                    setisAuth(true);
                    setLoading(false);
                } else {
                    localStorage.removeItem("rootToken");
                    setisAuth(false);
                    setLoading(false);
                }
            } catch (err) {
                console.log(err);
            }
            setisAuth(true);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        checkAuth();
    }, []);

    return (
        <div>
            {loading ? (
                <div>Loading</div>
            ) : isAuth ? (
                <ApproveRequests />
            ) : (
                <LoginPage />
            )}
        </div>
    );
};

export default HomePageController;
