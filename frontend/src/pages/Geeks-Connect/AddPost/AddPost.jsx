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
import TextField from '@mui/material/TextField';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { Picker } from "emoji-mart";  
import "emoji-mart/css/emoji-mart.css"; 
import "./AddPost.scss";

const AddPost = () => {
  const open = React.useState(true);
  const [src, setsrc] = React.useState("");
  const [status, setstatus] = React.useState(false);
  const [curr, setcurr] = React.useState(0);
  const [result, setResult] = useState(null);
  const [image, setImage] = useState(null);
  const [showEmojis, setShowEmojis] = useState(false); 
  const [caption,setcaption] = useState("");
  const [crop, setCrop] = useState({
    unit: "%",
    width: 30,
    aspect: 16 / 9,
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
  }
  const props = {
    name: "file",
    multiple: false,
    // action: "",

    // customRequest	: (file) => {
    //   const formData = new FormData();
    //   formData.append("file", file.file);
    // },
    // data:{

    // },
    onChange: async (info) => {
      try {
        message.success(` file uploading ...`);
        let src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(info.file.originFileObj);
          reader.onload = () => resolve(reader.result);
        });
        message.success(`$file uploaded successfully.`);
        setsrc(src);
        setstatus(true);
      } catch (error) {
        message.error(`file upload failed.`);
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

        <AddPostContainer>
          <Button
            variant="text"
            sx={{
              display: status ? "block" : "none",
              position: "absolute",
              top: "15px",
              right: "15px",
              zIndex: "9999999",
            }}
            onClick={() => {
              if(curr===2){
                post()
              }else{
                setcurr((pre) => {
                  return pre + 1;
                });
              }
            }}
          >
            {curr === 0 || curr === 1 ? "NEXT" : "POST"}
          </Button>
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
              {
                (curr===1)?(
                  <>
                  <Button
                    onClick={getCroppedImg}
                    sx={{
                      display: status ? "block" : "none",
                      position: "absolute",
                      top: "15px",
                      left: "15px",
                      zIndex: "9999999",
                    }}
                  >
                    crop
                  </Button>
                  <ReactCrop
                    className="Crop"
                    src={src}
                    crop={crop}
                    onImageLoaded={setImage}
                    onChange={(newCrop) => {
                      console.log(newCrop);
                      setCrop(newCrop);
                    }}
                    />
                  </>
                  ):(
                    src && (
                      <div className="">
                        <img
                          src={result}
                          alt="cropped img"
                          style={{ width: "100%" }}
                        />
                      </div>
                    )
                  )
                }
              {
              (curr===1)?(
                result && (
                  <div className="mt-3 ">
                    <img
                      src={result}
                      alt="cropped img"
                      style={{ width: "100%" }}
                    />
                  </div>
                )
              ):
                (curr===2)?(
                  <>
                     <TextField
                      className="mt-5"
                      id="standard-textarea"
                      label=""
                      placeholder="write a caption ..."
                      multiline
                      rows={4}
                      variant="standard"
                      value={caption}
                      onChange={(e)=>{
                        setcaption(e.target.value);
                      }}
                      >
                      </TextField>
                      <IconButton style={{
                        width:"max-content",
                        marginTop:"-2.7rem",
                        marginLeft:"-0.6rem",
                        
                      }}
                        onClick={()=>{
                          setShowEmojis((pre)=>{
                            return !pre;
                          });
                        }}
                      >
                        <EmojiEmotionsIcon />
                      </IconButton>
                      {showEmojis && (  
                          <div>  
                            <Picker onSelect={addEmoji}/>  
                          </div>  
                        )} 
                  </>
                ):""
              }
            </div>
          )}
        </AddPostContainer>
      </Backdrop>
    </div>
  );
};

export default AddPost;
