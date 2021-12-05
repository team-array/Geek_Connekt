import React, { useEffect, useState, useRef, useCallback } from "react";
import pp from "../Profile/components/img/profile-pic.png";
import like from "../Profile/components/img/like-blue.png";
import comment from "../Profile/components/img/comments.png";
import share from "../Profile/components/img/share.png";
import feed from "../Profile/components/img/feed-image-1.png";
import "./Feed.scss";
import axios from "axios";
import Comment from "../CommentBox/Comment";
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

const openNotificationWithIcon = (info) => {
    notification[info.type]({
        message: info.title,
        description: info.description,
    });
};

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

    const [pageNumber, setpageNumber] = useState(1);

    const [postData, setpostData] = useState([]);
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
    return (
        <div className="feed-container">
            <Comment />
            <div className="Feed ">
                {/* {temp ? <h1>Liked</h1> : <h1>Like</h1>} */}
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
                                              <Link
                                                  to={`/user/${post.user._id}`}
                                              >
                                                  <img
                                                      src={post.user.profilePic}
                                                      alt="User profile Pic"
                                                  />
                                              </Link>
                                              <div>
                                                  <Link
                                                      to={`/user/${post.user._id}`}
                                                  >
                                                      <p>
                                                          {post.user.username}
                                                      </p>
                                                  </Link>
                                                  <span>{post.createdAt}</span>
                                              </div>
                                          </div>
                                          {/* <a href="#"></a> */}
                                      </div>

                                      <p className="post-text">
                                          {post.caption}
                                      </p>
                                      <img
                                          src={post.imageUrl}
                                          alt="post"
                                          className="post-img"
                                      />
                                      <div className="post-row">
                                          <div className="activity-icons">
                                              <div>
                                                  <ThumbUpIcon
                                                      style={{
                                                          cursor: "pointer",
                                                          color:
                                                              postData[idx] ===
                                                              1
                                                                  ? "blue"
                                                                  : "",
                                                      }}
                                                      onClick={async () => {
                                                          console.log("like");
                                                          try {
                                                              const userId =
                                                                  localStorage.getItem(
                                                                      "user"
                                                                  ) !== null
                                                                      ? JSON.parse(
                                                                            localStorage.getItem(
                                                                                "user"
                                                                            )
                                                                        ).id
                                                                      : "";
                                                              const result =
                                                                  await axios({
                                                                      method: "post",
                                                                      url: `http://localhost:8000/likePost`,
                                                                      data: {
                                                                          postId: post._id,
                                                                          userId: userId,
                                                                      },
                                                                  });
                                                              console.log(
                                                                  result
                                                              );
                                                              if (
                                                                  result.data
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
                                                                      ] + 1;
                                                              } else {
                                                                  postData[
                                                                      idx
                                                                  ] = 0;
                                                                  postLikesCount[
                                                                      idx
                                                                  ] =
                                                                      postLikesCount[
                                                                          idx
                                                                      ] - 1;
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
                                                          setpostData(
                                                              (postData) => {
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
                                                  {postLikesCount[idx]}
                                              </div>
                                              <div
                                                  onClick={() => {
                                                      show_comments(post._id);
                                                  }}
                                                  style={{ cursor: "pointer" }}
                                              >
                                                  {/* <img src={comment} alt="" /> */}
                                                  <ForumOutlinedIcon
                                                      style={{ height: "auto" }}
                                                  />
                                                  {post.comments.length}
                                              </div>
                                              <div>
                                                  {savedPosts[post._id] ===
                                                      undefined ||
                                                  savedPosts[post._id] ===
                                                      false ? (
                                                      <BookmarkBorderIcon
                                                          onClick={() =>
                                                              SavePost(post._id)
                                                          }
                                                          style={{
                                                              cursor: "pointer",
                                                          }}
                                                      />
                                                  ) : (
                                                      <BookmarkIcon
                                                          onClick={() =>
                                                              SavePost(post._id)
                                                          }
                                                          style={{
                                                              cursor: "pointer",
                                                          }}
                                                      />
                                                  )}
                                              </div>
                                          </div>
                                          <div className="post-profile-icon">
                                              <img src={pp} alt="" />
                                          </div>
                                      </div>
                                  </div>
                              );
                          } else {
                              return (
                                  <div className="post-container mb-5 card mx-auto shadow-sm">
                                      <div className="post-row">
                                          <div className="user-profile">
                                              <Link
                                                  to={`/user/${post.user._id}`}
                                              >
                                                  <img
                                                      src={post.user.profilePic}
                                                      alt="User profile Pic"
                                                  />
                                              </Link>
                                              <div>
                                                  <Link
                                                      to={`/user/${post.user._id}`}
                                                  >
                                                      <p>
                                                          {post.user.username}
                                                      </p>
                                                  </Link>
                                                  <span>{post.createdAt}</span>
                                              </div>
                                          </div>
                                          {/* <a href="#"></a> */}
                                      </div>

                                      <p className="post-text">
                                          {post.caption}
                                      </p>
                                      <img
                                          src={post.imageUrl}
                                          alt="post"
                                          className="post-img"
                                      />
                                      <div className="post-row">
                                          <div className="activity-icons">
                                              <div>
                                                  <ThumbUpIcon
                                                      style={{
                                                          cursor: "pointer",
                                                          color:
                                                              postData[idx] ===
                                                              1
                                                                  ? "blue"
                                                                  : "",
                                                      }}
                                                      onClick={async () => {
                                                          console.log("like");
                                                          try {
                                                              const userId =
                                                                  localStorage.getItem(
                                                                      "user"
                                                                  ) !== null
                                                                      ? JSON.parse(
                                                                            localStorage.getItem(
                                                                                "user"
                                                                            )
                                                                        ).id
                                                                      : "";
                                                              const result =
                                                                  await axios({
                                                                      method: "post",
                                                                      url: `http://localhost:8000/likePost`,
                                                                      data: {
                                                                          postId: post._id,
                                                                          userId: userId,
                                                                      },
                                                                  });
                                                              console.log(
                                                                  result
                                                              );
                                                              if (
                                                                  result.data
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
                                                                      ] + 1;
                                                              } else {
                                                                  postData[
                                                                      idx
                                                                  ] = 0;
                                                                  postLikesCount[
                                                                      idx
                                                                  ] =
                                                                      postLikesCount[
                                                                          idx
                                                                      ] - 1;
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
                                                          setpostData(
                                                              (postData) => {
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
                                                  {postLikesCount[idx]}
                                              </div>
                                              <div
                                                  onClick={() => {
                                                      show_comments(post._id);
                                                  }}
                                                  style={{ cursor: "pointer" }}
                                              >
                                                  {/* <img src={comment} alt="" /> */}
                                                  <ForumOutlinedIcon />
                                                  {post.comments.length}
                                              </div>
                                              <div>
                                                  {savedPosts[post._id] ===
                                                      undefined ||
                                                  savedPosts[post._id] ===
                                                      false ? (
                                                      <BookmarkBorderIcon
                                                          onClick={() =>
                                                              SavePost(post._id)
                                                          }
                                                          style={{
                                                              cursor: "pointer",
                                                          }}
                                                      />
                                                  ) : (
                                                      <BookmarkIcon
                                                          onClick={() =>
                                                              SavePost(post._id)
                                                          }
                                                          style={{
                                                              cursor: "pointer",
                                                          }}
                                                      />
                                                  )}
                                              </div>
                                          </div>
                                          <div className="post-profile-icon">
                                              <img src={pp} alt="" />
                                          </div>
                                      </div>
                                  </div>
                              );
                          }
                      })
                    : null}
                {loading ? <LoadingComponent /> : null}
            </div>
            <div style={{ height: "2.3rem" }}></div>
        </div>
    );
};

export default Feed;
