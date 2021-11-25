import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AddPostContainer } from "../../AddPost/AddPost.styles";
import { Form, Input, Button, DatePicker } from "antd";
import "./EventsForm.scss";

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

const config = {
  rules: [
    {
      type: "object",
      required: true,
      message: "Please select time!",
    },
  ],
};

const AddEvents = () => {
  const AddEvents = useSelector((state) => state.AddEvents);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({ type: "SET_ADD_EVENTS", payload: false });
  };
  const onFinish = (values) => {
    console.log(values);
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
              name={["name"]}
              label="event title"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={["subTitle"]} label="event sub title">
              <Input />
            </Form.Item>
            <Form.Item label="Event date" name={["date"]} >
              <input type="date" className="ant-input" />             
            </Form.Item>
            <Form.Item
              name={["website"]}
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
              name={["Description"]}
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
