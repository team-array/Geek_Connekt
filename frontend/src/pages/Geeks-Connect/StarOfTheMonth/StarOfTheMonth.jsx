import React from "react";
import star from "../../../assets/star.png";
import axios from "axios";
import {BaseUrl} from '../../../constants';
import {useDispatch} from 'react-redux';
import moment from "moment"

const StarOfTheMonth = () => {
  const dispatch = useDispatch();
  const [starData, setStarData] = React.useState([{
    mostLiked:undefined,
    mostSaved:undefined,
  }]);

  React.useEffect(() => {
    try{
      dispatch({type: "SET_LOADING", payload: true});
      const getStarOfTheMonth = async () => {
        const response = await axios.post(`${BaseUrl}/getStarOfTheMonth`,{
          token: localStorage.getItem("jwt")
        });
        dispatch({type: "SET_LOADING", payload: false});
        if(response.data.success){
          console.log(response.data);
          let mostLiked = undefined;
          let mostSaved = undefined;
          if(response.data.star.mostLiked.mostLiked.id !==0 ){
            let post = response.data.star.mostLiked.mostLiked.id;
            let date = post.createdAt.split("T")[0];
            let time = post.createdAt.split("T")[1].split(".")[0];
            let month = parseInt(date.split("-")[1])-1;
            let day = parseInt(date.split("-")[2]);
            let year = parseInt(date.split("-")[0]);
            let hour = parseInt(time.split(":")[0]);
            let min = parseInt(time.split(":")[1]);
            let sec = parseInt(time.split(":")[2]);
            let m = moment([year, month, day, hour, min, sec]);
            let m1= moment([year,month])
            mostLiked = {...response.data.star.mostLiked.mostLiked.id,
              createdAt: m.format("MMMM Do YYYY, h:mm a"),
              likes: response.data.star.mostLiked.mostLiked.likes,
              month:m1.format("MMMM YYYY"),
            }
          }
          if(response.data.star.mostSaved.mostSaved.id !==0 ){
            let post1 = response.data.star.mostSaved.mostSaved.id;
            let date1 = post1.createdAt.split("T")[0];
            let time1 = post1.createdAt.split("T")[1].split(".")[0];
            let month1 = parseInt(date1.split("-")[1])-1;
            let day1 = parseInt(date1.split("-")[2]);
            let year1 = parseInt(date1.split("-")[0]);
            let hour1 = parseInt(time1.split(":")[0]);
            let min1 = parseInt(time1.split(":")[1]);
            let sec1 = parseInt(time1.split(":")[2]);
            let m2 = moment([year1, month1, day1, hour1, min1, sec1]);
            let m3= moment([year1,month1])
            mostSaved={...response.data.star.mostSaved.mostSaved.id,
              createdAt: m2.format("MMMM Do YYYY, h:mm a"),
              month:m3.format("MMMM YYYY"),
              saves: response.data.star.mostSaved.mostSaved.saves,
            }
          }
          setStarData([{
            mostLiked,
            mostSaved
        }]);
        }
      };
      getStarOfTheMonth();
    }catch(err){
      dispatch({type: "SET_LOADING", payload: false});
      console.log(err);
    }
  }, []);
  console.log(starData);
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
          {
            (starData[0].mostLiked!== undefined) ? 
            (
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
                      <img src={starData[0].mostLiked.profilePic} alt="" />
                      <div>
                        <p>{starData[0].mostLiked.user}</p>
                        <span>{starData[0].mostLiked.createdAt}</span>
                      </div>
                    </div>
                    {/* <a href="#"></a> */}
                  </div>

                  <p className="post-text">
                    {
                      starData[0].mostLiked.caption
                    }
                  </p>
                  <img src={starData[0].mostLiked.imageUrl} alt="" className="post-img" />
                  <div className="post-row">
                    <div className="activity-icons">
                      <div>
                        <p className="mt-3 text-muted" style={{fontWeight: 'bold'}}>Total number of likes in month of {starData[0].mostLiked.month} is {starData[0].mostLiked.likes}</p>
                      </div>
                    </div>
                    <div className="post-profile-icon">
                      <img src={starData[0].mostLiked.profilePic} alt="" />
                    </div>
                  </div>
                </div>
            )
            : null
          }
           {
            (starData[0].mostSaved!== undefined) ? 
            (
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
                    most Saved post
                </h4>
                  <div className="post-row">
                    <div className="user-profile">
                      <img src={starData[0].mostSaved.profilePic} alt="" />
                      <div>
                        <p>{starData[0].mostSaved.username}</p>
                        <span>{starData[0].mostSaved.createdAt}</span>
                      </div>
                    </div>
                    {/* <a href="#"></a> */}
                  </div>

                  <p className="post-text">
                    {
                      starData[0].mostSaved.caption
                    }
                  </p>
                  <img src={starData[0].mostSaved.imageUrl} alt="" className="post-img" />
                  <div className="post-row">
                    <div className="activity-icons">
                      <div>
                        <p className="mt-3 text-muted" style={{fontWeight: 'bold'}}>Total number of saves in month of {starData[0].mostSaved.month} is {starData[0].mostSaved.saves}</p>
                      </div>
                    </div>
                    <div className="post-profile-icon">
                      <img src={starData[0].mostSaved.profilePic} alt="" />
                    </div>
                  </div>
                </div>
            )
            : null
          }
      
        </div>
        <div style={{ height: "2.3rem" }}></div>
      </div>
    </div>
  );
};

export default StarOfTheMonth;