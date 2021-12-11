import React, { useEffect, useState, useRef, useCallback } from "react";
import pp from "../Profile/components/img/profile-pic.png";
import like from "../Profile/components/img/like-blue.png";
import comment from "../Profile/components/img/comments.png";
import share from "../Profile/components/img/share.png";
import feed from "../Profile/components/img/feed-image-1.png";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import job from "./img/profile-job.png";
import study from "./img/profile-study.png";
import home from "./img//profile-home.png";
import location from "./img/profile-location.png";
import "./Feed.scss";
import axios from "axios";
import Comment from "../CommentBox/Comment";
import IconButton from "@mui/material/IconButton";
import { useDispatch } from "react-redux";
import feedPostsHook from "../../../hooks/feedPostsHook";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import LoadingComponent from "../../../components/loadingComponent/LoadingComponent";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import { BaseUrl } from "../../../constants";
import { notification } from "antd";
import { Link } from "react-router-dom";
import LinkIcon from "@mui/icons-material/Link";
import CakeIcon from "@mui/icons-material/Cake";
import PersonIcon from "@mui/icons-material/Person";
import Quote from "inspirational-quotes";

function useWindowDimensions() {
  const hasWindow = typeof window !== "undefined";

  function getWindowDimensions() {
    const width = hasWindow ? window.innerWidth : null;
    return {
      width,
    };
  }

  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (hasWindow) {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
}

const openNotificationWithIcon = (info) => {
  notification[info.type]({
    message: info.title,
    description: info.description,
  });
};

const ITEM_HEIGHT = 48;

const Feed = () => {
  const dispatch = useDispatch();
  const show_comments = (id) => {
    dispatch({
      type: "SET_COMMENT_BOX",
      payload: {
        postId: id,
        commentBox: true,
      },
    });
  };

  const { width } = useWindowDimensions();

  const [pageNumber, setpageNumber] = useState(1);

  const [userData, setUserData] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [postData, setpostData] = useState([]);
  const [deletePostId, setDeletePostId] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [userRole, setUserRole] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user")).role
      : null
  );
  const [postLikesCount, setpostLikesCount] = useState([]);

  const { loading, error, posts, hasMore } = feedPostsHook(
    localStorage.getItem("user") !== null
      ? JSON.parse(localStorage.getItem("user")).id
      : "",
    pageNumber
  );

  const lastPostReference = useRef();

  const lastPostRefChanger = useCallback(
    (post) => {
      if (loading) return;
      console.log("Last post:", post);
      if (lastPostReference.current) {
        console.log("Disconnected");
        lastPostReference.current.disconnect();
      }
      lastPostReference.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore > 0) {
          console.log("Visible");
          setpageNumber((pageNumber) => (pageNumber += 1));
        }
      });
      if (post) {
        lastPostReference.current.observe(post);
        console.log(post);
      }
    },
    [loading, hasMore]
  );

  React.useEffect(() => {
    if (loading) return;
    console.log(posts);
    setpostData(new Array(posts.length).fill(0));
    posts.map((post, idx) => {
      setpostLikesCount((prev) => [...prev, post.likes.length]);
      post.likes.filter(
        (l) =>
          l._id ===
          (localStorage.getItem("user") !== null
            ? JSON.parse(localStorage.getItem("user")).id
            : "")
      ).length > 0
        ? setpostData((postData) => {
            postData[idx] = 1;
            return postData;
          })
        : setpostData((postData) => {
            postData[idx] = 0;
            return postData;
          });
    });
  }, [loading, hasMore, posts]);
  const [savedPosts, setSavedPosts] = useState({});
  const SavePost = async (postId) => {
    try {
      const response = await axios.post(BaseUrl + "/SavePost", {
        postId,
        token: localStorage.getItem("jwt"),
      });
      if (response.data.success) {
        setSavedPosts((prev) => {
          return {
            ...prev,
            [postId]: prev[postId] ? !prev[postId] : true,
          };
        });
        openNotificationWithIcon({
          type: "success",
          title: response.data.title,
          description: response.data.message,
        });
      }
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  React.useEffect(() => {
    const getSavedPosts = async () => {
      try {
        const response = await axios.post(BaseUrl + "/getSavedPosts", {
          token: localStorage.getItem("jwt"),
        });
        if (response.data.success) {
          let saved = {};
          response.data.savedPosts.map((postId) => {
            saved[postId] = true;
          });
          setSavedPosts(saved);
        } else {
          setSavedPosts({});
        }
      } catch (err) {
        console.log(err);
      }
    };
    getSavedPosts();
  }, []);
  console.log(posts);
  return (
    <div className="feed-container">
      <Comment />
      <div
        className="Feed "
        style={
          {
            // display: "flex",
          }
        }
      >
        {/* {temp ? <h1>Liked</h1> : <h1>Like</h1>} */}
        <div
          style={{
            position: "fixed",
            top: "7.75rem",
            left: "70px",
            width: "20%",
            height: "70%",
            borderRadius: "10px",
            // border: "grey 1px solid",
            display: `${width < 800 ? "none" : "block"}`,
            boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
            transition: "all 0.3s cubic-bezier(.25,.8,.25,1)"
          }}
        >
          <div
            className="feedProfileCoverPage"
            style={{
              backgroundImage: `url(${userData ? userData.backgroundPic : ""})`,
              backgroundSize: "cover",
              width: "100%",
              height: "15%",
              borderRadius: "10px 10px 0 0",
              position: "relative",
            }}
          >
            <div
              className="feedProfilePic"
              style={{
                width: "5rem",
                height: "5rem",
                borderRadius: "50%",
                backgroundImage: `url(${userData ? userData.profilePic : ""})`,
                backgroundSize: "cover",
                margin: "auto",
                position: "absolute",
                transform: "translateX(-50%)",
                top: "50%",
                left: "50%",
                
              }}
            ></div>
          </div>
          <div className="feedUserDeatials">
            <div
              style={{
                margin: "auto",
                width: "80%",
                textAlign: "center",
                marginTop: "50px",
         
              }}
            >
                {/* {temp ? <h1>Liked</h1> : <h1>Like</h1>} */}
                {/* <div
                className="profileSectionFeed"
                    style={{
                        position: "fixed",
                        top: "5rem",
                        left: "10px",
                        width: "20%",
                        height: "70%",
                        borderRadius: "10px",
                        // border: "grey 1px solid",
                        display: `${width < 800 ? "none" : "block"}`,
                    }} */}
              <p
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  margin: "2px",
                }}
              >
                {userData ? userData.username : ""}
              </p>
              <p
                style={{
                  margin: "0",
                }}
              >
                {userData ? userData.role : ""}
              </p>
              <p>{userData ? userData.bio : ""}</p>
              <hr />
              <div
                className="feedRandomQuote"
                style={{
                  overflow: "hidden",
                }}
              >
                <p
                  style={{
                    fontSize: "1rem",
                    fontWeight: "700",
                  }}
                >
                  `{(Quote.getQuote()!==undefined)?Quote.getQuote().text:""}`
                </p>
                <p>~{Quote.getQuote().author}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          {postData !== undefined && postData !== null
            ? posts.map((post, idx) => {
                if (posts.length === idx + 1) {
                  return (
                    <div
                      className="post-container mb-5 card mx-auto shadow-sm"
                      ref={lastPostRefChanger}
                    >
                      <div className="post-row">
                        <div className="user-profile">
                          <Link to={`/user/${post._id}`}>
                            <img
                              src={post.user.profilePic}
                              alt="User profile Pic"
                            />
                          </Link>
                          <div>
                            <Link to={`/user/${post.user._id}`}>
                              <p>{post.user.username}</p>
                            </Link>
                            <span>
                              {
                                new Date(post.createdAt)
                                  .toString()
                                  .split("GMT")[0]
                              }
                            </span>
                          </div>
                        </div>
                        {/* <a href="#"></a> */}
                        {userRole === "Teacher" ? (
                          <div
                            style={{
                              marginLeft: "auto",
                            }}
                          >
                            <IconButton
                              aria-label="more"
                              id="long-button"
                              aria-controls="long-menu"
                              aria-expanded={open ? "true" : undefined}
                              aria-haspopup="true"
                              onClick={(e) => {
                                handleClick(e);
                                setDeletePostId(idx);
                              }}
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="long-menu"
                              MenuListProps={{
                                "aria-labelledby": "long-button",
                              }}
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              PaperProps={{
                                style: {
                                  maxHeight: ITEM_HEIGHT * 4.5,
                                  width: "20ch",
                                },
                              }}
                            >
                              <MenuItem
                                key="delete"
                                onClick={async (e) => {
                                  try {
                                    handleClose(e);
                                    console.log(deletePostId);
                                    const result = await axios({
                                      method: "POST",
                                      url: `${BaseUrl}/deletePostAdmin`,
                                      data: {
                                        postId: posts[deletePostId]._id,
                                        token: localStorage.getItem("jwt"),
                                      },                                      
                                    });
                                    window.location.reload();

                                  } catch (err) {
                                    console.log(err);
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
                        ) : null}
                      </div>

                      <p className="post-text">{post.caption}</p>
                      <img
                        src={post.imageUrl}
                        alt="post"
                        className="post-img"
                      />
                      <div className="post-row pt-2">
                        <div className="activity-icons">
                          <div>
                            <ThumbUpIcon
                              style={{
                                cursor: "pointer",
                                color: postData[idx] === 1 ? "blue" : "",
                              }}
                              onClick={async () => {
                                console.log("like");
                                try {
                                  const userId =
                                    localStorage.getItem("user") !== null
                                      ? JSON.parse(localStorage.getItem("user"))
                                          .id
                                      : "";
                                  const result = await axios({
                                    method: "post",
                                    url: BaseUrl + `/likePost`,
                                    data: {
                                      postId: post._id,
                                      userId: userId,
                                    },
                                  });
                                  console.log(result);
                                  if (
                                    result.data.message ===
                                    "Post liked successfully"
                                  ) {
                                    postData[idx] = 1;
                                    postLikesCount[idx] =
                                      postLikesCount[idx] + 1;
                                  } else {
                                    postData[idx] = 0;
                                    postLikesCount[idx] =
                                      postLikesCount[idx] - 1;
                                  }
                                } catch (err) {
                                  console.log(err);
                                }
                                //   if (postData[idx] === 0) {
                                //       postData[idx] = 1;
                                //   } else if (
                                //       postData[idx] === 1
                                //   ) {
                                //       console.log("Hello");
                                //       postData[idx] = 0;
                                //   }
                                setpostData((postData) => {
                                  //   postData[idx] = 1;
                                  console.log(postData[idx]);

                                  return [...postData];
                                });
                                setpostLikesCount((postLikesCount) => {
                                  return [...postLikesCount];
                                });
                                //   console.log(postData);
                              }}
                            />
                            {postLikesCount[idx]}
                          </div>
                          <div
                            onClick={() => {
                              show_comments(post._id);
                            }}
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            {/* <img src={comment} alt="" /> */}
                            <ForumOutlinedIcon
                              style={{
                                height: "auto",
                              }}
                            />
                            {post.comments.length}
                          </div>
                          <div>
                            {savedPosts[post._id] === undefined ||
                            savedPosts[post._id] === false ? (
                              <BookmarkBorderIcon
                                onClick={() => SavePost(post._id)}
                                style={{
                                  cursor: "pointer",
                                }}
                              />
                            ) : (
                              <BookmarkIcon
                                onClick={() => SavePost(post._id)}
                                style={{
                                  cursor: "pointer",
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <div className="post-profile-icon">
                          <img src={post.user.profilePic} alt="" />
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  console.log(post)
                  return (
                    <div className="post-container mb-5 card mx-auto shadow-sm">
                      <div className="post-row">
                        <div
                          className="user-profile"
                          style={{
                            display: `${userRole === "Teacher" ? "flex" : ""}`,
                            justifyContent: `${
                              userRole === "Teacher" ? "space-between" : ""
                            }`,
                            width: "100%",
                          }}
                        >
                          <Link to={`/user/${post.user._id}`}>
                            <img
                              src={post.user.profilePic}
                              alt="User profile Pic"
                            />
                          </Link>
                          <div>
                            <Link to={`/user/${post.user._id}`}>
                              <p>{post.user.username}</p>
                            </Link>
                            <span>
                              {
                                new Date(post.createdAt)
                                  .toString()
                                  .split("GMT")[0]
                              }
                            </span>
                          </div>
                          {userRole === "Teacher" ? (
                            <div
                              style={{
                                marginLeft: "auto",
                              }}
                            >
                              <IconButton
                                aria-label="more"
                                id="long-button"
                                aria-controls="long-menu"
                                aria-expanded={open ? "true" : undefined}
                                aria-haspopup="true"
                                onClick={(e) => {
                                  handleClick(e);
                                  setDeletePostId(idx);
                                }}
                              >
                                <MoreVertIcon />
                              </IconButton>
                              <Menu
                                id="long-menu"
                                MenuListProps={{
                                  "aria-labelledby": "long-button",
                                }}
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                  style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: "20ch",
                                  },
                                }}
                              >
                                <MenuItem
                                  key="delete"
                                  onClick={async (e) => {
                                    try {
                                      handleClose(e);
                                      console.log(deletePostId);
                                      const result = await axios({
                                        method: "POST",
                                        url: `${BaseUrl}/deletePostAdmin`,
                                        data: {
                                          postId: posts[deletePostId]._id,
                                          token: localStorage.getItem("jwt"),
                                        },
                                      });
                                      window.location.reload();
                                    } catch (err) {
                                      console.log(err);
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
                          ) : null}
                        </div>
                        {/* <a href="#"></a> */}
                      </div>

                      <p className="post-text">{post.caption}</p>
                      <img
                        src={post.imageUrl}
                        alt="post"
                        className="post-img"
                      />
                      <div className="post-row pt-2">
                        <div className="activity-icons">
                          <div>
                            <ThumbUpIcon
                              style={{
                                cursor: "pointer",
                                color: postData[idx] === 1 ? "blue" : "",
                              }}
                              onClick={async () => {
                                console.log("like");
                                try {
                                  const userId =
                                    localStorage.getItem("user") !== null
                                      ? JSON.parse(localStorage.getItem("user"))
                                          .id
                                      : "";
                                  const result = await axios({
                                    method: "post",
                                    url: BaseUrl + `/likePost`,
                                    data: {
                                      postId: post._id,
                                      userId: userId,
                                    },
                                  });
                                  console.log(result);
                                  if (
                                    result.data.message ===
                                    "Post liked successfully"
                                  ) {
                                    postData[idx] = 1;
                                    postLikesCount[idx] =
                                      postLikesCount[idx] + 1;
                                  } else {
                                    postData[idx] = 0;
                                    postLikesCount[idx] =
                                      postLikesCount[idx] - 1;
                                  }
                                } catch (err) {
                                  console.log(err);
                                }
                                //   if (postData[idx] === 0) {
                                //       postData[idx] = 1;
                                //   } else if (
                                //       postData[idx] === 1
                                //   ) {
                                //       console.log("Hello");
                                //       postData[idx] = 0;
                                //   }
                                setpostData((postData) => {
                                  //   postData[idx] = 1;
                                  console.log(postData[idx]);

                                  return [...postData];
                                });
                                setpostLikesCount((postLikesCount) => {
                                  return [...postLikesCount];
                                });
                                //   console.log(postData);
                              }}
                            />
                            {postLikesCount[idx]}
                          </div>
                          <div
                            onClick={() => {
                              show_comments(post._id);
                            }}
                            style={{
                              cursor: "pointer",
                            }}
                          >
                            {/* <img src={comment} alt="" /> */}
                            <ForumOutlinedIcon />
                            {post.comments.length}
                          </div>
                          <div>
                            {savedPosts[post._id] === undefined ||
                            savedPosts[post._id] === false ? (
                              <BookmarkBorderIcon
                                onClick={() => SavePost(post._id)}
                                style={{
                                  cursor: "pointer",
                                }}
                              />
                            ) : (
                              <BookmarkIcon
                                onClick={() => SavePost(post._id)}
                                style={{
                                  cursor: "pointer",
                                }}
                              />
                            )}
                          </div>
                        </div>
                        <div className="post-profile-icon">
                          <img src={post.profilePic} alt="" />
                        </div>
                      </div>
                    </div>
                  );
                }
              })
            : null}
        </div>
        {loading ? <LoadingComponent /> : null}
      </div>
      <div style={{ height: "2.3rem" }}></div>
    </div>
  );
};

export default Feed;
