import React, { useEffect, useState, useRef } from "react";
import pp from "../Profile/components/img/profile-pic.png";
import like from "../Profile/components/img/like-blue.png";
import comment from "../Profile/components/img/comments.png";
import share from "../Profile/components/img/share.png";
import feed from "../Profile/components/img/feed-image-1.png";
import "./Feed.scss";
import Comment from "../CommentBox/Comment";
import { useDispatch } from "react-redux";
import feedPostsHook from "../../../hooks/feedPostsHook";
const Feed = () => {
    const dispatch = useDispatch();
    const show_comments = () => {
        dispatch({ type: "SET_COMMENT_BOX", payload: true });
    };

    const [pageNumber, setpageNumber] = useState(1);

    const { loading, error, posts, hasMore } = feedPostsHook(
        localStorage.getItem("user") !== null
            ? JSON.parse(localStorage.getItem("user")).id
            : "",
        pageNumber
    );

    React.useEffect(() => {
        if (loading) return;
        console.log(posts);
    }, [loading, hasMore, posts]);

    return (
        <div className="feed-container">
            <Comment />
            <div className="Feed ">
                {posts.map((post, idx) => {
                    return (
                        <div className="post-container mb-5 card mx-auto shadow-sm">
                            <div className="post-row">
                                <div className="user-profile">
                                    <img
                                        src={post.user.profilePic}
                                        alt="User profile Pic"
                                    />
                                    <div>
                                        <p>{post.user.username}</p>
                                        <span>{post.createdAt}</span>
                                    </div>
                                </div>
                                {/* <a href="#"></a> */}
                            </div>

                            <p className="post-text">{post.comment}</p>
                            <img
                                src={post.imageUrl}
                                alt="post"
                                className="post-img"
                            />
                            <div className="post-row">
                                <div className="activity-icons">
                                    <div>
                                        <img src={like} alt="" />
                                        {post.likes.length}
                                    </div>
                                    <div
                                        onClick={show_comments}
                                        style={{ cursor: "pointer" }}
                                    >
                                        <img src={comment} alt="" />
                                        {post.comments.length}
                                    </div>
                                    <div>
                                        <img src={share} alt="" />
                                        120
                                    </div>
                                </div>
                                <div className="post-profile-icon">
                                    <img src={pp} alt="" />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <div style={{ height: "2.3rem" }}></div>
        </div>
    );
};

export default Feed;
