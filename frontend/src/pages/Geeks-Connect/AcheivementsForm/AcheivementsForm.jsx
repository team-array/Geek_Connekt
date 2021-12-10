import React, { useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { AddPostContainer } from "../AddPost/AddPost.styles";
import { useDispatch } from "react-redux";
import { Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Button from "@mui/material/Button";
import ReactCrop from "react-image-crop";
import axios from "axios";
import "emoji-mart/css/emoji-mart.css";
import "../AddPost/AddPost.scss";
import { useSelector } from "react-redux";
import { notification, Space } from 'antd';
import {BaseUrl} from "../../../constants";
const openNotificationWithIcon = info => {
  notification[info.type]({
    message: info.message,
    description:
      info.description,
  });
};

const AcheivementsForm = () => {
    const open = useSelector((state) => state.showAchievementsForm);
    const [src, setsrc] = React.useState("");
    const [status, setstatus] = React.useState(false);
    const [curr, setcurr] = React.useState(0);
    const [result, setResult] = useState(null);
    const [image, setImage] = useState(null);
    const imagesGridLength = useSelector((state) => state.ImagesGridLength);
    const [crop, setCrop] = useState({
        unit: "%",
        width: 30,
    });
    const dispatch = useDispatch();
    const handleClose = () => {
        dispatch({ type: "SET_ACHIEVEMENTS_FORM", payload: false });
    };
    const { Dragger } = Upload;
    const post = async () => {
        try {
            dispatch({ type: "SET_LOADING", payload: true });
            dispatch({ type: "SET_ACHIEVEMENTS_FORM", payload: false });
            const response = await axios({
                method: "POST",
                url: BaseUrl+"/addachievement",
                headers: {
                    "content-type": "application/json",
                },
                data: {
                    achievement_image: result,
                    token: localStorage.getItem("jwt"),
                },
            });
            dispatch({ type: "SET_LOADING", payload: false });
            if (response.data.success) {
                message.success("Achievement added successfully");
                openNotificationWithIcon({
                    type: "success",
                    message: "Achievement added successfully",
                    description: "You can now add more achievements.Please refresh the page to see the changes",
                });
                dispatch({type:"SET_GRID_LENGTH", payload:Math.min(imagesGridLength+1,4)});
                dispatch({ type: "ADD_ACHIEVEMENTS", payload: [response.data.achievement] });
            }
            else{
                openNotificationWithIcon({
                    type: "error",
                    message: "Error",
                    description: "Something went wrong",
                });
                dispatch({ type: "SET_LOADING", payload: false });
            }
        } catch (error) {
            console.log(error);
            dispatch({ type: "SET_LOADING", payload: false });
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
        } catch (e) {
            console.log("crop the image");
        }
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
                        style={{
                            color: "#fff",
                            zIndex: "9999999",
                            fontSize: "35px",
                        }}
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
                            if (curr === 1) {
                                post();
                            } else {
                                setcurr((pre) => {
                                    return pre + 1;
                                });
                            }
                        }}
                    >
                        {curr === 0 ? "NEXT" : "POST"}
                    </Button>
                    {curr === 0 ? (
                        <>
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Photos and videos</p>
                            <p className="ant-upload-hint px-2">
                                drag or click to upload photos and videos here
                            </p>
                        </Dragger>
                        {
                            (status)?
                                <p className="mt-2" style={{color:"black"}}>click next to crop the image</p> : ""
                        }
                        </>
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
                                        style={{
                                            height: "230px",
                                            width: "300px",
                                            margin: "auto",
                                        }}
                                        onChange={(newCrop) => {
                                            setCrop({
                                                ...newCrop,
                                                // width:160,
                                                // height:160,
                                            });
                                        }}
                                    />
                                </>
                            ) : (
                                src && (
                                    <div className="">
                                        <img
                                            src={result}
                                            alt="cropped img"
                                            style={{ width: "100%",
                                           
                                         }}
                                        />
                                    </div>
                                )
                            )}
                            {curr === 1 ? (
                                result && (
                                    <div className="mt-3 ">
                                        <img
                                            src={result}
                                            alt="cropped img"
                                            style={{margin: "auto",
                                            display: "block",height:"150px",width:"150px" }}
                                        />
                                    </div>
                                )
                            ) : "" 
                            }
                        </div>
                    )}
                </AddPostContainer>
            </Backdrop>
        </div>
    );
};

export default AcheivementsForm;
