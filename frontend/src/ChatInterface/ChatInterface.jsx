import React from "react";
import "./ChatInterface.scss";
import TextField from "@material-ui/core/TextField";
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import IconButton from "@material-ui/core/IconButton";
import {BaseUrl} from "../constants";
import {useParams} from "react-router-dom";

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

  const username=useParams().user;
  const [value,setvalue] = React.useState("");
  const [onmessage,setonmessage] = React.useState(false);
  const [isOnline,setIsOnline] = React.useState(false);
  const [messages,setmessages] = React.useState([]);
  console.log(messages,username);

  React.useEffect(()=>{
    const token = localStorage.getItem("jwt");
    console.log(token);
    if(typeof token == "string"){
      const ws=new WebSocket("ws://localhost:8001",token);
      ws.onopen = () => {
        console.log("connection open");
        console.log(typeof username);
        if(typeof username == "string"){
          ws.send(JSON.stringify({username,msg:"get"}));
        }
        ws.send(JSON.stringify({username,msg:"userIsOnline"}));
      }
      ws.onmessage = (msg) => {
        console.log(JSON.parse(msg.data))
        if(JSON.parse(msg.data).type=="get"){
          setmessages(JSON.parse(msg.data).data);
        }else{
          if(JSON.parse(msg.data).isOnline && JSON.parse(msg.data).username === username){
            setIsOnline(true);
          }
        }
        ;
      }
      ws.onclose = () => {
        console.log("closed");
        ws.close();
      }
    }
  },[]);
  const sendmsg = () => {
    const token = localStorage.getItem("jwt");
    console.log(token);
    if(typeof token == "string"){
      const ws=new WebSocket("ws://localhost:8001",token);
      ws.onopen = () => {
        console.log("connection open1");
        console.log(typeof username);
        if(typeof username == "string"){
          ws.send(JSON.stringify({username,msg:"post",message:value}));
        }
      }
      ws.onmessage = (msg) => {
        if(JSON.parse(msg.data).type=="get"){
          setmessages(JSON.parse(msg.data).data);
        }else{
          setIsOnline(JSON.parse(msg.data).isOnline && JSON.parse(msg.data).username === username);
        }
      }
      ws.onclose = () => {
        console.log("closed1");
        ws.close();
      }
    }
  } 
  console.log(isOnline);
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
        <h3 className="text-center text-lowercase">{username} status {(isOnline)?"Online":"Offline"} </h3>
        <div className="container" style={{
          overflowY: "scroll",
          // position: "absolute",
          height: "80%",
        }}>
          {
            messages.map((ele)=>{
              return (ele.user1==username)?(
                <div className="leftbox">
                  <strong>{ele.user1} </strong> <br/>
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