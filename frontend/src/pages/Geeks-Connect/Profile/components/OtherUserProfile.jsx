import React, { useCallback, useRef, useState, useEffect } from "react";
import coverimg from "./img/cover.png";
import profileimg from "./img/profile.png";
import star from "./img/star.jfif";
import micon from "./img/message.png";
import info from "./img/info.jfif";
import live from "./img/live-video.png";
import photo from "./img/photo.png";
import feeling from "./img/feeling.png";
import feed from "./img/feed-image-1.png";
import like from "./img/like-blue.png";
import comment from "./img/comments.png";
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
import PersonIcon from "@mui/icons-material/Person";
import CakeIcon from "@mui/icons-material/Cake";

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

const USER_DATA = gql`
    query otherUser($id: String!) {
        otherUser(id: $id) {
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
            fullName
            birthDate
            website
            phoneNumber
        }
    }
`;

export const OtherUserProfile = (props) => {
    const dispatch = useDispatch();
    const {
        loading: userDataLoading,
        data: userData,
        error: userDataError,
    } = useQuery(USER_DATA, {
        variables: {
            id: window.location.href.split("/")[5],
        },
    });

    const [achievements,setachievements] = React.useState([]);

    const [showAllPhotos, setShowAllPhotos] = React.useState(false);

    const [ImagesGridLength,setImagesGridLength] = React.useState(0);

    const [tab, setTab] = React.useState(0);

    const [pageNumber, setpageNumber] = React.useState(1);

    const [edit, setedit] = React.useState(false);

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
        window.location.href.split("/")[5],
        pageNumber
    );

    React.useEffect(() => {
        if (!userDataLoading) {
            console.log("userData: ", userData);
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

    useEffect(() => {
        console.log(window.location.href.split("/")[5]);
    }, []);

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
                        username: userData.otherUser.username,
                    },
                });
                console.log(response);
                if (response.data.success) {
                    setachievements(response.data.achievements);
                    setImagesGridLength(Math.min(response.data.achievements.length, 4));
                }
            } catch (error) {
                console.log(error);
            }
        };
        getachievements();
    }, [userData]);
    return userDataLoading ? (
        <div>loading...</div>
    ) : (
        <div className="ProfilepageComponent">
            <div className="profile-container">
                <img
                    src={userData.otherUser.backgroundPic}
                    alt="coverimg"
                    className="cover-img"
                />
                <div className="profile-details mt-1">
                    <div className="pd-left mr-auto my-2">
                        <div className="pd-row">
                            <img
                                style={{
                                    borderRadius: "100%",
                                }}
                                src={userData.otherUser.profilePic}
                                alt="profileimg"
                                className="pd-img"
                            />
                            <div>
                                <h3>{userData.otherUser.username}</h3>
                                <p>{userData.otherUser.role}</p>
                                <img src={star} alt="star" />
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
                        <a
                            href={`https://api.whatsapp.com/send/?phone=%2B91${userData.otherUser.phoneNumber}&text=Hey+${userData.otherUser.username}&app_absent=0`}
                            target="_blank"
                        >
                            <Button type="button">
                                <img src={micon} alt="" />
                                message &nbsp;{" "}
                            </Button>
                        </a>
                    </div>
                </div>

                {/* 1 */}
                <div className="ProfileBlog">
                    <div className="profile-info">
                        <div className="info-col">
                            <div
                                className="profile-intro"
                                style={{
                                    boxShadow:
                                        "0px 0px 5px 0px rgb(0 0 0 / 10%)",
                                }}
                            >
                                <h3>Intro</h3>
                                <p className="intro-text">
                                    {userData.otherUser.bio}
                                </p>
                                <hr />
                                <ul>
                                    <li>
                                        <PersonIcon />
                                        &nbsp; &nbsp;
                                        {userData.otherUser.fullName}
                                    </li>
                                    <li>
                                        <CakeIcon />
                                        &nbsp; &nbsp; born on &nbsp;
                                        {new Date(
                                            new Number(
                                                userData.otherUser.birthDate
                                            )
                                        ).toDateString()}
                                    </li>
                                    <li>
                                        <img src={job} alt="" />{" "}
                                        {userData.otherUser.role}
                                    </li>
                                    <li>
                                        <img src={study} alt="" />
                                        {userData.otherUser.role} in{" "}
                                        {userData.otherUser.college}
                                    </li>
                                    <li>
                                        <img src={study} alt="" />
                                        Secondary School:{" "}
                                        {userData.otherUser.secondarySchool}
                                    </li>
                                    <li>
                                        <img src={study} alt="" />
                                        School:{" "}
                                        {userData.otherUser.primarySchool}
                                    </li>
                                    <li>
                                        <img src={home} alt="" />
                                        Lives in {userData.otherUser.hometown}
                                    </li>
                                    <li>
                                        <img src={location} alt="" />
                                        From {userData.otherUser.location}
                                    </li>
                                </ul>
                            </div>
                            <div
                                className="profile-intro"
                                style={{
                                    boxShadow:
                                        "0px 0px 5px 0px rgb(0 0 0 / 10%)",
                                }}
                            >
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
                                                setImagesGridLength(4);
                                            } else {
                                                setImagesGridLength(
                                                    achievements.length
                                                );
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
                                        src={userData.otherUser.profilePic}
                                        alt=""
                                    />
                                    <div>
                                        <p>{userData.otherUser.username}</p>
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
                            {posts.length === 0 || posts === undefined ? (
                                <h1
                                    style={{
                                        margin: "2rem",
                                        textAlign: "center",
                                    }}
                                >
                                    {userData.otherUser.username} doen't have
                                    any Post's yet!
                                </h1>
                            ) : postData !== undefined &&
                              postData !== null &&
                              postData.length > 0 ? (
                                posts.map((post, idx) => {
                                    if (posts.length === idx + 1) {
                                        return (
                                            <div
                                                className="post-container"
                                                style={{
                                                    boxShadow:
                                                        "0px 0px 5px 0px rgb(0 0 0 / 10%)",
                                                }}
                                                ref={lastPostRefChanger}
                                            >
                                                <div className="post-row">
                                                    <div className="user-profile">
                                                        <img
                                                            src={
                                                                userData
                                                                    .otherUser
                                                                    .profilePic
                                                            }
                                                            alt=""
                                                        />
                                                        <div>
                                                            <p>
                                                                {
                                                                    userData
                                                                        .otherUser
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
                                                <div className="post-row">
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
                                                        <div>
                                                            <img
                                                                src={share}
                                                                alt=""
                                                            />
                                                            120
                                                        </div>
                                                    </div>
                                                    <div className="post-profile-icon">
                                                        <img
                                                            src={
                                                                userData
                                                                    .otherUser
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
                                                style={{
                                                    boxShadow:
                                                        "0px 0px 5px 0px rgb(0 0 0 / 10%)",
                                                }}
                                            >
                                                <div className="post-row">
                                                    <div className="user-profile">
                                                        <img
                                                            src={
                                                                userData
                                                                    .otherUser
                                                                    .profilePic
                                                            }
                                                            alt=""
                                                        />
                                                        <div>
                                                            <p>
                                                                {
                                                                    userData
                                                                        .otherUser
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
                                                <div className="post-row">
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
                                                        <div>
                                                            <img
                                                                src={share}
                                                                alt=""
                                                            />
                                                            120
                                                        </div>
                                                    </div>
                                                    <div className="post-profile-icon">
                                                        <img
                                                            src={
                                                                userData
                                                                    .otherUser
                                                                    .profilePic
                                                            }
                                                            alt=""
                                                        />
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
