import React, { useState, useEffect, useRef } from "react";
import { CommentBoxContainer } from "./Comment.style.jsx";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import pp from "../Profile/components/img/profile-pic.png";
import "./Comment.scss";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useQuery, gql } from "@apollo/client";
import defaultProfilePic from "../../../assets/profilePic.png";
import LoadingComponent from "../../../components/loadingComponent/LoadingComponent.jsx";
import { BaseUrl } from "../../../constants";
const { TextArea } = Input;

const USER_DATA = gql`
    query user($token: String!) {
        user(token: $token) {
            id
            username
            email
            profilePic
        }
    }
`;

const CommentList = ({ comments }) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${
            comments.length > 1 ? "replies" : "reply"
        }`}
        itemLayout="horizontal"
        renderItem={(props) => <Comment {...props} />}
    />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
    <>
        <Form.Item>
            <TextArea rows={2} onChange={onChange} value={value} />
        </Form.Item>
        <Form.Item>
            <Button
                htmlType="submit"
                loading={submitting}
                onClick={onSubmit}
                type="primary"
            >
                Add Comment
            </Button>
        </Form.Item>
    </>
);

const CommentBox = () => {
    const [msg, setmsg] = React.useState("");
    const [submitting, setSubmitting] = React.useState(false);
    const dispatch = useDispatch();
    const [postedUser, setPostedUser] = useState({});
    const [commentsLoading, setCommentsLoading] = useState(false);
    const [postedDate, setPostedDate] = useState("");
    const Comment_Box = useSelector((state) => state.Comment_Box);
    const [addcommentOp,setaddcommentOp] = useState(false);
    const {
        loading: userDataLoading,
        data: userData,
        error: userDataError,
    } = useQuery(USER_DATA, {
        variables: {
            token: localStorage.getItem("jwt"),
        },
    });

    // React.useEffect(() => {
    //     if (!userDataLoading) {
    //         console.log(userData);
    //     }
    // }, [userDataLoading, userData]);
    React.useEffect(() => {
        if (userDataError) {
            console.log(userDataError);
        }
    }, [userDataError]);

    React.useEffect(() => {
        if (Comment_Box.commentBox) {
            setCommentsLoading(true);
            getComments();
        }
    }, [Comment_Box.commentBox]);

    const [comments, setComments] = React.useState([
        {
            author: "Akshay",
            avatar: pp,
            datetime: moment().fromNow(),
            content: (
                <p>
                    lorem ipsum dolor sit amet, consectetur adip lorem ipsum
                    dolor{" "}
                </p>
            ),
        },
        {
            author: "Akshay",
            avatar: pp,
            datetime: moment().fromNow(),
            content: (
                <p>
                    lorem ipsum dolor sit amet, consectetur adip lorem ipsum
                    dolor{" "}
                </p>
            ),
        },
        {
            author: "Akshay",
            avatar: pp,
            datetime: moment().fromNow(),
            content: (
                <p>
                    lorem ipsum dolor sit amet, consectetur adip lorem ipsum
                    dolor{" "}
                </p>
            ),
        },
        {
            author: "Murari",
            avatar: pp,
            datetime: moment().fromNow(),
            content: (
                <p>
                    lorem ipsum dolor sit amet, consectetur adip lorem ipsum
                    dolor{" "}
                </p>
            ),
        },
    ]);
    const sendmsg = async () => {
        try {
            setSubmitting(true); // for load effect
            console.log(msg);
            setComments((comments) => [
                {
                    author: userData.user.username,
                    avatar: userData.user.profilePic,
                    datetime: moment().fromNow(),
                    content: <p>{msg}</p>,
                },
                ...comments,
            ]);

            setmsg("");
            const result = await axios({
                method: "POST",
                url: BaseUrl + "/commentPost",
                data: {
                    postId: Comment_Box.postId,
                    comment: msg,
                    userId: userData.user.id,
                },
            });
            setSubmitting(false); // stop loading effect}
            console.log(result);
            setaddcommentOp(true);
        } catch (err) {
            console.log(err);
        }
    };

    const getComments = async () => {
        try {
            const newComments = [];
            const result = await axios({
                method: "GET",
                url: BaseUrl + `/getComments`,
                params: {
                    postId: Comment_Box.postId,
                },
            });
            console.log("GEtcomments: ", result.data);
            result.data.post.comments.map((comment) => {
                newComments.unshift({
                    author: comment.name,
                    avatar: comment.profilePic,
                    datetime: moment(comment.createdAt).fromNow(),
                    content: <p>{comment.comment}</p>,
                });
            });
            setPostedUser(result.data.post.user);
            setPostedDate(result.data.post.createdAt);
            setComments(newComments);
            console.log(comments);
            setCommentsLoading(false);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="Comment">
            <Backdrop
                sx={{
                    color: "#fff",
                    zIndex: "9999999",
                    backgroundColor: "rgba(0,0,0,.85)",
                }}
                onClick={() =>{
                    dispatch({
                        type: "SET_COMMENT_BOX",
                        payload: {
                            postId: "",
                            commentBox: false,
                        },
                    })
                    addcommentOp && window.location.reload();
                }}
                open={Comment_Box.commentBox}
            >
                <CommentBoxContainer
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                >
                    <div
                        className="user-profile"
                        style={{
                            position: "absolute",
                            top: 5,
                            padding: "15px 20px 10px 43px",
                            borderBottom: "1px solid #aaa",
                            width: "100%",
                        }}
                    >
                        <img src={postedUser.profilePic} alt="" />
                        <div>
                            <p>Comments</p>
                            <span>{postedDate}</span>
                        </div>
                        <IconButton
                            aria-label="delete"
                            sx={{
                                marginLeft: "auto",
                            }}
                            onClick={() => {
                                dispatch({
                                    type: "SET_COMMENT_BOX",
                                    payload: {
                                        postId: "",
                                        commentBox: false,
                                    },
                                });
                                addcommentOp && window.location.reload();
                            }}
                        >
                            <CloseIcon
                                style={{
                                    color: "#000",
                                    zIndex: "9999999",
                                    fontSize: "35px",
                                }}
                            />
                        </IconButton>
                    </div>
                    {commentsLoading ? (
                        <LoadingComponent />
                    ) : (
                        comments.length > 0 && (
                            <div
                                style={{
                                    // overflow: "scroll",
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "flex-start",
                                    flexDirection: "column",
                                }}
                            >
                                <CommentList comments={comments} />
                            </div>
                        )
                    )}
                    {/* {comments.length > 0 && (
                        <div
                            style={
                                {
                                    // overflow: "scroll",
                                }
                            }
                        >
                            <CommentList comments={comments} />
                        </div>
                    )} */}
                    <Comment
                        avatar={
                            userDataLoading ? (
                                <Avatar src={defaultProfilePic}></Avatar>
                            ) : (
                                <Avatar
                                    src={userData.user.profilePic}
                                    alt="profile"
                                />
                            )
                        }
                        style={{
                            width: "100%",
                            position: "absolute",
                            bottom: "0",
                            padding: "0px 50px",
                        }}
                        content={
                            <Editor
                                onChange={(e) => {
                                    setmsg(e.target.value);
                                }}
                                onSubmit={sendmsg}
                                submitting={submitting}
                                value={msg}
                            />
                        }
                    />
                </CommentBoxContainer>
            </Backdrop>
        </div>
    );
};

export default CommentBox;
