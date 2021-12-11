import React, { useState } from "react";
import pp from "../Profile/components/img/profile-pic.png";
import like from "../Profile/components/img/like-blue.png";
import comment from "../Profile/components/img/comments.png";
import share from "../Profile/components/img/share.png";
import feed from "../Profile/components/img/feed-image-1.png";
import axios from "axios";
import { BaseUrl } from "../../../constants";
import { useDispatch } from "react-redux";
import moment from "moment";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import { notification } from "antd";

const openNotificationWithIcon = (info) => {
  notification[info.type]({
    message: info.title,
    description: info.description,
  });
};

const Favorites = () => {
  const dispatch = useDispatch();
  const [savedPosts, setSavedPosts] = React.useState([]);
  const [saved, setSaved] = useState({});
  React.useEffect(() => {
    let getMySavedPosts = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        let response = await axios.post(BaseUrl + "/getMySavedPosts", {
          token: localStorage.getItem("jwt"),
        });
        dispatch({ type: "SET_LOADING", payload: false });
        if (response.data.success) {
          let saved = {};
          response.data.savedPosts.map((postId) => {
            saved[postId.postId] = true;
          });
          setSaved(saved);
          setSavedPosts(response.data.savedPosts.reverse());
        }
      } catch (err) {
        dispatch({ type: "SET_LOADING", payload: false });
        console.log(err);
      }
    };
    getMySavedPosts();
  }, []);
  const SavePost = async (postId, index) => {
    try {
      const response = await axios.post(BaseUrl + "/SavePost", {
        postId,
        token: localStorage.getItem("jwt"),
      });
      if (response.data.success) {
        setSaved((prev) => {
          return {
            ...prev,
            [postId]: prev[postId] ? !prev[postId] : true,
          };
        });
        setSavedPosts((prev) => {
          return prev.filter((post, i) => i !== index);
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
  const show_comments = (id) => {
    // dispatch({
    //   type: "SET_COMMENT_BOX",
    //   payload: {
    //     postId: id,
    //     commentBox: true,
    //   },
    // });
  };
  return (
    <div className="feed-container">
      <div className="Feed ">
        {savedPosts.length === 0 ? (
          <div className="no-posts">
            <div
              className="no-posts-text"
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                display: "flex",
                justifyContent: "center",
              }}
            >
              No Posts to show
            </div>
          </div>
        ) : null}
        {savedPosts.map((post, index) => {
          let date = post.createdAt.split("T")[0];
          let time = post.createdAt.split("T")[1].split(".")[0];
          let month = parseInt(date.split("-")[1]) - 1;
          let day = parseInt(date.split("-")[2]);
          let year = parseInt(date.split("-")[0]);
          let hour = parseInt(time.split(":")[0]);
          let min = parseInt(time.split(":")[1]);
          let sec = parseInt(time.split(":")[2]);
          let m = moment([year, month, day, hour, min, sec]);
          return (
            <div className="post-container mb-5 card mx-auto shadow-sm">
              <div className="post-row">
                <div className="user-profile">
                  <img src={post.profilePic} alt="" />
                  <div>
                    <p className="text-capitalize">{post.username}</p>
                    <span>
                      {new Date(post.createdAt).toString().split("GMT")[0]}
                    </span>
                  </div>
                </div>
                {/* <a href="#"></a> */}
              </div>

              <p className="post-text">{post.caption}</p>
              <img src={post.imageUrl} alt="" className="post-img mb-3" />
              <div className="post-row mt-3">
                <div className="activity-icons ">
                  <div>
                    {saved[post.postId] === undefined ||
                    saved[post.postId] === false ? (
                      <BookmarkBorderIcon
                        onClick={() => SavePost(post.postId, index)}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <BookmarkIcon
                        onClick={() => SavePost(post.postId, index)}
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
        })}
        <div className="post-container mb-5 card mx-auto shadow-sm">
          <div style={{ height: "2.3rem" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Favorites;
