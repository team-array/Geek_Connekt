import React from "react";
import { DownloadOutlined } from "@ant-design/icons";
import { Button, Radio } from "antd";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import { Card } from "antd";
import { Alert } from "antd";
import { Pagination } from "antd";
import { PageHeader } from "antd";
import { Input, Space } from "antd";
import "./Notes.scss";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import logo from "../../../assets/logo1.png";
import {CardGrid} from "./Notes.style";
import NotesForm from "../../../components/NotesForm/NotesForm";
import {BaseUrl} from "../../../constants";
import { AudioOutlined } from "@ant-design/icons";
import {useDispatch} from "react-redux";

import axios from "axios";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function NotesBlog() {
  const [openForm,setOpenForm] = React.useState(false);
  const [notes,setnotes] = React.useState([]);
  const dispatch = useDispatch();
  const onclose = () => {
    setOpenForm(false);
  }
  const onOpenForm = () => {
    setOpenForm(true);
  }
  const afterpost = (newNote) => {
    if(newNote)
      setnotes((pre)=>[...pre,newNote]);
  }
  React.useEffect(()=>{
    const getNotes = async () => {
      dispatch({type:"SET_LOADING", payload: true});
      try{
        const response = await axios({
          method:"post",
          url:BaseUrl+"/getAllNotes",
          data:{
            token:localStorage.getItem("jwt")
          }
        });
        dispatch({type:"SET_LOADING", payload: false});
        if(response.data.success){
          setnotes(response.data.notes);
        }
      }
      catch(error){
        dispatch({type:"SET_LOADING", payload: false});
        console.log(error);
      }
    }
    getNotes();
  },[]);
  const download = (fileName) => {
    console.log(fileName);
  }
  console.log(notes);
  return (
    <>
    {
      openForm && <NotesForm onclose={onclose} afterpost={afterpost}/>
    }
      <div
        id="feature"
        className="block featureBlock NotesBlog bgGray"
        style={{ padding: "0" }}
      >
        <div className="containe">
          <div className="titleHolder">
            <h2 style={{ marginBottom: "25px" }}>
              <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                  <Toolbar>
                    <IconButton
                      size="large"
                      edge="start"
                      color="inherit"
                      aria-label="open drawer"
                      sx={{ mr: 2 }}
                      className="my-0 p-0"
                    >
                      <img src={logo} alt="logo" style={{
                        width:"50px",
                        height:"50px",
                      }}/>
                    </IconButton>
                    <Typography
                      variant="h6"
                      noWrap
                      component="div"
                      className="mt-1"
                      sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
                    >
                      Pdf Portal
                    </Typography>
                    <Search
                      style={{ marginRight: "30px" }}
                    >
                      <SearchIconWrapper>
                        <SearchIcon />
                      </SearchIconWrapper>
                      <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ "aria-label": "search" }}
                      />
                    </Search>
                    {
                      (JSON.parse(localStorage.getItem("user")).role !== "Student") &&
                      <Button
                        variant="contained" 
                        color="primary"
                        size="large"
                        className="mt-0"
                        onClick={onOpenForm}
                      >
                        <span className="ml-2">Add Notes</span>
                      </Button>
                    }
                  </Toolbar>
                </AppBar>
              </Box>
            </h2>
          </div>

          <CardGrid style={{
            marginLeft: "50px",
            marginRight: "50px",
          }}>
            {
              notes.map((note,index)=>{
                return (
                <Card hoverable>
                  <h3>{note.subject}</h3>
                  <hr />
                  <Alert
                    style={{ margin: "16px 0" }}
                    message={note.topicName}
                  />
                  <p>
                    {note.description}
                  </p>
                  <Button type="primary" icon={<DownloadOutlined />} size="large">
                    Download
                  </Button>
                </Card>
              )
              })
            }
              
           </CardGrid>
        </div>
      </div>
    </>
  );
}

export default NotesBlog;
