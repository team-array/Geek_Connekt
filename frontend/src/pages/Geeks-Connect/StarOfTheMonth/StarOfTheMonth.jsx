import React from "react";
import pp from "../Profile/components/img/profile-pic.png";
import like from "../Profile/components/img/like-blue.png";
import comment from "../Profile/components/img/comments.png";
import share from "../Profile/components/img/share.png";
import feed from "../Profile/components/img/feed-image-1.png";
import star from "../../../assets/star.png";

const StarOfTheMonth = () => {
  return (
    <div className="StarOfTheMonth">
      <h3
        className="text-center text-uppercase"
        style={{
          marginTop: "6rem",
          fontFamily: "Helvetica",
          fontWeight: "550",
          width: "max-content",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          paddingBottom: "7px",
          color: "#333",
          marginBottom: -10,
        }}
      >
        <img
          src={star}
          alt="star"
          style={{ width: "30px", height: "30px", marginBottom: "0.6rem" }}
        />{" "}
        &nbsp; Star Of The Month &nbsp;{" "}
        <img src={star} alt="star" style={{ width: "30px", height: "30px" }} />
      </h3>
      <div className="feed-container mt-0">
        <div className="Feed mt-5">
          <div className="post-container mb-5 card mx-auto shadow-sm">
          <h4
            className="text-center text-uppercase"
            style={{
              margin: "0rem auto 1.3rem auto",
              fontFamily: "Helvetica",
              fontWeight: "550",
              width: "max-content",
              display: "block",
              paddingBottom: "7px",
              //   borderBottom: "3.4px solid #222",
              color: "#333",
            }}
          >
              most liked post
          </h4>
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
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Consequatur suscipit dolorum a cupiditate illo reprehenderit non
              numquam velit nisi alias possimus sint natus, fugit soluta totam .
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
          <div className="post-container mb-5 card mx-auto shadow-sm">
          <h4
            className="text-center text-uppercase"
            style={{
              margin: "0rem auto 1.3rem auto",
              fontFamily: "Helvetica",
              fontWeight: "550",
              width: "max-content",
              display: "block",
              paddingBottom: "7px",
              //   borderBottom: "3.4px solid #222",
              color: "#333",
            }}
          >
              most saved post
          </h4>
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
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Consequatur suscipit dolorum a cupiditate illo reprehenderit non
              numquam velit nisi alias possimus sint natus, fugit soluta totam .
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
        <div style={{ height: "2.3rem" }}></div>
      </div>
    </div>
  );
};

export default StarOfTheMonth;