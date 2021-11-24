import React from "react";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AddPostContainer } from "./AddPost.styles";
import { useDispatch } from "react-redux";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";



const AddPost = () => {
  const open = React.useState(true);
  const [src,setsrc] = React.useState("");  
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch({ type: "SET_CURRENT_PAGE", payload: 0 });
  };
  const { Dragger } = Upload;

    const props = {
    name: "file",
    multiple: false,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange:async (info) => {
        let src = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(info.file.originFileObj);
            reader.onload = () => resolve(reader.result);
        });
        setsrc(src);
        // const { status } = info.file;

        // console.log(info.file);
        // const reader = new FileReader();
        // reader.onload = () => {
        //     console.log(reader.result);
        // };
        // if (status !== "uploading") {
        //     message.success(`${info.file.name} file uploaded successfully.`);
        //     console.log(info.file, info.fileList);
        // }
        // if (status === "done") {
        //     message.success(`${info.file.name} file uploaded successfully.`);
        // } else if (status === "error") {
        //   message.error(`${info.file.name} file upload failed.`);
        // }
    },
    onDrop(e) {
        console.log("Dropped files", e.dataTransfer.files);
    },
    };
  return (
    <div>
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
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Photos and videos
            </p>
            <p className="ant-upload-hint px-2">
                drag or click to upload photos and videos here 
            </p>
          </Dragger>
          {/* <img src={src} alt="" style={{width:"200px",height:"200px"}}/> */}
        </AddPostContainer>
      </Backdrop>
    </div>
  );
};

export default AddPost;
