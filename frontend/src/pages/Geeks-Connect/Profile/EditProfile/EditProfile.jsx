import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import { AddPostContainer } from "../../AddPost/AddPost.styles";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import PersonIcon from "@mui/icons-material/Person";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import SchoolIcon from "@mui/icons-material/School";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import { Form, Input, InputNumber, Button } from "antd";
import ImgCrop from "antd-img-crop";
import { Upload } from "antd";
import "./EditProfile.scss";
import { message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { gql, useMutation } from "@apollo/client";
import axios from "axios";
import MButton from "@mui/material/Button"
import {BaseUrl} from "../../../../constants"

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-enable no-template-curly-in-string */

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

const fileprops = {
  name: "file",
  action: "",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const EDIT_PERSONAL_INFO = gql`
  mutation editUser(
    $token: String!
    $username: String!
    $email: String!
    $birthDate: String!
    $website: String!
  ) {
    editUser(
      token: $token
      username: $username
      email: $email
      birthDate: $birthDate
      website: $website
    ) {
      token
      result
    }
  }
`;

const EditProfile = () => {
  const EditProfile = useSelector((state) => state.EditProfile);
  const [fileList, setFileList] = React.useState([]);
  const [value, setValue] = React.useState(0);
  const [editUserResult, setEditUserResult] = React.useState("");
  const [editUserErrorInfo, setEditUserErrorInfo] = React.useState("");
  const editUserDataRedux = useSelector((state) => state.UserData.userData);
  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("Edit Profile data:", editUserDataRedux);
  }, [EditProfile, editUserDataRedux]);

  const [
    editUserPersonalInfo,
    { data: editUserData, loading: editUserLoading, error: editUserError },
  ] = useMutation(EDIT_PERSONAL_INFO);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    dispatch({ type: "SET_EDIT_PROFILE", payload: false });
  };
  const updatePersonalInfo = async (values) => {
    const userToken = localStorage.getItem("jwt");
    console.log("UpdatePersnoalInfo: ", values);
    editUserPersonalInfo({
      variables: {
        token: userToken,
        username: values.name || "",
        email: values.email || "",
        birthDate: values.date || "",
        website: values.website || "",
      },
    });
    alert("Personal Info Updated");
    window.location.reload();
  };

  useEffect(() => {
    if (!editUserLoading) {
      if (editUserData) {
        setEditUserResult(editUserData.editUser.result);
      }
      if (editUserError) {
        setEditUserErrorInfo(editUserError.message);
      }
    }
  }, [editUserLoading]);

  const updateSchoolInfo = async (values) => {
    try{
      console.log(values);
      dispatch({ type: "SET_LOADING", payload: true});
      const response = await axios({
        method: "post",
        url: BaseUrl+"/updateSchoolInfo",
        data: {
          primarySchool: values.primary,
          secondarySchool: values.secondary,
          bio: values.bio,
          token: localStorage.getItem("jwt"),
        }
      });
      console.log("UpdateSchoolInfo: ", response);
      dispatch({ type: "SET_LOADING", payload: false});
      alert("School Info Updated");
      window.location.reload();
    }catch(err){
      console.log(err);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  const updateLiveLocationInfo = async (values) => {
    try{
      console.log(values);
      dispatch({ type: "SET_LOADING", payload: true});
      const response = await axios({
        method: "post",
        url: BaseUrl+"/updateLocationInfo",
        data: {
          hometown: values.hometown,
          location: values.location,
          token: localStorage.getItem("jwt"),
        }
      });
      console.log("updateLocationInfo: ", response);
      dispatch({ type: "SET_LOADING", payload: false});
      alert("Location Info Updated");
      window.location.reload();
    }catch(err){
      console.log(err);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  const onPreview = async (file) => {
    let src = file.url;
    console.log(src);
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    console.log(src);
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);

    if (imgWindow) {
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };
  const uploadProfilePic = async ({ onSuccess, onError, file }) => {
    const checkInfo = async () => {
      setTimeout(async () => {
        try {
          dispatch({ type: "SET_LOADING", payload: true });
          const formData = new FormData();
          formData.append("image", file);
          formData.append("token", localStorage.getItem("jwt"));
          const response = await axios({
            method: "POST",
            url: BaseUrl+"/editProfilePic",
            headers: {
              "content-type": "multipart/form-data",
            },
            data: formData,
          });
          console.log(response);
          dispatch({ type: "SET_LOADING", payload: false });
          alert(response.data.message);
          onSuccess(null, file);
          window.location.reload();
        } catch (error) {
          console.log(error);
          dispatch({ type: "SET_LOADING", payload: false });
          onError();
        }
      }, 100);
    };
    checkInfo();
  };
  const changePassword = (values) => {
    console.log(values);
  }
  const uploadCoverPic = async (e) => {
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const formData = new FormData();
      formData.append("image", e.target.files[0]);
      formData.append("token", localStorage.getItem("jwt"));
      const response = await axios({
        method: "POST",
        url: BaseUrl+"/editBackgroundPic",
        headers: {
          "content-type": "multipart/form-data",
        },
        data: formData,
      });
      console.log(response);
      dispatch({ type: "SET_LOADING", payload: false });
      alert(response.data.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };
  return (
    <div>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: "9999999",
          backgroundColor: "rgba(0,0,0,.85)",
        }}
        open={EditProfile}
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
        <AddPostContainer>
          <Box
            sx={{
              flexGrow: 1,
              bgcolor: "background.paper",
              display: "flex",
              //   height: 224,
              width: "100%",
              marginLeft: "-2rem",
              padding: 0,
            }}
          >
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{
                borderRight: 1,
                borderColor: "divider",
                width: "110px",
              }}
            >
              <Tab className="mb-2" label={<PersonIcon />} {...a11yProps(0)} />
              <Tab
                className="mb-2"
                label={<CameraAltIcon />}
                {...a11yProps(1)}
              />
              <Tab className="mb-2" label={<SchoolIcon />} {...a11yProps(2)} />
              <Tab
                className="mb-2"
                label={<LocationOnIcon />}
                {...a11yProps(3)}
              />
              <Tab
                className="mb-2"
                label={<SettingsIcon />}
                {...a11yProps(4)}
              />
            </Tabs>
            <TabPanel style={{ width: "100%" }} value={value} index={0}>
              <Form
                {...layout}
                className="mx-auto "
                style={{ width: "max-content" }}
                name="nest-messages"
                onFinish={updatePersonalInfo}
                validateMessages={validateMessages}
              >
                {/* <p>{editUserDataRedux.username}</p> */}
                <Form.Item name={["name"]}>
                  <Input
                    placeholder="full name"
                    defaultValue={
                      editUserDataRedux !== undefined
                        ? editUserDataRedux.username
                        : ""
                    }
                  />
                </Form.Item>
                <Form.Item
                  name={["email"]}
                  rules={[
                    {
                      type: "email",
                    },
                  ]}
                >
                  <Input placeholder="email id" />
                </Form.Item>
                {/* <Form.Item
                                    name={["age"]}
                                    rules={[
                                        {
                                            type: "number",
                                            min: 0,
                                            max: 99,
                                        },
                                    ]}
                                >
                                    <InputNumber placeholder="your age" />
                                </Form.Item> */}
                <Form.Item
                  name="website"
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
                >
                  <Input placeholder="website url" />
                </Form.Item>
                <Form.Item name={["date"]}>
                  <input
                    type="date"
                    className="ant-input"
                    placeholder="Birthday"
                  />
                </Form.Item>
                {/* <Form.Item name={["user", "introduction"]} label="Introduction">
                  <Input.TextArea />
                </Form.Item> */}
                {editUserResult !== "" ? <p>{editUserResult}</p> : null}
                {editUserErrorInfo !== "" ? <p>{editUserErrorInfo}</p> : null}
                <Form.Item
                  wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 0,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    update
                  </Button>
                </Form.Item>
              </Form>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <ImgCrop
                grid={true}
                shape={"round"}
                rotate={true}
                maxZoom={5}
                // cropSize={{
                //   width: 600,
                //   height: 600,
                // }}
                modalWidth={700}
                modalTitle="Crop Image"
                // onModalOk={uploadProfilePic}
                showUploadList={false}
              >
                <Upload
                  customRequest={uploadProfilePic}
                  fileList={fileList}
                  onChange={null}
                  onClick={async () => {
                    dispatch({
                      type: "SET_EDIT_PROFILE",
                      payload: false,
                    });
                    console.log(fileList);
                  }}
                >
                  + Upload Profile Pic
                </Upload>
              </ImgCrop>
              <br />
              <div>
              <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="raised-button-file"
                    multiple
                    type="file"
                    onChange={uploadCoverPic}
                />
                <label htmlFor="raised-button-file">
                <MButton variant="raised" style={{color:"#000"}} component="span">
                    Upload Cover Pic
                </MButton>
                </label> 
              </div>
            </TabPanel>
            <TabPanel
              className="px-4"
              style={{ width: "100%" }}
              value={value}
              index={2}
            >
              <Form
                // style={{ width: "max-content" }}
                {...layout}
                name="nest-messages"
                onFinish={updateSchoolInfo}
                validateMessages={validateMessages}
              >
                <Form.Item name={["primary"]}>
                  <Input placeholder="primary schooling" />
                </Form.Item>
                <Form.Item name={["secondary"]}>
                  <Input placeholder="secondary schooling" />
                </Form.Item>
                <Form.Item name={["bio"]}>
                  <Input.TextArea placeholder="bio" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    update
                  </Button>
                </Form.Item>
              </Form>
            </TabPanel>
            <TabPanel
              className="px-4"
              style={{ width: "100%" }}
              value={value}
              index={3}
            >
              <Form
                {...layout}
                name="nest-messages"
                onFinish={updateLiveLocationInfo}
                validateMessages={validateMessages}
              >
                <Form.Item name={["location"]}>
                  <Input placeholder="Country" />
                </Form.Item>
                <Form.Item name={["hometown"]}>
                  <Input placeholder="home town" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    update
                  </Button>
                </Form.Item>
              </Form>
            </TabPanel>
            <TabPanel
              className="px-4"
              style={{ width: "100%" }}
              value={value}
              index={4}
            >
              <Form
                {...layout}
                name="nest-messages"
                onFinish={changePassword}
                validateMessages={validateMessages}
              >
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your current password!",
                    },                   
                  ]}
                >           
                  <Input.Password placeholder="Current Password" />
                </Form.Item>
                <Form.Item
                  name="newpassword"
                  rules={[
                    {
                      required: true,
                      message: "Please input your new password!",
                    },
                  ]}
                >
                  <Input.Password placeholder="New Password" />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    update
                  </Button>
                </Form.Item>
              </Form>
            </TabPanel>
          </Box>
        </AddPostContainer>
      </Backdrop>
    </div>
  );
};

export default EditProfile;
