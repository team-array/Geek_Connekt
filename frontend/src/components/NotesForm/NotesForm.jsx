import React from "react";
import { useDispatch } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { UtilityFormContainer } from "../../pages/Geeks-Connect/ProfessionalTools/UtilityForm/UtilityForm.style";
import { Form, Input, Button, notification } from "antd";
import "./NotesForm.scss";
import axios from "axios";
import { BaseUrl } from "../../constants";
import MButton from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ClientUrl } from "../../constants";
import Preview from "../../pages/PreviewPdf/PreviewPdf";

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
  const [prev, setprev] = React.useState(false);
  const navigate = useNavigate();
  const [pdf, setpdf] = React.useState(null);
  const handleClose = () => {
    if(prev){
      setprev(false);
    }else{
      props.onclose();
    }
  };
  const postNews = async (values) => {
    try {
      dispatch({
        type: "SET_LOADING",
        payload: true,
      });
      const formData = new FormData();
      formData.append("subject", values.subject);
      formData.append("description", values.description);
      formData.append("file", pdf);
      formData.append("topicName", values.topicName);
      formData.append("token", localStorage.getItem("jwt"));
      console.log(formData);
      const response = await axios({
        method: "POST",
        url: `${BaseUrl}/uploadNotes`,
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      props.onclose();
      dispatch({
        type: "SET_LOADING",
        payload: false,
      });
      if (response.data.success) {
        props.afterpost(response.data.newNote);
        openNotificationWithIcon({
          type: "success",
          title: "Success",
          message: "Notes uploaded successfully",
        });
      } else {
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
  console.log(pdf);
  return (
    <div className="NotesForm" style={{
      overflow:(prev)?"scroll":""
    }}>
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
          {prev ? (
            <>
              <Preview />
              <MButton
                variant="contained"
                component="label"
                style={{
                  position: "absolute",
                  bottom: "25px",
                  marginLeft: "10px",
                }}
                onClick={() => setprev(false)}
                >
                Close Preview
              </MButton>
            </>
          ) : (
            <UtilityFormContainer>
            <Form
              {...layout}
              name="nest-messages"
              onFinish={postNews}
              validateMessages={validateMessages}
              style={{ width: "300px" }}
            >
              <Form.Item name={["subject"]} rules={[{ required: true }]}>
                <Input placeholder="subject" />
              </Form.Item>
              <Form.Item name={["topicName"]} rules={[{ required: true }]}>
                <Input placeholder="topicName" />
              </Form.Item>
              <Form.Item name={["description"]} rules={[{ required: true }]}>
                <Input.TextArea rows={4} placeholder="Description" />
              </Form.Item>
              <Form.Item
                wrapperCol={{ ...layout.wrapperCol }}
                style={{ margin: "auto", width: "max-content" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "space-around",
                    alignItems: "center",
                    margin: "0px auto 20px auto",
                    width: "max-content",
                  }}
                >
                  <input
                    accept=".pdf"
                    style={{ display: "none" }}
                    id="raised-button-file"
                    type="file"
                    onChange={(e) => {
                      setpdf(e.target.files[0]);
                    }}
                  />
                  <label htmlFor="raised-button-file">
                    <MButton
                      variant="raised"
                      component="span"
                      variant="outlined"
                    >
                      Upload Pdf
                    </MButton>
                  </label>
                  {pdf != null ? (
                    <MButton
                      variant="outlined"
                      component="label"
                      style={{
                        marginLeft: "10px",
                      }}
                      onClick={async () => {
                        let src = await new Promise((resolve) => {
                          const reader = new FileReader();
                          reader.readAsDataURL(pdf);
                          reader.onload = () => resolve(reader.result);
                        });
                        dispatch({
                          type: "SET_PDF_FILE",
                          payload: src,
                        });
                        setprev(true);
                      }}
                    >
                      Preview pdf
                    </MButton>
                  ) : (
                    ""
                  )}
                </div>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                  }}
                >
                  Upload
                </Button>
              </Form.Item>
            </Form>
          </UtilityFormContainer>
          )}
      </Backdrop>
    </div>
  );
};

export default NewsForm;
