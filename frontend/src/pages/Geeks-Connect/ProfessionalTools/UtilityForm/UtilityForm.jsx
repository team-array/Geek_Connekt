import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { UtilityFormContainer } from "./UtilityForm.style";
import { Form, Input, Button } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import "./UtilityForm.scss";
import axios from "axios";
import {BaseUrl} from "../../../../constants";
import { notification, Space } from 'antd';

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


const openNotificationWithIcon = noti => {
  notification[noti.type]({
    message: noti.title,
    description:
    noti.message,
  });
};

const UtilityForm = () => {
  const dispatch = useDispatch();
  const reloadUtilities = useSelector((state) => state.reloadUtilities);
  const onFinish = async (values) => {
    console.log(values);
    try{

      dispatch({ type: "SET_LOADING", payload: true });
      dispatch({type:"SET_ADD_UTILITY",payload:false});
      const response = await axios.post(BaseUrl+"/addutility", {...values,token:localStorage.getItem("jwt")});
      dispatch({ type: "SET_LOADING", payload: false });
      if(response.data.success){
        dispatch({type:"SET_RELOAD_UTILITIES",payload:!reloadUtilities});
        openNotificationWithIcon({ 
          type:'success',
          title:'Utility Added',
          message:response.data.message +". Please refresh the page to see the changes."
        });
      }else{
        openNotificationWithIcon({
          type:'error',
          title:'Utility Not Added',
          message:response.data.message
        });
      }
    }catch(err){
      console.log(err);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  const AddUtility = useSelector((state) => state.AddUtility);
  const handleClose = () => {
    dispatch({
      type: "SET_ADD_UTILITY",
      payload: false,
    });
  };
  return (
    <div className="UtilityForm">
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: "9999999",
          backgroundColor: "rgba(0,0,0,.85)",
        }}
        open={AddUtility}
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
            onFinish={onFinish}
            style={{
              padding: "50px",
              overflowY: "scroll",
              margin: "0 auto",
            }}
            validateMessages={validateMessages}
          >
            <Form.Item
              name={["title"]}
              rules={[{ required: true }]}
              style={{ width: "100%"}}
            >
              <Input placeholder="title"

              />
            </Form.Item>
            <Form.Item
              name={["websitelink"]}
              rules={[
                { type: "url", warningOnly: true },
                { type: "string", min: 6 },
              ]}
            >
              <Input placeholder="websitelink"/>
            </Form.Item>
            <Form.Item
              name={["description"]}
              rules={[{ required: true }]}
            >
              <Input.TextArea placeholder="Description"/>
            </Form.Item>
            <Form.List
              name="features"
                style={{
                    width: "100%",
                }}
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 1) {
                      return Promise.reject(new Error("At least 1 feature"));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item
                      {...(index === 0
                        ? formItemLayoutWithOutLabel
                        : formItemLayoutWithOutLabel)}
                      required={false}
                      key={field.key}
                      style={{ width: "100%!important"}}
                    >
                      <Form.Item
                        {...field}
                        validateTrigger={["onChange", "onBlur"]}
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message:
                              "Please input feature name or delete this field.",
                          },
                        ]}
                        noStyle
                      >
                        <Input
                          placeholder="feature"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                      {fields.length >=1 ? (
                        <MinusCircleOutlined
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                        />
                      ) : null}
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      style={{ width: "100%" }}
                      icon={<PlusOutlined />}
                      
                    >
                      Add feature
                    </Button>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add("The head item", 0);
                      }}
                      style={{ width: "100%", marginTop: "20px" }}
                      icon={<PlusOutlined />}
                    >
                      Add feature at head
                    </Button>
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>

            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Add Utility
              </Button>
            </Form.Item>
          </Form>
        </UtilityFormContainer>
      </Backdrop>
    </div>
  );
};

export default UtilityForm;
