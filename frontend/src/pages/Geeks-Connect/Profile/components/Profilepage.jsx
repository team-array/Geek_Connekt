import React, { useCallback, useRef, useState, useEffect } from "react";
import coverimg from "./img/cover.png";
import profileimg from "./img/profile.png";
import star from "./img/star.jfif";
import micon from "./img/message.png";
import info from "./img/info.jfif";
import pp from "./img/profile-pic.png";
import live from "./img/live-video.png";
import photo from "./img/photo.png";
import feeling from "./img/feeling.png";
import feed from "./img/feed-image-1.png";
import like from "./img/like-blue.png";
import Comment from "../../CommentBox/Comment";
import share from "./img/share.png";
import job from "./img/profile-job.png";
import study from "./img/profile-study.png";
import home from "./img/profile-home.png";
import location from "./img/profile-location.png";
import { Button } from "antd";
import axios from "axios";
import userPostHook from "../../../../hooks/userPostHook";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, gql } from "@apollo/client";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import LinkIcon from "@mui/icons-material/Link";
import CakeIcon from "@mui/icons-material/Cake";
import PersonIcon from "@mui/icons-material/Person";

// import post1 from "./img/photo1.png";
// import post2 from "./img/photo2.png";
// import post3 from "./img/photo3.png";
// import post4 from "./img/photo4.png";
// import post5 from "./img/photo5.png";
// import post6 from "./img/photo6.png";

import { BaseUrl } from "../../../../constants";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import "./porfilepage.scss";
import LoadingComponent from "../../../../components/loadingComponent/LoadingComponent";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const ITEM_HEIGHT = 48;

const USER_DATA = gql`
    query user($token: String!) {
        user(token: $token) {
            id
            username
            email
            profilePic
            backgroundPic
            role
            rollNumber
            college
            location
            hometown
            bio
            birthDate
            secondarySchool
            primarySchool
            website
            fullName
        }
    }
`;

export const Profilepage = () => {
    const dispatch = useDispatch();
    const {
        loading: userDataLoading,
        data: userData,
        error: userDataError,
    } = useQuery(USER_DATA, {
        variables: {
            token: localStorage.getItem("jwt"),
        },
    });

    const achievements = useSelector((state) => state.achievements);

    const [showAllPhotos, setShowAllPhotos] = React.useState(false);

    const ImagesGridLength = useSelector((state) => state.ImagesGridLength);

    const [tab, setTab] = React.useState(0);

    const [deletePostId, setDeletePostId] = React.useState();

    const [pageNumber, setpageNumber] = React.useState(1);

    const [edit, setedit] = React.useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [profilePic, setprofilePic] = React.useState({});
    const [postData, setpostData] = useState([]);
    const [postLikesCount, setpostLikesCount] = useState([]);
    const show_comments = (id) => {
        dispatch({
            type: "SET_COMMENT_BOX",
            payload: {
                postId: id,
                commentBox: true,
            },
        });
    };

    const { loading, error, posts, hasMore } = userPostHook(
        JSON.parse(localStorage.getItem("user")).id,
        pageNumber
    );

    const editPictureHandler = (event) => {
        if (event.target.name === "profilePic") {
            setprofilePic({
                ...profilePic,
                image: event.target.files[0],
            });
            setprofilePic(event.target.files[0]);
            console.log("Yp!");
        }
    };

    const handleProfilePicSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append(
            "token",
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkRlZXBlc2ggRHJhZ29uZWVsIiwiZW1haWwiOiJkZWVwZXNoYXNoNDQ0QGdtYWlsLmNvbSIsInJvbGUiOiJTdHVkZW50Iiwicm9sbE51bWJlciI6IjE5SDUxQTA1RzIiLCJpYXQiOjE2Mzc4MTYzNzF9.yrId7SkljS7Tl7b-iCx2LtT4wQakOWd9won9HzrNAms"
        );
        formData.append("file", e.target.profilePic.files[0]);
        try {
            const result = await axios({
                method: "POST",
                url: BaseUrl + "/editProfilePic",
                data: formData,
                headers: {
                    "content-type": "multipart/form-data",
                },
            });
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    };

    React.useEffect(() => {
        if (!userDataLoading) {
            console.log(userData);
            dispatch({
                type: "SET_USER_DATA",
                payload: {
                    userData: userData.user,
                },
            });
        }
    }, [userDataLoading, userData]);

    React.useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error]);

    React.useEffect(() => {
        if (loading) return;
        // console.log("userposts", posts);
        setpostData(new Array(posts.length).fill(0));
        posts.map((post, idx) => {
            setpostLikesCount((prev) => [...prev, post.likes.length]);
            post.likes.filter((l) => {
                const userId =
                    localStorage.getItem("user") !== null
                        ? JSON.parse(localStorage.getItem("user")).id
                        : "";
                // console.log(l._id, userId);
                return l._id === userId;
            }).length > 0
                ? setpostData((postData) => {
                      postData[idx] = 1;
                      // console.log("Matched");
                      return postData;
                  })
                : setpostData((postData) => {
                      postData[idx] = 0;
                      // console.log("not - Matched");
                      return postData;
                  });
        });
        // console.log("postData: ", postData);
    }, [loading, hasMore, posts]);

    useEffect(() => {
        console.log("postData: ", postData);
    }, [postData]);

    const lastPostReference = useRef();

    const lastPostRefChanger = useCallback(
        (post) => {
            if (loading) return;
            // console.log("Last post:", post);
            if (lastPostReference.current) {
                // console.log("Disconnected");
                lastPostReference.current.disconnect();
            }
            lastPostReference.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore > 0) {
                    // console.log("Visible");
                    setpageNumber((pageNumber) => (pageNumber += 1));
                }
            });
            if (post) {
                lastPostReference.current.observe(post);
                // console.log(post);
            }
        },
        [loading, hasMore]
    );
    React.useEffect(() => {
        const getachievements = async () => {
            try {
                const response = await axios({
                    method: "post",
                    url: `${BaseUrl}/getachievements`,
                    headers: {
                        "content-type": "application/json",
                    },
                    data: {
                        token: localStorage.getItem("jwt"),
                        username: JSON.parse(localStorage.getItem("user")).username
                    },
                });
                console.log(response);
                if (response.data.success) {
                    dispatch({
                        type: "SET_ACHIEVEMENTS",
                        payload: response.data.achievements,
                    });
                    dispatch({
                        type: "SET_GRID_LENGTH",
                        payload: Math.min(response.data.achievements.length, 4),
                    });
                }
            } catch (error) {
                console.log(error);
            }
        };
        getachievements();
    }, []);
    const deleteAchievement = async (achievement_index) => {
        try {
            dispatch({
                type: "SET_LOADING",
                payload: true,
            });
            const response = await axios({
                method: "post",
                url: `${BaseUrl}/deleteAchievement`,
                headers: {
                    "content-type": "application/json",
                },
                data: {
                    token: localStorage.getItem("jwt"),
                    achievement_index,
                },
            });
            dispatch({
                type: "SET_LOADING",
                payload: false,
            });
            console.log(response.data);
            if (response.data.success) {
                dispatch({
                    type: "SET_ACHIEVEMENTS",
                    payload: response.data.achievements,
                });
                dispatch({
                    type: "SET_GRID_LENGTH",
                    payload: Math.min(response.data.achievements.length, 4),
                });
            }
        } catch (err) {
            console.log(err);
            dispatch({
                type: "SET_LOADING",
                payload: false,
            });
        }
    };
    return userDataLoading ? (
        <div>loading...</div>
    ) : (
        <div className="ProfilepageComponent">
            <Comment />
            <div className="profile-container">
                <img
                    src={userData.user.backgroundPic}
                    alt="coverimg"
                    className="cover-img"
                />
                <div className="profile-details mt-1">
                    <div className="pd-left mr-auto my-2">
                        <div className="pd-row">
                            <img
                                src={userData.user.profilePic}
                                alt="profileimg"
                                className="pd-img"
                                style={{
                                    borderRadius: "100%",
                                }}
                            />
                            <div>
                                <h3>{userData.user.username}</h3>
                                <p>{userData.user.role}</p>
                                {userData.user.role ? (
                                    <img src={star} alt="star" />
                                ) : (
                                    ""
                                )}
                                <Button
                                    type="button"
                                    className="my-2 mx-2"
                                    onClick={() => {
                                        setedit(!edit);
                                        dispatch({
                                            type: "SET_EDIT_PROFILE",
                                            payload: true,
                                        });
                                    }}
                                >
                                    Edit profile
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div
                        className="pd-right my-3 mb-0 ml-auto"
                        style={{ width: "max-content" }}
                    >
                        <Button type="button" className="mb-3">
                            <img src={info} alt="" />
                            Informative
                        </Button>
                        <Button type="button">
                            <img src={micon} alt="" />
                            message &nbsp;{" "}
                        </Button>
                    </div>
                </div>

                {/* 1 */}
                <div className="ProfileBlog">
                    <div className="profile-info">
                        <div className="info-col">
                            <div className="profile-intro">
                                <h3>Intro</h3>
                                <p className="intro-text">
                                    {userData.user.bio}
                                </p>
                                <hr />
                                <ul>
                                    <li>
                                        <PersonIcon />
                                        &nbsp; &nbsp;
                                        {userData.user.fullName}
                                    </li>
                                    <li>
                                        <CakeIcon />
                                        &nbsp; &nbsp; born on &nbsp;
                                        {new Date(
                                            new Number(userData.user.birthDate)
                                        ).toDateString()}
                                    </li>
                                    <li>
                                        <img src={job} alt="" />{" "}
                                        {userData.user.role}
                                    </li>
                                    <li>
                                        <img src={study} alt="" />
                                        {userData.user.role} in{" "}
                                        {userData.user.college}
                                    </li>
                                    <li>
                                        <img src={study} alt="" />
                                        Secondary School:{" "}
                                        {userData.user.secondarySchool}
                                    </li>
                                    <li>
                                        <img src={study} alt="" />
                                        School: {userData.user.primarySchool}
                                    </li>
                                    <li>
                                        <img src={home} alt="" />
                                        Lives in {userData.user.hometown}
                                    </li>
                                    <li>
                                        <img src={location} alt="" />
                                        From {userData.user.location}
                                    </li>
                                    <LinkIcon
                                        className=""
                                        style={{
                                            marginRight: "12px",
                                            marginLeft: "2.5px",
                                        }}
                                    />
                                    <a href={userData.user.website}>
                                        {userData.user.website}
                                    </a>
                                </ul>
                            </div>
                            <div className="profile-intro">
                                <div className="title-box">
                                    <h4 style={{ marginLeft: "9px" }}>
                                        info & posts
                                    </h4>
                                    <a
                                        className="mb-2"
                                        href="/"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (ImagesGridLength > 4) {
                                                dispatch({
                                                    type: "SET_GRID_LENGTH",
                                                    payload: 4,
                                                });
                                            } else {
                                                dispatch({
                                                    type: "SET_GRID_LENGTH",
                                                    payload:
                                                        achievements.length,
                                                });
                                            }
                                            setShowAllPhotos(!showAllPhotos);
                                        }}
                                        style={{ marginRight: "9px" }}
                                    >
                                        {!showAllPhotos
                                            ? "All Achievements"
                                            : "Show Fewer Achievements"}
                                    </a>
                                </div>

                                <div className="postsbox mt-3">
                                    {achievements
                                        .slice(0, ImagesGridLength)
                                        .map((achievement, index) => {
                                            return (
                                                <div
                                                    style={{
                                                        display: "flex",
                                                        flexDirection: "column",
                                                    }}
                                                >
                                                    <img
                                                        key={index}
                                                        src={achievement}
                                                        alt=""
                                                        className="post-img mx-3"
                                                    />
                                                    <Button
                                                        className="mb-3 mx-3"
                                                        style={{
                                                            width: "150px",
                                                        }}
                                                        onClick={() =>
                                                            deleteAchievement(
                                                                index
                                                            )
                                                        }
                                                    >
                                                        delete
                                                    </Button>
                                                </div>
                                            );
                                        })}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-info1">
                        <div className="post-col">
                            <div className="write-post-container">
                                <div className="user-profile">
                                    <img
                                        src={userData.user.profilePic}
                                        alt=""
                                    />
                                    <div>
                                        <p>{userData.user.username}</p>
                                        <small>
                                            Public
                                            <i class="fas fa-caret-down"></i>
                                        </small>
                                    </div>
                                </div>
                                <div className="post-input-container">
                                    <textarea
                                        row="3"
                                        placeholder="Write a post..."
                                    ></textarea>
                                    <div className="add-post-links">
                                        <a href="/">
                                            <img src={live} alt="" />
                                            Live Video
                                        </a>
                                        <a
                                            href="/"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                dispatch({
                                                    type: "SET_ACHIEVEMENTS_FORM",
                                                    payload: true,
                                                });
                                            }}
                                        >
                                            <img src={photo} alt="" />
                                            Photo/Video
                                        </a>
                                        <a href="/">
                                            <img src={feeling} alt="" />
                                            Feeling
                                        </a>
                                    </div>
                                </div>
                            </div>
                            {!loading &&
                            (postData.length === 0 ||
                                postData === undefined) ? (
                                <h1
                                    style={{
                                        margin: "2rem",
                                        textAlign: "center",
                                    }}
                                >
                                    Write you first post now!
                                </h1>
                            ) : postData !== undefined &&
                              postData !== null &&
                              postData.length > 0 ? (
                                posts.map((post, idx) => {
                                    if (posts.length === idx + 1) {
                                        return (
                                            <div
                                                // onClick={(e) => {
                                                //     console.log(idx);
                                                // }}
                                                className="post-container"
                                                ref={lastPostRefChanger}
                                            >
                                                {/* <p>{idx}</p> */}
                                                <div className="pt-2">
                                                    <div
                                                        className="user-profile"
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <img
                                                            src={
                                                                userData.user
                                                                    .profilePic
                                                            }
                                                            alt=""
                                                        />
                                                        <div>
                                                            <p>
                                                                {
                                                                    userData
                                                                        .user
                                                                        .username
                                                                }
                                                            </p>
                                                            <span>
                                                                {
                                                                    new Date(
                                                                        post.createdAt
                                                                    )
                                                                        .toString()
                                                                        .split(
                                                                            "GMT"
                                                                        )[0]
                                                                }
                                                            </span>
                                                        </div>
                                                        <div
                                                            style={{
                                                                marginLeft:
                                                                    "auto",
                                                            }}
                                                        >
                                                            <IconButton
                                                                aria-label="more"
                                                                id="long-button"
                                                                aria-controls="long-menu-if"
                                                                aria-expanded={
                                                                    open
                                                                        ? "true"
                                                                        : undefined
                                                                }
                                                                aria-haspopup="true"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    handleClick(
                                                                        e
                                                                    );
                                                                    setDeletePostId(
                                                                        idx
                                                                    );
                                                                }}
                                                            >
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                            <Menu
                                                                id="long-menu-if"
                                                                MenuListProps={{
                                                                    "aria-labelledby":
                                                                        "long-button",
                                                                }}
                                                                anchorEl={
                                                                    anchorEl
                                                                }
                                                                open={open}
                                                                onClose={(
                                                                    e
                                                                ) => {
                                                                    handleClose(
                                                                        e
                                                                    );
                                                                    setDeletePostId(
                                                                        idx
                                                                    );
                                                                }}
                                                                PaperProps={{
                                                                    style: {
                                                                        maxHeight:
                                                                            ITEM_HEIGHT *
                                                                            4.5,
                                                                        width: "20ch",
                                                                    },
                                                                }}
                                                            >
                                                                <MenuItem
                                                                    key="delete"
                                                                    onClick={async (
                                                                        e
                                                                    ) => {
                                                                        try {
                                                                            handleClose(
                                                                                e
                                                                            );
                                                                            console.log(
                                                                                `if ${deletePostId}`
                                                                            );
                                                                            const result =
                                                                                await axios(
                                                                                    {
                                                                                        method: "POST",
                                                                                        url: `${BaseUrl}/deletePost`,
                                                                                        data: {
                                                                                            postId: posts[
                                                                                                deletePostId
                                                                                            ]
                                                                                                ._id,
                                                                                            token: localStorage.getItem(
                                                                                                "jwt"
                                                                                            ),
                                                                                        },
                                                                                    }
                                                                                );
                                                                        } catch (err) {
                                                                            console.log(
                                                                                err
                                                                            );
                                                                        }
                                                                    }}
                                                                >
                                                                    <span
                                                                        style={{
                                                                            color: "red",
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </span>
                                                                </MenuItem>
                                                            </Menu>
                                                        </div>
                                                    </div>
                                                    {/* <a href="#"></a> */}
                                                </div>

                                                <p className="post-text">
                                                    {post.caption}
                                                </p>
                                                <img
                                                    src={post.imageUrl}
                                                    alt=""
                                                    className="post-img"
                                                />
                                                <div className="post-row pt-2">
                                                    <div className="activity-icons">
                                                        <div>
                                                            <ThumbUpIcon
                                                                style={{
                                                                    cursor: "pointer",
                                                                    color:
                                                                        postData[
                                                                            idx
                                                                        ] === 1
                                                                            ? "blue"
                                                                            : "",
                                                                }}
                                                                onClick={async () => {
                                                                    console.log(
                                                                        "like"
                                                                    );
                                                                    try {
                                                                        const userId =
                                                                            localStorage.getItem(
                                                                                "user"
                                                                            ) !==
                                                                            null
                                                                                ? JSON.parse(
                                                                                      localStorage.getItem(
                                                                                          "user"
                                                                                      )
                                                                                  )
                                                                                      .id
                                                                                : "";
                                                                        const result =
                                                                            await axios(
                                                                                {
                                                                                    method: "post",
                                                                                    url:
                                                                                        BaseUrl +
                                                                                        `/likePost`,
                                                                                    data: {
                                                                                        postId: post._id,
                                                                                        userId: userId,
                                                                                    },
                                                                                }
                                                                            );
                                                                        console.log(
                                                                            result
                                                                        );
                                                                        if (
                                                                            result
                                                                                .data
                                                                                .message ===
                                                                            "Post liked successfully"
                                                                        ) {
                                                                            postData[
                                                                                idx
                                                                            ] = 1;
                                                                            postLikesCount[
                                                                                idx
                                                                            ] =
                                                                                postLikesCount[
                                                                                    idx
                                                                                ] +
                                                                                1;
                                                                        } else {
                                                                            postData[
                                                                                idx
                                                                            ] = 0;
                                                                            postLikesCount[
                                                                                idx
                                                                            ] =
                                                                                postLikesCount[
                                                                                    idx
                                                                                ] -
                                                                                1;
                                                                        }
                                                                    } catch (err) {
                                                                        console.log(
                                                                            err
                                                                        );
                                                                    }
                                                                    //   if (postData[idx] === 0) {
                                                                    //       postData[idx] = 1;
                                                                    //   } else if (
                                                                    //       postData[idx] === 1
                                                                    //   ) {
                                                                    //       console.log("Hello");
                                                                    //       postData[idx] = 0;
                                                                    //   }
                                                                    setpostData(
                                                                        (
                                                                            postData
                                                                        ) => {
                                                                            //   postData[idx] = 1;
                                                                            console.log(
                                                                                postData[
                                                                                    idx
                                                                                ]
                                                                            );

                                                                            return [
                                                                                ...postData,
                                                                            ];
                                                                        }
                                                                    );
                                                                    setpostLikesCount(
                                                                        (
                                                                            postLikesCount
                                                                        ) => {
                                                                            return [
                                                                                ...postLikesCount,
                                                                            ];
                                                                        }
                                                                    );
                                                                    //   console.log(postData);
                                                                }}
                                                            />
                                                            {
                                                                postLikesCount[
                                                                    idx
                                                                ]
                                                            }
                                                        </div>
                                                        <div
                                                            onClick={() => {
                                                                show_comments(
                                                                    post._id
                                                                );
                                                            }}
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            {/* <img src={comment} alt="" /> */}
                                                            <ForumOutlinedIcon />
                                                            {
                                                                post.comments
                                                                    .length
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="post-profile-icon">
                                                        <img
                                                            src={
                                                                userData.user
                                                                    .profilePic
                                                            }
                                                            alt=""
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    } else {
                                        return (
                                            <div
                                                className="post-container"
                                                // onClick={(e) => {
                                                //     console.log(idx);
                                                // }}
                                            >
                                                {/* <p>{idx}</p> */}
                                                <div className="post-row">
                                                    <div
                                                        className="user-profile"
                                                        style={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "space-between",
                                                            width: "100%",
                                                        }}
                                                    >
                                                        <img
                                                            src={
                                                                userData.user
                                                                    .profilePic
                                                            }
                                                            alt=""
                                                        />
                                                        <div>
                                                            <p>
                                                                {
                                                                    userData
                                                                        .user
                                                                        .username
                                                                }
                                                            </p>
                                                            <span>
                                                                {
                                                                    new Date(
                                                                        post.createdAt
                                                                    )
                                                                        .toString()
                                                                        .split(
                                                                            "GMT"
                                                                        )[0]
                                                                }
                                                            </span>
                                                        </div>
                                                        <div
                                                            style={{
                                                                marginLeft:
                                                                    "auto",
                                                            }}
                                                        >
                                                            <IconButton
                                                                aria-label="more"
                                                                id="long-button"
                                                                aria-controls="long-menu"
                                                                aria-expanded={
                                                                    open
                                                                        ? "true"
                                                                        : undefined
                                                                }
                                                                aria-haspopup="true"
                                                                onClick={(
                                                                    e
                                                                ) => {
                                                                    handleClick(
                                                                        e
                                                                    );
                                                                    setDeletePostId(
                                                                        idx
                                                                    );
                                                                }}
                                                            >
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                            <Menu
                                                                id="long-menu"
                                                                MenuListProps={{
                                                                    "aria-labelledby":
                                                                        "long-button",
                                                                }}
                                                                anchorEl={
                                                                    anchorEl
                                                                }
                                                                open={open}
                                                                onClose={
                                                                    handleClose
                                                                }
                                                                PaperProps={{
                                                                    style: {
                                                                        maxHeight:
                                                                            ITEM_HEIGHT *
                                                                            4.5,
                                                                        width: "20ch",
                                                                    },
                                                                }}
                                                            >
                                                                <MenuItem
                                                                    key="delete"
                                                                    onClick={async (
                                                                        e
                                                                    ) => {
                                                                        try {
                                                                            handleClose(
                                                                                e
                                                                            );
                                                                            console.log(
                                                                                deletePostId
                                                                            );
                                                                            const result =
                                                                                await axios(
                                                                                    {
                                                                                        method: "POST",
                                                                                        url: `${BaseUrl}/deletePost`,
                                                                                        data: {
                                                                                            postId: posts[
                                                                                                deletePostId
                                                                                            ]
                                                                                                ._id,
                                                                                            token: localStorage.getItem(
                                                                                                "jwt"
                                                                                            ),
                                                                                        },
                                                                                    }
                                                                                );
                                                                        } catch (err) {
                                                                            console.log(
                                                                                err
                                                                            );
                                                                        }
                                                                    }}
                                                                >
                                                                    <span
                                                                        style={{
                                                                            color: "red",
                                                                        }}
                                                                    >
                                                                        Delete
                                                                    </span>
                                                                </MenuItem>
                                                            </Menu>
                                                        </div>
                                                    </div>
                                                    {/* <a href="#"></a> */}
                                                </div>

                                                <p className="post-text">
                                                    {post.caption}
                                                </p>
                                                <img
                                                    src={post.imageUrl}
                                                    alt=""
                                                    className="post-img"
                                                />
                                                <div className="post-row pt-2">
                                                    <div className="activity-icons">
                                                        <div>
                                                            <ThumbUpIcon
                                                                style={{
                                                                    cursor: "pointer",
                                                                    color:
                                                                        postData[
                                                                            idx
                                                                        ] === 1
                                                                            ? "blue"
                                                                            : "",
                                                                }}
                                                                onClick={async () => {
                                                                    console.log(
                                                                        "like"
                                                                    );
                                                                    try {
                                                                        const userId =
                                                                            localStorage.getItem(
                                                                                "user"
                                                                            ) !==
                                                                            null
                                                                                ? JSON.parse(
                                                                                      localStorage.getItem(
                                                                                          "user"
                                                                                      )
                                                                                  )
                                                                                      .id
                                                                                : "";
                                                                        const result =
                                                                            await axios(
                                                                                {
                                                                                    method: "post",
                                                                                    url:
                                                                                        BaseUrl +
                                                                                        `/likePost`,
                                                                                    data: {
                                                                                        postId: post._id,
                                                                                        userId: userId,
                                                                                    },
                                                                                }
                                                                            );
                                                                        console.log(
                                                                            result
                                                                        );
                                                                        if (
                                                                            result
                                                                                .data
                                                                                .message ===
                                                                            "Post liked successfully"
                                                                        ) {
                                                                            postData[
                                                                                idx
                                                                            ] = 1;
                                                                            postLikesCount[
                                                                                idx
                                                                            ] =
                                                                                postLikesCount[
                                                                                    idx
                                                                                ] +
                                                                                1;
                                                                        } else {
                                                                            postData[
                                                                                idx
                                                                            ] = 0;
                                                                            postLikesCount[
                                                                                idx
                                                                            ] =
                                                                                postLikesCount[
                                                                                    idx
                                                                                ] -
                                                                                1;
                                                                        }
                                                                    } catch (err) {
                                                                        console.log(
                                                                            err
                                                                        );
                                                                    }
                                                                    //   if (postData[idx] === 0) {
                                                                    //       postData[idx] = 1;
                                                                    //   } else if (
                                                                    //       postData[idx] === 1
                                                                    //   ) {
                                                                    //       console.log("Hello");
                                                                    //       postData[idx] = 0;
                                                                    //   }
                                                                    setpostData(
                                                                        (
                                                                            postData
                                                                        ) => {
                                                                            //   postData[idx] = 1;
                                                                            console.log(
                                                                                postData[
                                                                                    idx
                                                                                ]
                                                                            );

                                                                            return [
                                                                                ...postData,
                                                                            ];
                                                                        }
                                                                    );
                                                                    setpostLikesCount(
                                                                        (
                                                                            postLikesCount
                                                                        ) => {
                                                                            return [
                                                                                ...postLikesCount,
                                                                            ];
                                                                        }
                                                                    );
                                                                    //   console.log(postData);
                                                                }}
                                                            />
                                                            {/* <ThumbUpIcon
                                                                style={{
                                                                    cursor: "pointer",
                                                                    color:
                                                                        postData[
                                                                            idx
                                                                        ] === 1
                                                                            ? "blue"
                                                                            : "",
                                                                }}
                                                                
                                                            /> */}
                                                            {
                                                                postLikesCount[
                                                                    idx
                                                                ]
                                                            }
                                                        </div>
                                                        <div
                                                            onClick={() => {
                                                                show_comments(
                                                                    post._id
                                                                );
                                                            }}
                                                            style={{
                                                                cursor: "pointer",
                                                            }}
                                                        >
                                                            {/* <img src={comment} alt="" /> */}
                                                            <ForumOutlinedIcon />
                                                            {
                                                                post.comments
                                                                    .length
                                                            }
                                                        </div>
                                                    </div>
                                                    <div className="post-profile-icon">
                                                        <img src={
                                                                userData.user
                                                                    .profilePic
                                                            } alt="" />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    }
                                })
                            ) : null}
                            {loading ? <LoadingComponent /> : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
