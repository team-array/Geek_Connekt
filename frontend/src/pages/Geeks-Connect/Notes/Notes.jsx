import React from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Radio } from "antd";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import { Card } from "antd";
import { Alert } from "antd";
import { Pagination } from 'antd';
import { PageHeader } from 'antd';
import { Input, Space } from 'antd';
import './Notes.css';

import { AudioOutlined } from '@ant-design/icons';

const { Search } = Input
const { Meta } = Card;

function App() {
  const onSearch = value => console.log(value);
  function itemRender(current, type, originalElement) {
    if (type === 'prev') {
      return <a>Previous</a>;
    }
    if (type === 'next') {
      return <a>Next</a>;
    }
    return originalElement;
  }
  return (
    <>
      <div
        id="feature"
        className="block featureBlock bgGray"
        style={{ padding: "0 100px" }}
      >
      
        <div className="container-fluid">
          <div className="titleHolder">
            <h2 style={{ marginBottom: "25px" }}>
            <PageHeader
            className="site-page-header"
            
            title="Pdf portal"
            subTitle="Powdeered by GC"
          />
          </h2>

          
          
          </div>

          <Row gutter={[16, 16]}>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
              <Card hoverable>
                <h3>Subject Name</h3>
                <hr />
                <Alert
                  style={{ margin: "16px 0" }}
                  message="Year unit name or topic"
                />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                  fugiat sint tempora cupiditate, voluptates quo earum
                  temporibus suscipit minima dolor iste. Hic reiciendis
                  consectetur assumenda necessitatibus atque doloremque adipisci
                  obcaecati?
                </p>
                <Button type="primary" icon={<DownloadOutlined />} size="large">
                  Download
                </Button>
              </Card>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
              <Card hoverable>
              <h3>Subject Name</h3>
              <hr />
              <Alert
                style={{ margin: "16px 0" }}
                message="Year unit name or topic"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                fugiat sint tempora cupiditate, voluptates quo earum
                temporibus suscipit minima dolor iste. Hic reiciendis
                consectetur assumenda necessitatibus atque doloremque adipisci
                obcaecati?
              </p>
              <Button type="primary" icon={<DownloadOutlined />} size="large">
                Download
              </Button>
              </Card>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
              <Card hoverable>
              <h3>Subject Name</h3>
              <hr />
              <Alert
                style={{ margin: "16px 0" }}
                message="Year unit name or topic"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                fugiat sint tempora cupiditate, voluptates quo earum
                temporibus suscipit minima dolor iste. Hic reiciendis
                consectetur assumenda necessitatibus atque doloremque adipisci
                obcaecati?
              </p>
              <Button type="primary" icon={<DownloadOutlined />} size="large">
                Download
              </Button>
              </Card>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
              <Card hoverable>
              <h3>Subject Name</h3>
              <hr />
              <Alert
                style={{ margin: "16px 0" }}
                message="Year unit name or topic"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                fugiat sint tempora cupiditate, voluptates quo earum
                temporibus suscipit minima dolor iste. Hic reiciendis
                consectetur assumenda necessitatibus atque doloremque adipisci
                obcaecati?
              </p>
              <Button type="primary" icon={<DownloadOutlined />} size="large">
                Download
              </Button>
              </Card>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
              <Card hoverable>
              <h3>Subject Name</h3>
              <hr />
              <Alert
                style={{ margin: "16px 0" }}
                message="Year unit name or topic"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                fugiat sint tempora cupiditate, voluptates quo earum
                temporibus suscipit minima dolor iste. Hic reiciendis
                consectetur assumenda necessitatibus atque doloremque adipisci
                obcaecati?
              </p>
              <Button type="primary" icon={<DownloadOutlined />} size="large">
                Download
              </Button>
              </Card>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
              <Card hoverable>
              <h3>Subject Name</h3>
              <hr />
              <Alert
                style={{ margin: "16px 0" }}
                message="Year unit name or topic"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                fugiat sint tempora cupiditate, voluptates quo earum
                temporibus suscipit minima dolor iste. Hic reiciendis
                consectetur assumenda necessitatibus atque doloremque adipisci
                obcaecati?
              </p>
              <Button type="primary" icon={<DownloadOutlined />} size="large">
                Download
              </Button>
              </Card>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
              <Card hoverable>
              <h3>Subject Name</h3>
              <hr />
              <Alert
                style={{ margin: "16px 0" }}
                message="Year unit name or topic"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                fugiat sint tempora cupiditate, voluptates quo earum
                temporibus suscipit minima dolor iste. Hic reiciendis
                consectetur assumenda necessitatibus atque doloremque adipisci
                obcaecati?
              </p>
              <Button type="primary" icon={<DownloadOutlined />} size="large">
                Download
              </Button>
              </Card>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
              <Card hoverable>
              <h3>Subject Name</h3>
              <hr />
              <Alert
                style={{ margin: "16px 0" }}
                message="Year unit name or topic"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                fugiat sint tempora cupiditate, voluptates quo earum
                temporibus suscipit minima dolor iste. Hic reiciendis
                consectetur assumenda necessitatibus atque doloremque adipisci
                obcaecati?
              </p>
              <Button type="primary" icon={<DownloadOutlined />} size="large">
                Download
              </Button>
              </Card>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
              <Card hoverable>
              <h3>Subject Name</h3>
              <hr />
              <Alert
                style={{ margin: "16px 0" }}
                message="Year unit name or topic"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                fugiat sint tempora cupiditate, voluptates quo earum
                temporibus suscipit minima dolor iste. Hic reiciendis
                consectetur assumenda necessitatibus atque doloremque adipisci
                obcaecati?
              </p>
              <Button type="primary" icon={<DownloadOutlined />} size="large">
                Download
              </Button>
              </Card>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
              <Card hoverable>
              <h3>Subject Name</h3>
              <hr />
              <Alert
                style={{ margin: "16px 0" }}
                message="Year unit name or topic"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                fugiat sint tempora cupiditate, voluptates quo earum
                temporibus suscipit minima dolor iste. Hic reiciendis
                consectetur assumenda necessitatibus atque doloremque adipisci
                obcaecati?
              </p>
              <Button type="primary" icon={<DownloadOutlined />} size="large">
                Download
              </Button>
              </Card>
            </Col>
            <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
              <Card hoverable>
              <h3>Subject Name</h3>
              <hr />
              <Alert
                style={{ margin: "16px 0" }}
                message="Year unit name or topic"
              />
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                fugiat sint tempora cupiditate, voluptates quo earum
                temporibus suscipit minima dolor iste. Hic reiciendis
                consectetur assumenda necessitatibus atque doloremque adipisci
                obcaecati?
              </p>
              <Button type="primary" icon={<DownloadOutlined />} size="large">
                Download
              </Button>
              </Card>
            </Col>
            <Pagination total={500} itemRender={itemRender} style={{marginTop:"25px",marginBottom:"25px"}} />
          </Row>
        </div>
      </div>
      
    </>
  );
}

export default App;
