import React from "react";
import "./ChatInterface.scss";
import TextField from "@material-ui/core/TextField";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from "@material-ui/core/IconButton";
import {BaseUrl} from "../constants";

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

  const username=props.match.params.user;
  const [value,setvalue] = React.useState("");
  const [onmessage,setonmessage] = React.useState(false);
  const [messages,setmessages] = React.useState([]);
  console.log(messages);

  React.useEffect(()=>{
    const token = localStorage.getItem("token");
    console.log(token);
    if(typeof token == "string"){
      const ws=new WebSocket("ws://localhost:8000",token);
      ws.onopen = () => {
        console.log("connection open");
        console.log(typeof username);
        if(typeof username == "string"){
          ws.send(JSON.stringify({username,msg:"get"}));
        }
      }
      ws.onmessage = (msg) => {
        setmessages(JSON.parse(msg.data));
      }
      ws.onclose = () => {
        console.log("closed");
        ws.close();
      }
    }
  },[]);
  const sendmsg = () => {
    const token = localStorage.getItem("token");
    console.log(token);
    if(typeof token == "string"){
      const ws=new WebSocket("ws://localhost:8000",token);
      ws.onopen = () => {
        console.log("connection open1");
        console.log(typeof username);
        if(typeof username == "string"){
          ws.send(JSON.stringify({username,msg:"post",message:value}));
        }
      }
      ws.onmessage = (msg) => {
        setmessages(JSON.parse(msg.data));
      }
      ws.onclose = () => {
        console.log("closed1");
        ws.close();
      }
    }
  } 
  return (
    <div>
      <div
        className="ChatInterface p-sm-5 mt-5 shadow"
        style={{
          position: "relative",
          height: "600px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <h3 className="text-center text-lowercase">{props.match.params.user}</h3>
        <div className="container" style={{
          overflowY: "scroll",
          // position: "absolute",
          height: "80%",
        }}>
          {
            messages.map((ele)=>{
              return (ele.user1==username)?(
                <div className="leftbox">
                  <strong>{ele.user1}</strong> <br/>
                  {ele.message}
                </div>
              ):(
                <div className="rightbox">
                    <strong>me</strong> <br/>
                    {ele.message} 
                </div>
              )
            })
          }
        </div>
        <div
            style={{
            position: "fixed",
            bottom: "30px",
            display: "block",
            margin: "auto",
            width: "max-content",
            }}
        >
            <TextField id="outlined-basic" label="sendmessage" variant="outlined" onChange={(e)=>{
              setvalue(e.target.value);
            }}/>
            <IconButton className="ml-3 mt-1" style={{background:"#fff"}} onClick={sendmsg}>
                <KeyboardArrowRightIcon/>
            </IconButton>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;