import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import axios from "axios";
import { BaseUrl } from "../constants";
import { useNavigate } from "react-router-dom";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import logo from "../assets/logo1.png";
import MarkUnreadChatAltIcon from "@mui/icons-material/MarkUnreadChatAlt";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import { useDispatch, useSelector } from "react-redux";

import {
  createStyles,
  fade,
  Theme,
  makeStyles,
} from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import "./ChatV2.scss";
const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  })
);

function notificationsLabel(count) {
  if (count === 0) {
    return 'no notifications';
  }
  if (count > 5) {
    return 'more than 5 notifications';
  }
  return `${count} notifications`;
}


const Chat = () => {
  const classes = useStyles();
  const [value, setvalue] = React.useState("");
  const [showsearch, setshowsearch] = React.useState("none");
  const [onsearch, setonsearch] = React.useState([]);
  const [usernames, setusernames] = React.useState([]);
  const H = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: true });
    const chats = async () => {
      try {
        const result = await axios({
          method: "post",
          url: `${BaseUrl}/getAllChats`,
          headers: {
            accept: "application/json",
            "content-type": "application/json",
          },
          data: { token: localStorage.getItem("jwt"), data: value },
        });
        dispatch({ type: "SET_LOADING", payload: false });
        if (result.data.success) {
          if (value !== "") {
            setonsearch(result.data.chats);
          } else {
            setusernames(result.data.chats);
          }
        }
      } catch (error) {
        dispatch({ type: "SET_LOADING", payload: false });
        console.log(error);
      }
    };
    chats();
  }, [value]);
  return (
    <div className="chats">
      <div className="container">
        <div
          className="shadow"
          style={{
            marginTop: "3rem",
            background: "",
            position: "relative",
            height: "80vh",
          }}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography
                className={classes.title}
                variant="h6"
                style={{ color: "white" }}
                noWrap
              >
                <img
                  src={logo}
                  alt="chats"
                  style={{
                    width: "50px",
                    height: "50px",
                    marginLeft: "-8px",
                  }}
                ></img>{" "}
                Chats
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  onChange={(e) => {
                    setvalue(e.target.value);
                    setshowsearch("flex");
                  }}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <div
                className="shadow bg-white"
                style={{
                  width: "14rem",
                  height: "18rem",
                  overflowY: "scroll",
                  display: showsearch,
                  flexDirection: "column",
                  position: "fixed",
                  transform: "translateX(-50%)",
                  left: "50%",
                  top: "11rem",
                  borderRadius: "0.3rem",
                  flexWrap: "wrap",
                  wordWrap: "break-word",
                }}
              >
                <IconButton
                  style={{
                    // position:"fixed",
                    width: "max-content",
                    left: "100%",
                    transform: "translate(-100%,30%)",
                    // bottom:"1rem"
                    marginBottom: "0.3rem",
                  }}
                  onClick={() => {
                    setshowsearch("none");
                  }}
                >
                  <HighlightOffIcon />
                </IconButton>
                {onsearch.map((ele, index) => (
                  <div
                    className="p-3 Searchbox"
                    onClick={() => {
                      H(`/chat/${ele.user2}`);
                    }}
                    style={{ color: "black", cursor: "pointer" }}
                  >
                    {ele.user2}
                  </div>
                ))}
              </div>
            </Toolbar>
          </AppBar>
          <div className="mt-3">
            {usernames.map((ele, index) => (
              <div
                className="Searchbox nndffkfkf"
                onClick={() => {
                  dispatch({"type":"SET_CHAT_PROFILE",payload:ele.profilePic})
                  H(`/chat/${ele.user2}`);

                }}
                style={{
                  color: "black",
                  cursor: "pointer",
                  padding: "0.8rem 1rem 0.8rem 0rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #e0e0e0",
                  marginLeft: "2rem",
                  marginRight: "2rem",
                }}
              >
                <div style={{ display: "block" }}>
                  <img
                    src={ele.profilePic}
                    alt="chats"
                    style={{
                      width: "40px",
                      height: "40px",
                      marginLeft: "8px",
                      borderRadius: "100%",
                      marginRight: "1rem",
                    }}
                  ></img>{" "}
                  {ele.user2}
                </div>
                <div style={{ display: "inline-block", textAlign: "end" }}>
                  {ele.role}{" "}
                  <IconButton aria-label={notificationsLabel(ele.count)}>
                    <Badge badgeContent={ele.count} color="primary">
                      <MarkUnreadChatAltIcon />
                    </Badge>
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
