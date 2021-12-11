import React, { useState } from "react";
import axios from "axios";

const LoginPage = () => {
    const [formError, setformError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(event.target.emailValue.value);
        try {
            let result = await axios({
                method: "post",
                url: "http://localhost:8000/rootUserLogin",
                data: {
                    email: event.target.emailValue.value,
                    password: event.target.passwordValue.value,
                },
            });
            // result = JSON.parse(result);
            console.log(result);
            if (result.data.message !== undefined) {
                setformError(result.data.message);
            } else {
                localStorage.setItem("rootToken", result.data.token);
                setformError("");
                window.location.href = "/accountApprove";
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <div
                className="loginPage"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    margin: "auto",
                }}
            >
                <h1>Root Login</h1>
                <form method="POST" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">
                            Email address:
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="emailValue"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            style={{
                                padding: "0.6rem",
                                margin: "1rem",
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">
                            Password:{" "}
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="passwordValue"
                            placeholder="Password"
                            style={{
                                padding: "0.6rem",
                                margin: "1rem",
                            }}
                        />
                    </div>
                    {formError !== "" ? (
                        <div
                            className="alert alert-danger"
                            role="alert"
                            style={{
                                margin: "1rem",
                            }}
                        >
                            <p
                                style={{
                                    color: "red",
                                }}
                            >
                                {formError}
                            </p>
                        </div>
                    ) : null}
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
