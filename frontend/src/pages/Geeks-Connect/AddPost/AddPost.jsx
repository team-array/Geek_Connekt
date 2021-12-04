import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AddPostContainer } from "./AddPost.styles";
import { useDispatch } from "react-redux";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";
import ReactCrop from "react-image-crop";
import TextField from "@mui/material/TextField";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Picker } from "emoji-mart";
import axios from "axios";
import "emoji-mart/css/emoji-mart.css";
import "./AddPost.scss";
import { notification } from "antd";
import { BaseUrl } from "../../../constants";
const openNotificationWithIcon = (info) => {
  notification[info.type]({
    message: info.message,
    description: info.description,
  });
};

const dataURLtoFile = (dataurl, filename) => {
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n) {
    u8arr[n - 1] = bstr.charCodeAt(n - 1);
    n -= 1; // to make eslint happy
  }
  return new File([u8arr], filename, { type: mime });
};

const AddPost = () => {
  const open = React.useState(true);
  const [src, setsrc] = React.useState("");
  const [status, setstatus] = React.useState(false);
  const [curr, setcurr] = React.useState(0);
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [caption, setcaption] = useState("");
  const [crop, setCrop] = useState({
    unit: "%",
    width: 30,
    height: 30,
  });
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: 0 });
  };
  const { Dragger } = Upload;
  const post = async () => {
    console.log("posting ...");
    console.log(`resulatnt image ${result}`);
    console.log(`resulatnt caption ${caption}`);
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      const formData = new FormData();
      const file = dataURLtoFile(result);
      formData.append("image", file, file.name);
      formData.append("caption", caption);
      formData.append("college", "CMRCET");
      formData.append("token", localStorage.getItem("jwt"));
      const response = await axios({
        method: "POST",
        url: BaseUrl + "/uploadPost",
        headers: {
          "content-type": "multipart/form-data",
        },
        data: formData,
      });
      dispatch({ type: "SET_LOADING", payload: false });
      console.log(response);
      dispatch({ type: "SET_CURRENT_PAGE", payload: 0 });
      openNotificationWithIcon({
        type: "success",
        message: "Success",
        description: "Post Uploaded Successfully",
      });
    } catch (error) {
      dispatch({ type: "SET_LOADING", payload: false });
      console.log(error);
    dispatch({ type: "SET_CURRENT_PAGE", payload: 0 });
      openNotificationWithIcon({
        type: "error",
        message: "Error",
        description: "Something went wrong",
      });
    }
  };
  const props = {
    name: "file",
    multiple: false,
    maxCount: 1,
    showUploadList: false,
    onChange: async (info) => {
      console.log(info);
      try {
        let src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(info.file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
        setsrc(src);
        setcurr(1);
      } catch (error) {
        // message.error(`file upload failed.`);
        setstatus(false);
      }
    },
  };
  const getCroppedImg = async () => {
    try {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      const base64Image = canvas.toDataURL("image/jpeg", 1);

      setResult(base64Image);
      setcurr(2);
      setstatus(true);
    } catch (e) {
      console.log("crop the image");
    }
  };
  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setcaption(caption + emoji);
  };
  return (
    <div className="AddPost">
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: "9999999",
          backgroundColor: "rgba(0,0,0,.85)",
        }}
        open={open}
        onClick={handleClose}
      >

        <AddPostContainer 
            onClick={e => e.stopPropagation()}
        >
          {curr === 0 ? (
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Photos and videos</p>
              <p className="ant-upload-hint px-2">
                drag or click to upload photos and videos here
              </p>
            </Dragger>
          ) : (
            <div
              className="onCropContainer"
              style={{
                margin: "auto",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {curr === 1 ? (
                <>
                  <Button
                    onClick={() => {
                      setcurr(0);
                    }}
                    sx={{
                      display: "block",
                      position: "absolute",
                      top: "15px",
                      left: "15px",
                      zIndex: "9999999",
                    }}
                  >
                    back
                  </Button>
                  <Button
                    onClick={getCroppedImg}
                    sx={{
                      display: "block",
                      position: "absolute",
                      top: "15px",
                      right: "15px",
                      zIndex: "9999999",
                    }}
                  >
                    crop
                  </Button>
                  <ReactCrop
                    className="Crop"
                    src={src}
                    crop={crop}
                    style={{
                        overflowX: "scroll",
                        height: "300px",
                    }}
                    onImageLoaded={setImage}
                    onChange={(newCrop) => {
                      console.log(newCrop);
                      if(newCrop.width>600){
                        setCrop({
                          ...newCrop,
                          width: 600,
                        });
                      }else{
                        setCrop({
                          ...newCrop
                        });
                      }
                    }}
                  />
                </>
              ) : (
                src && (
                  <div className="">
                    <img
                      src={result}
                      alt="cropped img"
                      style={{ width: "100%", height: "300px" }}
                    />
                  </div>
                )
              )}
              {curr === 1 ? (
                result && (
                  <div className="mt-3 ">
                    {/* <img
                      src={result}
                      alt="cropped img"
                      style={{ width: "100%",height: "300px" }}
                    /> */}
                  </div>
                )
              ) : curr === 2 ? (
                <>
                  <Button
                    onClick={() => {
                      setcurr(1);
                    }}
                    sx={{
                      display: "block",
                      position: "absolute",
                      top: "15px",
                      left: "15px",
                      zIndex: "9999999",
                    }}
                  >
                    back
                  </Button>
                  <TextField
                    className="mt-5"
                    id="standard-textarea"
                    label=""
                    placeholder="write a caption ..."
                    multiline
                    rows={4}
                    variant="standard"
                    value={caption}
                    onChange={(e) => {
                      setcaption(e.target.value);
                    }}
                  ></TextField>
                  <IconButton
                    style={{
                      width: "max-content",
                      marginTop: "-2.7rem",
                      marginLeft: "-0.6rem",
                    }}
                    onClick={() => {
                      setShowEmojis((pre) => {
                        return !pre;
                      });
                    }}
                  >
                    <EmojiEmotionsIcon />
                  </IconButton>
                  {showEmojis && (
                    <div>
                      <Picker onSelect={addEmoji} />
                    </div>
                  )}
                  <Button
                    variant="outlined"
                    color="primary"
                    
                    className="mt-4"
                    sx={{
                      display: "block",
                      zIndex: "9999999",
                      width: "100%",
                    }}
                    onClick={() => {
                      if (curr === 2) {
                        post();
                      } else {
                        setcurr((pre) => {
                          return pre + 1;
                        });
                      }
                    }}
                  >
                    POST
                  </Button>
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
            color="primary"
            style={{
              zIndex: "9999999",
              fontSize: "22px",
            }}
          />
        </IconButton>

                </>
              ) : (
                ""
              )}
            </div>
          )}
        </AddPostContainer>
      </Backdrop>
    </div>
  );
};

export default AddPost;
