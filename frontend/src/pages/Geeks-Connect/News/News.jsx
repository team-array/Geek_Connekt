import React from "react";

import "antd/dist/antd.css";
import { Card, Row, Col } from "antd";
import "./News.scss";
import {CardGrid,UtilityAddCard} from "./News.styles";


const { Meta } = Card;

const News = () => {
  return (
    <div className="News">
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
              <Card hoverable >
                <Meta title="News" />
                <p className="mb-0 mt-2">
                  posted on 2020-10-11
                </p>
                <hr />
                <p className="mb-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  fugiat sint tempora cupiditate, voluptates quo earum
                  temporibus suscipit minima dolor iste. Hic reiciendis
                  consectetur assumenda necessitatibus atque doloremque adipisci
                  obcaecati?
                </p>
                <br/>
                <figure className="text-end mt-2 mb-0" style={{marginBottom:"-2rem"}}>
                  <figcaption class="blockquote-footer">
                    Someone famous in{" "}
                    <cite title="Source Title">Source Title</cite>
                  </figcaption>
                </figure>
              </Card>
              <Card hoverable >
                <Meta title="News" />
                <p className="mb-0 mt-2">
                  posted on 2020-10-11
                </p>
                <hr />
                <p className="mb-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  fugiat sint tempora cupiditate, voluptates quo earum
                  temporibus suscipit minima dolor iste. Hic reiciendis
                  consectetur assumenda necessitatibus atque doloremque adipisci
                  obcaecati?
                </p>
                <br/>
                <figure className="text-end mt-2 mb-0" style={{marginBottom:"-2rem"}}>
                  <figcaption class="blockquote-footer">
                    Someone famous in{" "}
                    <cite title="Source Title">Source Title</cite>
                  </figcaption>
                </figure>
              </Card>
              <Card hoverable >
                <Meta title="News" />
                <p className="mb-0 mt-2">
                  posted on 2020-10-11
                </p>
                <hr />
                <p className="mb-2">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  fugiat sint tempora cupiditate, voluptates quo earum
                  temporibus suscipit minima dolor iste. Hic reiciendis
                  consectetur assumenda necessitatibus atque doloremque adipisci
                  obcaecati?
                </p>
                <br/>
                <figure className="text-end mt-2 mb-0" style={{marginBottom:"-2rem"}}>
                  <figcaption class="blockquote-footer">
                    Someone famous in{" "}
                    <cite title="Source Title">Source Title</cite>
                  </figcaption>
                </figure>
              </Card>
          </CardGrid>
        </div>
      </div>
    </div>
  );
};

export default News;
