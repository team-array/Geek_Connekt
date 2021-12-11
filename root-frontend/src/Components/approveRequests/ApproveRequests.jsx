import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const ApproveRequests = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getRequests = async () => {
            const response = await axios({
                method: "get",
                url: "http://localhost:8000/getAllRequests",
            });
            setRequests(response);
            console.log(response);
            setLoading(false);
        };
        getRequests();
    }, []);

    useEffect(() => {}, [requests]);

    return (
        <div>
            <h1>Approve Accounts</h1>
            {loading ? (
                <h1>Loading...</h1>
            ) : (
                <div>
                    {/* {requests.data.map((request) => {
                        return (
                            <div>
                                <p>{request.username}</p>
                                <button>Approve</button>
                            </div>
                        );
                    })} */}
                    <TableContainer component={Paper}>
                        <Table sx={{ width: "100%" }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Username</TableCell>
                                    <TableCell align="right">Email</TableCell>
                                    <TableCell align="right">
                                        Phone Number&nbsp;(g)
                                    </TableCell>
                                    <TableCell align="right">
                                        RollNumber&nbsp;(g)
                                    </TableCell>
                                    <TableCell align="right">Approve</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {requests.data.map((request) => (
                                    <TableRow
                                        key={request.email}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 },
                                        }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {request.username}
                                        </TableCell>
                                        <TableCell align="right">
                                            {request.email}
                                        </TableCell>
                                        <TableCell align="right">
                                            {request.phoneNumber}
                                        </TableCell>
                                        <TableCell align="right">
                                            {request.rollNumber}
                                        </TableCell>
                                        <TableCell align="right">
                                            <button
                                                style={{
                                                    backgroundColor: "green",
                                                    color: "white",
                                                    margin: "5px",
                                                }}
                                                onClick={async () => {
                                                    console.log(request);
                                                    try {
                                                        const response =
                                                            await axios({
                                                                method: "post",
                                                                url: "http://localhost:8000/approveAccount",
                                                                data: {
                                                                    email: request.email,
                                                                    username:
                                                                        request.username,
                                                                    phoneNumber:
                                                                        request.phoneNumber,
                                                                    rollNumber:
                                                                        request.rollNumber,
                                                                    password:
                                                                        request.password,
                                                                },
                                                            });
                                                        console.log(response);
                                                    } catch (error) {
                                                        console.log(error);
                                                    }
                                                }}
                                            >
                                                Approve
                                            </button>
                                            <button
                                                style={{
                                                    margin: "5px",
                                                    backgroundColor: "red",
                                                    color: "white",
                                                }}
                                                onClick={async () => {
                                                    console.log(request.email);
                                                }}
                                            >
                                                Reject
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>
    );
};

export default ApproveRequests;
