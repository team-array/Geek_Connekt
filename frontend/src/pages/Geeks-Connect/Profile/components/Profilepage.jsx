import React from "react";
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
import comment from "./img/comments.png";
import share from "./img/share.png";
import job from "./img/profile-job.png";
import study from "./img/profile-study.png";
import home from "./img/profile-home.png";
import location from "./img/profile-location.png";
import { Button } from "antd";
import axios from "axios";

import post1 from "./img/photo1.png";
import post2 from "./img/photo2.png";
import post3 from "./img/photo3.png";
import post4 from "./img/photo4.png";
import post5 from "./img/photo5.png";
import post6 from "./img/photo6.png";

import "./porfilepage.scss";

export const Profilepage = () => {
    // const tabBtn =document.querySelectorAll('.tab');
    // const tabR = document.querySelectorAll('.tabShow');
    // function tabs(panelIndex){
    //     tabR.forEach(function(node){
    //         node.style.display = 'none';

    //     });
    //     tabR[panelIndex].style.display = 'block';

    // }
    // tabs(0);
    const tabBtn = document.querySelectorAll(".tab");
    const [tab, setTab] = React.useState(0);

    const [edit, setedit] = React.useState(false);

    const [profilePic, setprofilePic] = React.useState({});

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
                url: "http://localhost:8000/editProfilePic",
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

    return (
        <div className="ProfilepageComponent">
            <div
                className="EditForm shadow"
                style={{
                    display: edit ? "block" : "none",
                    height: "33rem",
                    width: "rem",
                    backgroundColor: "#fff",
                    borderRadius: "10px",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    zIndex: "999",
                    // overflowY:"scroll",
                    padding: "1rem",
                    // background:"#0000ff"
                    overflowX: "hidden",
                }}
            >
                {/* eddit00 */}
                <div className="edit-container">
                    <div className="leftbox">
                        <nav>
                            <a
                                onClick={() => {
                                    setTab(0);
                                }}
                                className="tab active"
                            >
                                <i className="fa fa-user"></i>
                            </a>
                            <a
                                onClick={() => {
                                    setTab(1);
                                }}
                                className="tab"
                            >
                                <i className="fa fa-camera"></i>
                            </a>
                            <a
                                onClick={() => {
                                    setTab(2);
                                }}
                                className="tab"
                            >
                                <i className="fa fa-address-card"></i>
                            </a>
                            <a
                                onClick={() => {
                                    setTab(3);
                                }}
                                className="tab"
                            >
                                <i class="fas fa-location"></i>
                            </a>
                            <a
                                onClick={() => {
                                    setTab(4);
                                }}
                                className="tab"
                            >
                                <i className="fa fa-cog"></i>
                            </a>
                        </nav>
                    </div>

                    <div className="rightbox">
                        {tab === 0 ? (
                            <div className="profile-edit tabShow">
                                <h1>Personal Info</h1>
                                <h2>Full Name</h2>
                                <input type="text" className="input" value="" />
                                <h2>Birthday</h2>
                                <input type="text" className="input" value="" />
                                <h2>email</h2>
                                <input type="text" className="input" value="" />
                                <h2>Password</h2>
                                <input
                                    type="password"
                                    className="input"
                                    value=""
                                />
                                <button className="btnU">Update</button>
                            </div>
                        ) : null}
                        {tab === 1 ? (
                            <form
                                className="camera-edit tabShow"
                                onSubmit={handleProfilePicSubmit}
                            >
                                <h1>Update Profile Pic</h1>
                                <h2>Profile Pic</h2>
                                <label for="myfile">Select a file:</label>
                                <input
                                    type="file"
                                    id="myfile"
                                    name="profilePic"
                                    onChange={editPictureHandler}
                                />
                                <h2>Cover Pic</h2>
                                <label for="myfile">Select a file:</label>
                                <input type="file" id="myfile" name="myfile" />
                                <button className="btnU">Update</button>
                            </form>
                        ) : null}
                        {tab === 2 ? (
                            <div className="profile-edit tabShow">
                                <h1>Intro</h1>
                                <h2>Say something</h2>
                                <input type="text" className="input" value="" />
                                <h2>Secondary school</h2>
                                <input type="text" className="input" value="" />
                                <h2>Primary school</h2>
                                <input type="text" className="input" value="" />

                                <button className="btnU">Update</button>
                            </div>
                        ) : null}
                        {tab === 3 ? (
                            <div className="profile-edit tabShow">
                                <h1>Location</h1>
                                <h2>Live Location</h2>
                                <input type="text" className="input" value="" />
                                <h2>Home town</h2>
                                <input type="text" className="input" value="" />
                                <button className="btnU">Update</button>
                            </div>
                        ) : null}

                        {tab === 4 ? (
                            <div className="profile-edit tabShow">
                                <h1>Personal Info</h1>
                                <h2>Full Name</h2>
                                <input type="text" className="input" value="" />
                                <h2>Birthday</h2>
                                <input type="text" className="input" value="" />
                                <h2>email</h2>
                                <input type="text" className="input" value="" />
                                <h2>Password</h2>
                                <input
                                    type="password"
                                    className="input"
                                    value=""
                                />
                                <button className="btnU">Update</button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
            <div className="profile-container">
                <img src={coverimg} alt="coverimg" className="cover-img" />
                <div className="profile-details mt-1">
                    <div className="pd-left mr-auto my-2">
                        <div className="pd-row">
                            <img
                                src={profileimg}
                                alt="profileimg"
                                className="pd-img"
                            />
                            <div>
                                <h3>Kranthi Kumar</h3>
                                <p>Student connection</p>
                                <img src={star} alt="star" />
                                <Button
                                    type="button"
                                    className="my-2 mx-2"
                                    onClick={() => {
                                        setedit(!edit);
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
                                <p className="intro-text">some comment</p>
                                <hr />
                                <ul>
                                    <li>
                                        <img src={job} alt="" /> student
                                    </li>
                                    <li>
                                        <img src={study} alt="" />
                                        studied in cmr clg
                                    </li>
                                    <li>
                                        <img src={study} alt="" />
                                        wnt to naryana king school
                                    </li>
                                    <li>
                                        <img src={home} alt="" />
                                        lives in hyder , indua
                                    </li>
                                    <li>
                                        <img src={location} alt="" />
                                        from africa
                                    </li>
                                </ul>
                            </div>
                            <div className="profile-intro">
                                <div className="title-box">
                                    <h3 style={{ marginLeft: "9px" }}>
                                        info & posts
                                    </h3>
                                    <a href="/" style={{ marginRight: "9px" }}>
                                        All photos
                                    </a>
                                </div>

                                <div className="postsbox">
                                    <img src={post1} alt="" />
                                    <img src={post2} alt="" />
                                    <img src={post3} alt="" />
                                    <img src={post4} alt="" />
                                    <img src={post5} alt="" />
                                    <img src={post6} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="profile-info1">
                        <div className="post-col">
                            <div className="write-post-container">
                                <div className="user-profile">
                                    <img src={pp} alt="" />
                                    <div>
                                        <p>Kranthi</p>
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
                                        <a href="/">
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
                            <div className="post-container">
                                <div className="post-row">
                                    <div className="user-profile">
                                        <img src={pp} alt="" />
                                        <div>
                                            <p>Kranthi</p>
                                            <span>June 24 2021, 13:40pm</span>
                                        </div>
                                    </div>
                                    {/* <a href="#"></a> */}
                                </div>

                                <p className="post-text">
                                    Lorem ipsum dolor, sit amet consectetur
                                    adipisicing elit. Consequatur suscipit
                                    dolorum a cupiditate illo reprehenderit non
                                    numquam velit nisi alias possimus sint
                                    natus, fugit soluta totam .
                                </p>
                                <img src={feed} alt="" className="post-img" />
                                <div className="post-row">
                                    <div className="activity-icons">
                                        <div>
                                            <img src={like} alt="" />
                                            120
                                        </div>
                                        <div>
                                            <img src={comment} alt="" />
                                            120
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
