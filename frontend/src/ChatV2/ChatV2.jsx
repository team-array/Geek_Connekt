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
const Chat = () => {
  const classes = useStyles();
  const [value, setvalue] = React.useState("");
  const [showsearch, setshowsearch] = React.useState("none");
  const [onsearch, setonsearch] = React.useState([]);
  const [usernames, setusernames] = React.useState([]);
  const H = useNavigate();
  React.useEffect(() => {
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
        if(result.data.success){
          if(value!==""){
            setonsearch(result.data.chats);
          }else{
            setusernames(result.data.chats);
          }
        }
      } catch (error) {
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
          style={{ marginTop: "3rem", background: "", position: "relative",height:"80vh", }}
        >
          <AppBar position="static">
            <Toolbar>
              <Typography className={classes.title} variant="h6" style={{color:"white"}} noWrap>
                searchuser
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
          {usernames.map((ele, index) => (
            <div
              className="Searchbox nndffkfkf mt-0"
              onClick={() => {
                H(`/chat/${ele.user2}`);
              }}                
              style={{ color: "black", cursor: "pointer", padding:"1rem 1rem 1rem 1rem" }}
            >
              {ele.user2}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;