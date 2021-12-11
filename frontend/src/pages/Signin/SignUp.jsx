import React, { useEffect, useState } from "react";
import { ImgBlock, FormBox, BgCover } from "./Signin.styles";
import { Form, Input, Button, Checkbox } from "antd";
import {
    MailOutlined,
    UserOutlined,
    LockOutlined,
    PhoneOutlined,
    NumberOutlined,
} from "@ant-design/icons";
import { useLazyQuery, useQuery, gql } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo1.png";
import { AppName } from "../../constants";
import axios from "axios";

import "./Signin.scss";

// const LOGIN_USER = gql`
//     query auth($username: String!, $password: String!, $college: String!) {
//         auth(username: $username, password: $password, college: $college) {
//             token
//             result
//         }
//     }
// `;

const AUTH_CHECK = gql`
    query authCheck($token: String!) {
        authCheck(token: $token) {
            id
            username
            result
        }
    }
`;

const SignUp = () => {
    // const [loginUser, { data, loading, error }] = useLazyQuery(LOGIN_USER);
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState("");
    const [formSuccess, setFormSuccess] = useState("");
    const {
        data: authCheckData,
        loading: authCheckLoading,
        error: authCheckError,
    } = useQuery(AUTH_CHECK, {
        variables: {
            token: localStorage.getItem("jwt"),
        },
    });

    const navigation = useNavigate();
    const [errorMsg, setErrorMsg] = useState("");

    // useEffect(() => {
    //     if (!loading) {
    //         console.log(data);
    //         if (data !== undefined && data !== null) {
    //             console.log(data.auth.result);
    //             if (data.auth.result === "Success") {
    //                 localStorage.setItem("jwt", data.auth.token);
    //                 setErrorMsg("");
    //                 navigation("/");
    //             } else {
    //                 setErrorMsg("Invalid Credentials");
    //             }
    //         }
    //     }
    // }, [data, loading]);

    // useEffect(() => {
    //     console.log(authCheckData);
    //     if (!authCheckLoading && !authCheckError && authCheckData) {
    //         if (authCheckData.authCheck.result === "Success") {
    //             console.log("success");
    //             localStorage.setItem(
    //                 "user",
    //                 JSON.stringify(authCheckData.authCheck)
    //             );
    //             navigation("/");
    //         } else {
    //             localStorage.removeItem("jwt");
    //         }
    //     }
    // }, [authCheckData, authCheckLoading]);

    // useEffect(() => {
    //     if (error) {
    //         console.log(error);
    //     }
    // }, [error]);

    const signUp = async (values) => {
        console.log("Received values of form: ", values);
        if (values.password.length <= 4) {
            setFormError("Password must be atleast 4 characters Long!");
        } else if (values.username.length <= 4) {
            setFormError("Password must be atleast 4 characters Long!");
        } else {
            try {
                const result = await axios({
                    method: "POST",
                    url: "http://localhost:8000/signUp",
                    data: values,
                });
                console.log(result);
                setFormError("");
                if (result.data.status === "error") {
                    setFormError(result.data.msg);
                } else {
                    setFormSuccess("Verify you email sent to your mail");
                }
            } catch (err) {
                console.log(err);
            }
        }
    };
    return authCheckLoading ? (
        <div>Loading...</div>
    ) : (
        <div
            className="Signin"
            style={{
                fontFamily: "Barlow",
            }}
        >
            <ImgBlock>
                <BgCover />
            </ImgBlock>
            <div
                className="Main"
                style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    alignItems: "center",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-70%, -50%)",
                }}
            >
                <FormBox data-aos="fade-right">
                    <h2
                        style={{ fontWeight: "bold" }}
                        className="text-center mb-4"
                    >
                        Sign Up
                    </h2>
                    {errorMsg === "" ? null : (
                        <Alert severity="error" className="m-2">
                            {errorMsg}
                        </Alert>
                    )}
                    <Form
                        name="normal_login"
                        className="login-form"
                        initialValues={{ remember: true }}
                        onFinish={signUp}
                    >
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Username!",
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                prefix={
                                    <UserOutlined className="site-form-item-icon" />
                                }
                                placeholder="Username"
                            />
                        </Form.Item>
                        <Form.Item
                            name="phoneNumber"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Username!",
                                },
                            ]}
                        >
                            <Input
                                type="number"
                                size="large"
                                prefix={
                                    <PhoneOutlined className="site-form-item-icon" />
                                }
                                placeholder="Phone Number"
                            />
                        </Form.Item>
                        <Form.Item
                            name="rollNumber"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Username!",
                                },
                            ]}
                        >
                            <Input
                                type="text"
                                size="large"
                                prefix={
                                    <NumberOutlined className="site-form-item-icon" />
                                }
                                placeholder="Roll Number"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Email!",
                                },
                            ]}
                        >
                            <Input
                                size="large"
                                prefix={
                                    <MailOutlined className="site-form-item-icon" />
                                }
                                placeholder="Email"
                                type="email"
                            />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Please input your Password!",
                                },
                            ]}
                        >
                            <Input.Password
                                size="large"
                                prefix={
                                    <LockOutlined className="site-form-item-icon" />
                                }
                                type="password"
                                placeholder="Password"
                            />
                        </Form.Item>
                        {formError !== "" ? (
                            <p
                                style={{
                                    color: "red",
                                    margin: "auto",
                                    display: "block",
                                    textAlign: "center",
                                }}
                            >
                                {formError}
                            </p>
                        ) : null}
                        {formSuccess !== "" ? (
                            <p
                                style={{
                                    color: "green",
                                    margin: "auto",
                                    display: "block",
                                    textAlign: "center",
                                }}
                            >
                                {formSuccess}
                            </p>
                        ) : null}
                        <Form.Item>
                            <Form.Item
                                size="large"
                                name="remember"
                                valuePropName="checked"
                                noStyle
                            >
                                <Checkbox size="large">Remember me</Checkbox>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item>
                            {loading ? (
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "100%",
                                    }}
                                >
                                    <CircularProgress />
                                </div>
                            ) : (
                                <Button
                                    size="large"
                                    style={{ width: "100%" }}
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                >
                                    Sign Up
                                </Button>
                            )}
                        </Form.Item>
                    </Form>
                </FormBox>
                <div
                    style={{
                        width: "max-content",
                        marginBottom: "60px",
                    }}
                >
                    <img
                        src={logo}
                        alt="logo"
                        style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            objectPosition: "center",
                            borderRadius: "100px",
                            marginTop: "3px",
                        }}
                    />
                    <span className="AppName">{AppName}</span>
                    <div className="AppDesc">
                        Connects colleagues in college
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
