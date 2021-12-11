import React from "react";
import "./ChatInterface.scss";
import TextField from "@material-ui/core/TextField";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import IconButton from "@material-ui/core/IconButton";
import { BaseUrl } from "../constants";
import { useParams } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logo1.png";
import CloudOffIcon from "@mui/icons-material/CloudOff";
import CloudDoneIcon from "@mui/icons-material/CloudDone";
import { Input } from "antd";
import { useSelector } from "react-redux";

const { TextArea } = Input;

const ChatInterface = (props) => {
  // console.log(props);
  // const socket = io(`${Baseurl}`,
  // {
  //   // transports:["websockets","polling"],
  //   auth:{
  //     token:JSON.stringify(localStorage.getItem("token"))
  //   },
  // });
  // socket.on("connect_error",()=>{
  //   console.log("disconnected");
  //   socket.disconnect();
  // });
  const currProfilePic = useSelector((state) => state.currentChatProfilePic);

  const username = useParams().user;
  const [value, setvalue] = React.useState("");
  const [onmessage, setonmessage] = React.useState(false);
  const [isOnline, setIsOnline] = React.useState(false);
  const [messages, setmessages] = React.useState([]);
  console.log(messages, username);

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    console.log(token);
    if (typeof token == "string") {
      const ws = new WebSocket("ws://localhost:8001", token);
      ws.onopen = () => {
        console.log("connection open");
        console.log(typeof username);
        if (typeof username == "string") {
          ws.send(JSON.stringify({ username, msg: "get" }));
        }
        ws.send(JSON.stringify({ username, msg: "userIsOnline" }));
      };
      ws.onmessage = (msg) => {
        console.log(JSON.parse(msg.data));
        if (JSON.parse(msg.data).type == "get") {
          setmessages(JSON.parse(msg.data).data);
        } else {
          if (
            JSON.parse(msg.data).isOnline &&
            JSON.parse(msg.data).username === username
          ) {
            setIsOnline(true);
          } else {
            setIsOnline(false);
          }
        }
      };
      ws.onclose = () => {
        console.log("closed");
        ws.close();
      };
    }
  }, []);
  const sendmsg = () => {
    const token = localStorage.getItem("jwt");
    console.log(token);
    if (typeof token == "string") {
      const ws = new WebSocket("ws://localhost:8001", token);
      ws.onopen = () => {
        console.log("connection open1");
        console.log(typeof username);
        if (typeof username == "string") {
          ws.send(JSON.stringify({ username, msg: "post", message: value }));
        }
      };
      ws.onmessage = (msg) => {
        if (JSON.parse(msg.data).type == "get") {
          setmessages(JSON.parse(msg.data).data);
        } else {
          setIsOnline(
            JSON.parse(msg.data).isOnline &&
              JSON.parse(msg.data).username === username
          );
        }
      };
      ws.onclose = () => {
        console.log("closed1");
        ws.close();
      };
    }
  };
  const messagesEnd = React.useRef(null);
  React.useEffect(()=>{
    let scrollToBottom = () => {
      messagesEnd.current?.scrollIntoView({ behavior: "smooth" })
    }
    scrollToBottom();
  },[messages]);
  console.log(isOnline);
  return (
    <div
      style={{
        overflow: "hidden"

      }}
    >
      <div
        className="ChatInterface mt-5 mb-0 pb-0 shadow"
        style={{
          position: "relative",
          height: "600px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              {currProfilePic !== "" ? (
                <img
                  src={currProfilePic}
                  style={{
                    height: "30px",
                    width: "30px",
                    borderRadius: "100%",
                  }}
                />
              ) : (
                ""
              )}
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {username}
            </Typography>
            <Button color="inherit" className="py-2">
              {isOnline ? (
                <CloudDoneIcon style={{ marginBottom: "3.5px" }} />
              ) : (
                <CloudOffIcon style={{ marginBottom: "3.5px" }} />
              )}{" "}
              &nbsp; {isOnline ? "Online" : "Offline"}{" "}
            </Button>
          </Toolbar>
        </AppBar>
        <div
          className="container p-sm-5"
          style={{
            overflowY: "scroll",
            overflowX: "hidden",
            // position: "absolute",
            backgroundColor: "#f5f5f5",
            width: "100%",
            height: "70vh",
            borderBottom: "1px solid #ccc",
          }}
        >
          {messages.map((ele,index) => {
            return ele.user1 == username ? (
              <div className="leftbox"
                ref={(index===messages.length-1)?messagesEnd:null} 
              >
                {/* <strong>{ele.user1} </strong> <br /> */}
                {ele.message} <br/>
                <span className="text-end" style={{fontStyle:"",fontSize:"12px"}}>{ele.createdAt.toString().split("T")[0]} {ele.createdAt.toString().split("T")[1].split(".")[0].substring(0,5)}</span>
              </div>
            ) : (
              <div className="rightbox"
              ref={(index===messages.length-1)?messagesEnd:null} 
              
              >
                {/* <strong>me</strong> <br /> */}
                {ele.message} <br/>
                <span className="text-dark text-end" style={{fontStyle:"",fontSize:"12px"}}>{ele.createdAt.toString().split("T")[0]} {ele.createdAt.toString().split("T")[1].split(".")[0].substring(0,5)}</span>
              </div>
            );
          })}
          <div
              ref={messagesEnd} 
          
          ></div>
        </div>
        <div
          style={{
            position: "relative",
            bottom: "0px",
            display: "block",
            margin: "0",
            width: "100%",
          }}
        >
          {/* <TextField
            id="outlined-basic"
            label="sendmessage"
            variant="outlined"
            style={{
              width: "90%",
            }}
            onChange={(e) => {
              setvalue(e.target.value);
            }}
          /> */}
          <div style={{ display: "flex" }} className="p-0 m-0">
            <TextArea
              placeholder="send a message"
              autoSiz
              onChange={(e) => {
                setvalue(e.target.value);
              }}
            />
            <Button
              className=""
              variant="contained"
              onClick={sendmsg}
              style={{
                height: "50px",
                width: "100px",
                backgroundColor: "#1976d2",
                color: "white",
              }}
            >
              send
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
