import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AddPostContainer } from "../../AddPost/AddPost.styles";
import { Form, Input, Button } from "antd";
import "./EventsForm.scss";
import axios from "axios";
import { BaseUrl } from "../../../../constants";
import { notification } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
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

// const config = {
//   rules: [
//     {
//       type: "object",
//       required: true,
//       message: "Please select time!",
//     },
//   ],
// };

const AddEvents = () => {
  const AddEvents = useSelector((state) => state.AddEvents);
  const dispatch = useDispatch();
  const reloadEvents = useSelector((state) => state.reloadEvents);
  const handleClose = () => {
    dispatch({ type: "SET_ADD_EVENTS", payload: false });
  };
  const openNotification = () => {
    notification.open({
      message: 'Event Added Successfully',
      description:
        'You can view the event in the events page.If not updated please refresh the page.',
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };
  
  const onFinish = async (values) => {
    console.log("Success:", values);
    dispatch({ type: "SET_LOADING", payload: true });
    try{
      const response = await axios({
        method: "post",
        url: `${BaseUrl}/addEvents`,
        data: {
          ...values,
          token: localStorage.getItem("jwt")
        },
        headers: {
          "Content-Type": "application/json",
        },
      });
      dispatch({ type: "SET_LOADING", payload: false });
      if (response.data.success) {
        dispatch({ type: "SET_RELOAD_EVENTS", payload: !reloadEvents });
        dispatch({ type: "SET_ADD_EVENTS", payload: false });
        openNotification();
      }
    }catch(err){
      dispatch({ type: "SET_LOADING", payload: false });
      console.log(err);
    }
  };
  return AddEvents ? (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: "9999999",
          backgroundColor: "rgba(0,0,0,.85)",
        }}
        open={AddEvents}
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
            style={{ color: "#fff", zIndex: "9999999", fontSize: "35px" }}
          />
        </IconButton>
        <AddPostContainer
        >
          <Form
            className="EventsForm"
            {...layout}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["EventName"]}
              label="event title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={["EventSubtitle"]} label="event sub title">
              <Input />
            </Form.Item>
            <Form.Item label="Event date" name={["EventDate"]} >
              <input type="date" className="ant-input" />             
            </Form.Item>
            <Form.Item
              name={["EventLink"]}
              rules={[
                {
                  type: "url",
                  warningOnly: true,
                },
                {
                  type: "string",
                  min: 6,
                },
              ]}
              label="Website link"
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={["EventDescription"]}
              label="Description"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Add
              </Button>
            </Form.Item>
          </Form>
        </AddPostContainer>
      </Backdrop>
    </div>
  ) : (
    ""
  );
};

export default AddEvents;
