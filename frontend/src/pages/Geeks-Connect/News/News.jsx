import React from "react";

import "antd/dist/antd.css";
import { Card,Button,notification } from "antd";
import "./News.scss";
import { CardGrid } from "./News.styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NewsForm from "./NewsForm/NewsForm";
import axios from "axios";
import { BaseUrl } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

const { Meta } = Card;

const News = () => {
  const [visible, setVisible] = React.useState(false);
  const [currnews, setNews] = React.useState([]);
  const [getNews, setGetNews] = React.useState(false);
  const [totalresults, settotalresults] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const dispatch = useDispatch();
  const afterpost = (newNews) => {
    setVisible(false);
    setPage(1);
    setGetNews((pre) => {
      return !pre;
    });
  };
  const onclose = () => {
    setVisible(false);
  };
  const openNotificationWithIcon = (noti) => {
    notification[noti.type]({
      message: noti.title,
      description: noti.message,
    });
  };
  React.useEffect(() => {
    const newsget = async () => {
      try {
        dispatch({
          type: "SET_LOADING",
          payload: true,
        });
        const response = await axios.post(BaseUrl + "/getNews", {
          token: localStorage.getItem("jwt"),
          page,
        });
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
        // console.log(response);
        if (response.data.success) {
          settotalresults(0);
          setNews(response.data.news);
          setPage(page + 1);

        }
      } catch (err) {
        console.log(err);
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
      }
    };
    newsget();
  }, [getNews]);
  const fetchMoreData = async () => {
    try {
      dispatch({
        type: "SET_LOADING",
        payload: true,
      });
      const response = await axios.post(BaseUrl + "/getNews", {
        token: localStorage.getItem("jwt"),
        page,
      });
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
      if (response.data.success) {
        setPage(page + 1);
        settotalresults(currnews.length);
        setNews((prev) => {
          return [...prev, ...response.data.news];
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
  const deleteNews = async (id) => {
    try {
      dispatch({
        type: "SET_LOADING",
        payload: true,
      });
      const response = await axios.post(BaseUrl + "/deleteNews", {
        token: localStorage.getItem("jwt"),
        id,
      });
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
      if (response.data.success) {
        setPage(1);
        setGetNews((pre) => {
          return !pre;
        });
        openNotificationWithIcon({
          type: "success",
          title: "Success",
          message: "News deleted successfully",
      });
      }
      else{
        openNotificationWithIcon({
          type: "error",
          title: "Error",
          message: response.data.message,
      });
      }
    } catch (err) {
      console.log(err);
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
      openNotificationWithIcon({
        type: "error",
        title: "Error",
        message: "error in deleting news",
    });
    }
  };

  return (
    <div className="News">
      {visible ? <NewsForm afterpost={afterpost} onclose={onclose} /> : null}
      <div
        id="feature"
        className="block  featureBlock bgGray"
        style={{ padding: "0 100px" }}
      >
        <div className="container-fluid ">
          <div className="titleHolder">
            <h3
              className="text-center mb-4 text-uppercase"
              style={{
                marginTop: "6rem",
                fontFamily: "Helvetica",
                fontWeight: "550",
                width: "max-content",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
                paddingBottom: "7px",
                borderBottom: "3.4px solid #222",
                color: "#333",
              }}
            >
              NEWS CORNER
            </h3>
            <p></p>
          </div>
          <InfiniteScroll
            dataLength={currnews.length}
            next={fetchMoreData}
            hasMore={totalresults !== currnews.length}
          >
            <CardGrid className="NewsContainer">
              <Card
                hoverable
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Fab
                  color="primary"
                  style={{
                    position: "relative",
                    left: "50%",
                    transform: "translate(-50%,-25%)",
                  }}
                  onClick={() => setVisible(true)}
                  className="my-3"
                  aria-label="add"
                >
                  <AddIcon />
                </Fab>
              </Card>
              {currnews.map((ele, index) => {
                return (
                  <Card hoverable>
                    <Meta title={ele.title} />
                    <p className="mb-0 mt-2">
                      posted on {new Date(ele.postedOn).toString().split("GMT")[0]}
                    </p>
                    <hr />
                    <p className="mb-2">{ele.description}</p>
                    <br />
                    {
                      (JSON.parse(localStorage.getItem("user")).username===ele.postedBy)?(
                          <Button
                            type="default"
                            className="mb-2"
                            onClick={()=>deleteNews(ele._id)}
                          >
                            delete
                          </Button>
                      ):""
                    }
                    <figure
                      className="text-end mt-2 mb-0"
                      style={{ marginBottom: "-2rem" }}
                    >
                      <figcaption class="blockquote-footer">
                        posted by{" "}
                        <cite title="Source Title">{ele.postedBy}</cite>
                      </figcaption>
                    </figure>
                  </Card>
                );
              })}
            </CardGrid>
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default News;
