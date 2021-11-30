import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Home from "./Home/Home";
import Dashboard from "./Geeks-Connect/DashBoard/Dashboard";
import { useNavigate } from "react-router-dom";

const AUTH_CHECK = gql`
    query authCheck($token: String!) {
        authCheck(token: $token) {
            id
            username
            result
        }
    }
`;

const HomePageController = () => {
    const navigation = useNavigate();
    const [userAuthChecked, setuserAuthChecked] = useState(true);
    const [authLoading, setAuthLoading] = useState(true);
    const { loading, error, data } = useQuery(AUTH_CHECK, {
        variables: {
            token: localStorage.getItem("jwt") || "",
        },
    });
    useEffect(() => {
        setAuthLoading(false);
    }, [userAuthChecked]);
    useEffect(() => {
        console.log(data);
        if (!loading && !error && data) {
            if (data.authCheck.result === "Success") {
                console.log("success");
                localStorage.setItem("user", JSON.stringify(data.authCheck));
                setuserAuthChecked(true);
                // setAuthLoading(false);
                console.log("done");
            } else {
                localStorage.removeItem("jwt");
                setuserAuthChecked(false);
                // setAuthLoading(false);
            }
        }
    }, [loading, error, data]);

    useEffect(() => {
        console.log(error);
    }, [error]);

    return authLoading ? (
        <p>Loading...</p>
    ) : !userAuthChecked ? (
        <Home />
    ) : (
        <Dashboard />
    );
};

export default HomePageController;