import React from 'react'
import coverimg from './img/cover.png'
import profileimg from './img/profile.png'
import star from './img/star.jfif'
import micon from './img/message.png'
import info from './img/info.jfif'
import pp from './img/profile-pic.png'
import live from './img/live-video.png'
import photo from './img/photo.png'
import feeling from './img/feeling.png'
import feed from './img/feed-image-1.png'
import like from './img/like-blue.png'
import comment from './img/comments.png'
import share from './img/share.png'
import job from './img/profile-job.png'
import study from './img/profile-study.png'
import home from './img/profile-home.png'
import location from './img/profile-location.png'
import { Button } from 'antd';


import post1 from './img/photo1.png'
import post2 from './img/photo2.png'
import post3 from './img/photo3.png'
import post4 from './img/photo4.png'
import post5 from './img/photo5.png'
import post6 from './img/photo6.png'


import './porfilepage.scss';

export const Profilepage = () => {
    const [edit,setedit] = React.useState(false);
    return (
        <div className="ProfilepageComponent">
            <div className="EditForm shadow" 
                style={{
                    display:(edit)?"block":"none",
                    height:"20rem",
                    width:"50rem",
                    backgroundColor:"#fff",
                    borderRadius:"10px",
                    position:"absolute",
                    top:"50%",
                    left:"50%",
                    transform:"translate(-50%,-50%)",
                    zIndex:"999",
                    overflowY:"scroll",
                    padding:"1rem",

                }}>

            </div>
            <div className="profile-container">
                <img src={coverimg} alt="coverimg" className="cover-img"/>
                <div className="profile-details mt-1">
                    <div className="pd-left mr-auto my-2">
                        <div className="pd-row">
                            <img src={profileimg} alt="profileimg" className="pd-img"/>
                            <div>
                            <h3>Kranthi Kumar</h3>
                            <p>Student connection</p>
                            <img src={star} alt="star" />
                            <Button type="button" className="my-2 mx-2" onClick={()=>{
                                setedit(!edit);
                            }}>Edit profile</Button>
                        </div>
                    </div>
                </div>
                <div className="pd-right my-3 mb-0 ml-auto" style={{width:"max-content"}}>
                    <Button type="button" className="mb-3">
                    <img src={info} alt="" />Informative</Button>
                    <Button type="button">
                        <img src={micon} alt="" />
                        message &nbsp; </Button>

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
                            <li><img src={job} alt="" />  student</li>
                            <li><img src={study} alt="" />studied in cmr clg</li>
                            <li><img src={study} alt="" />wnt to naryana king school</li>
                            <li><img src={home} alt="" />lives in hyder , indua</li>
                            <li><img src={location} alt="" />from africa</li>
                        </ul>

                        </div>
                        <div className="profile-intro">
                            <div className="title-box">
                            <h3 style={{marginLeft:"9px"}}
                            >info & posts</h3>
                            <a href="/" style={{marginRight:"9px"}}>All photos</a>
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
                                    <small>Public<i class="fas fa-caret-down"></i></small>
                                </div>
                            </div>
                            <div className="post-input-container">
                                <textarea row="3" placeholder="Write a post..."></textarea>
                                <div className="add-post-links">
                                    <a href="/"><img src={live} alt="" />Live Video</a>
                                    <a href="/"><img src={photo} alt="" />Photo/Video</a>
                                    <a href="/"><img src={feeling} alt="" />Feeling</a>
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
                    
                   
                     <p className="post-text">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur suscipit dolorum a cupiditate illo reprehenderit non numquam velit nisi alias possimus sint natus, fugit soluta totam .</p>
                     <img src={feed} alt="" className="post-img"/>
                     <div className="post-row">
                        <div className="activity-icons">
                            <div>
                                <img src={like} alt="" />120
                            </div>
                            <div>
                                <img src={comment} alt="" />120
                            </div>
                            <div>
                                <img src={share} alt="" />120
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
    )
}
