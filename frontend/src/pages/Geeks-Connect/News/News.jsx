import React from "react";

import "antd/dist/antd.css";
import { Card, Row, Col } from "antd";
import "./News.scss";
import { CardGrid } from "./News.styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import NewsForm from "./NewsForm/NewsForm";
import axios from "axios";
import { BaseUrl } from "../../../constants";
import { useDispatch, useSelector } from "react-redux";

const { Meta } = Card;

const News = () => {
  const [visible, setVisible] = React.useState(false);
  const [currnews, setNews] = React.useState([]);
  const [getNews, setGetNews] = React.useState(false);
  const dispatch = useDispatch();
  const afterpost = (newNews) => {
    setVisible(false);
    setGetNews((pre) => {
      return !pre;
    });
  };
  const onclose = () => {
    setVisible(false);
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
          page: 1,
        });
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
        // console.log(response);
        if (response.data.success) {
          setNews(response.data.news);
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
                  <p className="mb-0 mt-2">posted on {ele.postedOn.split("T")[0]} {ele.postedOn.split("T")[1].split(".")[0]}</p>
                  <hr />
                  <p className="mb-2">
                    {
                      ele.description
                    }
                  </p>
                  <br />
                  <figure
                    className="text-end mt-2 mb-0"
                    style={{ marginBottom: "-2rem" }}
                  >
                    <figcaption class="blockquote-footer">
                      posted by {" "}
                      <cite title="Source Title">{ele.postedBy}</cite>
                    </figcaption>
                  </figure>
                </Card>
              );
            })}
          </CardGrid>
        </div>
      </div>
    </div>
  );
};

export default News;
