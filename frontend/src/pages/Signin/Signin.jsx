import React from "react";
import { ImgBlock, FormBox, BgCover } from "./Signin.styles";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    gql,
} from "@apollo/client";

import "./Signin.css";



const Signin = () => {
    const login = (values) => {
        console.log("Received values of form: ", values);
    };
    return (
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
                        <Button
                            size="large"
                            style={{ width: "100%" }}
                            type="primary"
                            htmlType="submit"
                            className="login-form-button"
                        >
                            Sign in
                        </Button>
                    </Form.Item>
                </Form>
            </FormBox>
        </div>
    );
};

export default Signin;
