import React from "react";
import { useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { UtilityFormContainer } from "../../ProfessionalTools/UtilityForm/UtilityForm.style";
import { Form, Input, Button, notification } from "antd";
import "./NewsForm.scss";
import axios from "axios";
import { BaseUrl } from "../../../../constants";


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
/* eslint-enable no-template-curly-in-string */

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};

const openNotificationWithIcon = (noti) => {
  notification[noti.type]({
    message: noti.title,
    description: noti.message,
  });
};

const NewsForm = (props) => {
  const dispatch = useDispatch();
  const handleClose = () => {
        props.onclose();
  };
  const postNews = async (values) => {
    try {
        dispatch({
            type: "SET_LOADING",
            payload: true,
          });
        const response = await axios.post(`${BaseUrl}/addNews`, {...values,token:localStorage.getItem("jwt")});
        console.log(response);
        dispatch({
            type: "SET_LOADING",
            payload: false,
          });
        if(response.data.success){
            props.afterpost(response.data.news);
            openNotificationWithIcon({
                type: "success",
                title: "Success",
                message: "News added successfully",
            });
        }else{
            props.afterpost(null);
            openNotificationWithIcon({
                type: "error",
                title: "Error",
                message: response.data.message,
            });
        }
    } catch (err) {
        props.afterpost(null);
        dispatch({
            type: "SET_LOADING",
            payload: false,
          });
      console.log(err);
    }
  };
  return (
    <div className="NewsForm">
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: "9999999",
          backgroundColor: "rgba(0,0,0,.85)",
        }}
        open={true}
      >
        <IconButton
          aria-label="delete"
          sx={{
            position: "absolute",
            top: "15px",
            right: "15px",
            zIndex: "9999999",
          }}
          onClick={handleClose}
        >
          <CloseIcon
            style={{
              color: "#fff",
              zIndex: "9999999",
              fontSize: "35px",
            }}
          />
        </IconButton>
        <UtilityFormContainer>
          <Form
            {...layout}
            name="nest-messages"
            onFinish={postNews}
            validateMessages={validateMessages}
            style={{ width: "300px" }}
          >
            <Form.Item name={["title"]} rules={[{ required: true }]}>
              <Input placeholder="title" />
            </Form.Item>
            <Form.Item name={["description"]} rules={[{ required: true }]}>
              <Input.TextArea rows={4} placeholder="Description" />
            </Form.Item>
            <Form.Item
              wrapperCol={{ ...layout.wrapperCol }}
              style={{ margin: "auto", width: "max-content" }}
            >
              <Button type="primary" htmlType="submit">
                POST NEWS
              </Button>
            </Form.Item>
          </Form>
        </UtilityFormContainer>
      </Backdrop>
    </div>
  );
};

export default NewsForm;
