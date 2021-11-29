import React, { useEffect, useState } from "react";
import { ImgBlock, FormBox, BgCover } from "./Signin.styles";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useLazyQuery, useQuery, gql } from "@apollo/client";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

import "./Signin.css";

const LOGIN_USER = gql`
    query auth($username: String!, $password: String!, $college: String!) {
        auth(username: $username, password: $password, college: $college) {
            token
            result
        }
    }
`;

const AUTH_CHECK = gql`
    query authCheck($token: String!) {
        authCheck(token: $token) {
            id
            username
            result
        }
    }
`;

const Signin = () => {
    const [loginUser, { data, loading, error }] = useLazyQuery(LOGIN_USER);

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

    useEffect(() => {
        if (!loading) {
            console.log(data);
            if (data !== undefined && data !== null) {
                console.log(data.auth.result);
                if (data.auth.result === "Success") {
                    localStorage.setItem("jwt", data.auth.token);
                    setErrorMsg("");
                    navigation("/");
                } else {
                    setErrorMsg("Invalid Credentials");
                }
            }
        }
    }, [data, loading]);

    useEffect(() => {
        console.log(authCheckData);
        if (!authCheckLoading && !authCheckError && authCheckData) {
            if (authCheckData.authCheck.result === "Success") {
                console.log("success");
                localStorage.setItem(
                    "user",
                    JSON.stringify(authCheckData.authCheck)
                );
                navigation("/");
            } else {
                localStorage.removeItem("jwt");
            }
        }
    }, [authCheckData, authCheckLoading]);

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

    const login = (values) => {
        console.log("Received values of form: ", values);
        loginUser({
            variables: {
                username: values.username,
                password: values.password,
                college: "CMRCET",
            },
        });
    };
    return authCheckLoading ? (
        <div>Loading...</div>
    ) : (
        <div className="Signin">
            <ImgBlock>
                <BgCover />
            </ImgBlock>
            <FormBox>
                <h2
                    data-aos="fade-right"
                    style={{ fontWeight: "bold" }}
                    className="text-center mb-4"
                >
                    Sign in
                </h2>
                {errorMsg === "" ? null : (
                    <Alert severity="error" className="m-2">
                        {errorMsg}
                    </Alert>
                )}
                <Form
                    data-aos="fade-right"
                    name="normal_login"
                    className="login-form"
                    initialValues={{ remember: true }}
                    onFinish={login}
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
                                Sign in
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </FormBox>
        </div>
    );
};

export default Signin;
