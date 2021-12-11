import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import { BaseUrl, ClientUrl } from "../../../../constants";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import StarIcon from "@mui/icons-material/Star";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { Input, AutoComplete } from "antd";
import { useDispatch } from "react-redux";
import ArticleIcon from "@mui/icons-material/Article";
import SearchHook from "../../../../hooks/SearchHook";
import logo from "../../../../assets/logo1.png";
import { gql, useQuery } from "@apollo/client";
import { useSelector } from "react-redux";
import axios from "axios";
import UploadIcon from "@mui/icons-material/Upload";
import SchoolIcon from "@mui/icons-material/School";
import { useNavigate } from "react-router-dom";
import ChatIcon from "@mui/icons-material/Chat";
import "./Navbar.scss";

const GET_NOTIFCATION_COUNT = gql`
  query user($token: String!) {
    user(token: $token) {
      newNotifications
    }
  }
`;

function getRandomInt(max, min = 0) {
  return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

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

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const searchResult = (searchedUsers) => {
  console.log(searchedUsers);
  return searchedUsers.map((user, idx) => {
    // const category = `${query}${idx}`;
    return {
      value: idx,
      label: (
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            zIndex: "999999!important",
          }}
        >
          <span>
            Found query on{" "}
            <a
              href={ClientUrl + `/#/user/${user._id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {user.username}
            </a>
          </span>
        </div>
      ),
    };
  });
};

export default function PrimarySearchAppBar(props) {
  const [options, setOptions] = React.useState([]);

  const newNoticationCount = useSelector((state) => state.newNotificationCount);

  const dispatch = useDispatch();
  const [userData, setUserData] = useState(
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );

  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const open2 = Boolean(anchorEl2);
  const handleClick2 = (event) => {
    if (anchorEl2) {
      setAnchorEl2(null);
    } else {
      setAnchorEl2(event.currentTarget);
    }
  };
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const [searchTerm, setSearchTerm] = React.useState("");

  const { loading, error, searchedUsers, hasMore, setPageNumber } = SearchHook(
    searchTerm,
    1
  );

  const {
    loading: loadingNoti,
    error: errorNoti,
    data: dataNoti,
  } = useQuery(GET_NOTIFCATION_COUNT, {
    variables: {
      token: localStorage.getItem("jwt"),
    },
  });

  const getNewNotications = async (newNotificationCount) => {
    try {
      let notification = [];
      console.log("in get new noti");
      const result = await axios({
        method: "GET",
        url: BaseUrl + `/getNotifications`,
        params: {
          token: localStorage.getItem("jwt"),
          count: +newNotificationCount,
        },
      });
      result.data.forEach((noti) => {
        notification.push({
          type: noti.type,
          title: noti.likedBy,
          postId: noti.postId,
          image: noti.profilePic,
          message: noti.message,
        });
      });
      console.log(notification);
      dispatch({
        type: "SET_ALL_NEW_NOTIFICATION_BACKEND",
        payload: notification,
      });
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (!loadingNoti && !errorNoti) {
      console.log("newNotidications: ", dataNoti.user.newNotifications);
      if (dataNoti.user.newNotifications > 0) {
        getNewNotications(dataNoti.user.newNotifications);
        dispatch({
          type: "SET_NEW_NOTIFICATION_COUNT_BACKEND",
          payload: dataNoti.user.newNotifications,
        });
      }
    }
  }, [loadingNoti, errorNoti, dataNoti]);

  // React.useEffect(() => {

  // }, [dataNoti]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    // if (loading) {
    //     setOptions(["loading..."]);
    // }
    // if (!loading && !error) {
    //     // setOptions(value ? searchResult(searchedUsers) : []);
    // }
  };

  const onSelect = (value) => {
    console.log("onSelect", value);
  };

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  React.useEffect(() => {
    // if (loading) {
    //     setOptions(["loading..."]);
    // }
    if (!loading && !error) {
      // setOptions(searchedUsers);
      // console.log("searchedUsers", searchedUsers);
      setOptions(searchTerm ? searchResult(searchedUsers) : []);
    }
  }, [loading, error, searchedUsers]);

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      style={{ zIndex: "999999" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      style={{ zIndex: "999999" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {JSON.parse(localStorage.getItem("user")).role === "Teacher" ? (
        <MenuItem onClick={props.uploadAttendance}>
          <UploadIcon />
          <p className="mt-2">Upload Attendance</p>
        </MenuItem>
      ) : (
        <MenuItem
          onClick={() => {
            navigate("/attendance");
          }}
        >
          <SchoolIcon />
          <p className="mt-2">Attendance</p>
        </MenuItem>
      )}
      <MenuItem onClick={props.notifications}>
        <IconButton
          size="large"
          // aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={newNoticationCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem
        onClick={props.star}
        onClick={() => {
          dispatch({ type: "SET_CURRENT_PAGE", payload: 6 });
        }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <StarIcon />
        </IconButton>
        <p className="mt-2">star Of Month</p>
      </MenuItem>
      <MenuItem
        onClick={props.tools}
        onClick={() => {
          dispatch({ type: "SET_CURRENT_PAGE", payload: 5 });
        }}
      >
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <HomeRepairServiceIcon />
        </IconButton>
        <p className="mt-2">Professional Tools</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          dispatch({ type: "SET_CURRENT_PAGE", payload: 7 });
        }}
      >
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ArticleIcon />
        </IconButton>
        <p>News</p>
      </MenuItem>
      <MenuItem onClick={props.notes}>
        <IconButton
          size="large"
          // aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={newNoticationCount} color="error">
            <MenuBookIcon />
          </Badge>
        </IconButton>
        <p>Notes</p>
      </MenuItem>
      <MenuItem onClick={props.logout}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <LogoutIcon />
        </IconButton>
        <p className="mt-2">Logout</p>
      </MenuItem>
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }} className="NavbarGk py-0">
      <AppBar
        position="static"
        className="py-0 "
        style={{ position: "fixed", top: 0, zIndex: "999999" }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              display: { xs: "none", sm: "block" },
              fontWeight: "600",
              padding: "0.1rem 1.4rem 0rem 0rem",
              fontSize: "1.4rem",
            }}
          >
            <img
              src={logo}
              alt="logo"
              className="logo mb-0"
              style={{ width: "55px", height: "55px" }}
            />
            {/* {props.name} */}
          </Typography>
          <div
            className="feedSearchBarDiv"
            style={{
              width: 300,
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <AutoComplete
              dropdownMatchSelectWidth={252}
              style={{
                width: 300,
              }}
              options={options}
              onSelect={onSelect}
              onSearch={handleSearch}
            >
              <Input.Search size="large" placeholder="Search ..." enterButton />
            </AutoComplete>
          </div>
          <Box sx={{ flexGrow: 1 }} />
          {/* <IconButton
                        size="large"
                        // aria-label="show 17 new notifications"
                        color="inherit"
                        className="mx-1"
                        onClick={props.notifications}
                    >
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <Badge
                                badgeContent={newNoticationCount}
                                color="error"
                            >
                                <NotificationsIcon
                                    style={{
                                        fontSize: "1.5rem",
                                    }}
                                />
                            </Badge>
                            <div
                                className=""
                                style={{
                                    margin: "0",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "0.8rem",
                                        color: "white",
                                        margin: "0",
                                    }}
                                >
                                    Notifications
                                </p>
                            </div>
                        </div>
                    </IconButton> */}
          {/* <Button
                        aria-haspopup="true"
                        aria-expanded={open2 ? "true" : undefined}
                        onClick={handleClick2}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <div>
                            <img
                                src={userData ? userData.profilePic : ""}
                                alt="user"
                                className="userPic"
                                style={{
                                    width: "25px",
                                    height: "25px",
                                    borderRadius: "50%",
                                }}
                            />
                        </div>
                        <div
                            className=""
                            style={{
                                margin: "0",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <p
                                style={{
                                    fontSize: "0.8rem",
                                    color: "white",
                                    margin: "0",
                                }}
                            >
                                Me
                            </p>
                            <ArrowDropDownIcon
                                style={{
                                    color: "white",
                                    width: "15px",
                                    height: "15px",
                                }}
                            />
                        </div>
                    </Button> */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl2}
            open={open2}
            onClose={handleClose2}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                 props.chatwindow();
              }}
            >
              <ChatIcon style={{ marginRight: "20px" }} />
               chat window
            </MenuItem>
            {JSON.parse(localStorage.getItem("user")).role === "Teacher" ? (
              <MenuItem
                onClick={(e) => {
                  handleClose2(e);
                  props.uploadAttendance();
                }}
              >
                <UploadIcon style={{ marginRight: "20px" }} />
                Upload Attendance
              </MenuItem>
            ) : (
              <MenuItem
                onClick={(e) => {
                  handleClose2(e);
                  navigate("/attendance");
                }}
              >
                <SchoolIcon style={{ marginRight: "20px" }} />
                View Attendance
              </MenuItem>
            )}
            <MenuItem
              onClick={(e) => {
                handleClose2(e);
                dispatch({
                  type: "SET_CURRENT_PAGE",
                  payload: 7,
                });
              }}
            >
              <NewspaperIcon style={{ marginRight: "20px" }} />
              News
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                handleClose2(e);
                props.notes();
              }}
            >
              <MenuBookIcon style={{ marginRight: "20px" }} />
              Study Material
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                handleClose2(e);
                dispatch({
                  type: "SET_CURRENT_PAGE",
                  payload: 5,
                });
              }}
            >
              <HomeRepairServiceIcon style={{ marginRight: "20px" }} />
              Utilities
            </MenuItem>
            <MenuItem
              onClick={(e) => {
                handleClose2(e);
                dispatch({
                  type: "SET_CURRENT_PAGE",
                  payload: 6,
                });
              }}
            >
              <StarIcon style={{ marginRight: "20px" }} />
              Popular Posts
            </MenuItem>
            <hr />
            <MenuItem
              onClick={(e) => {
                handleClose2(e);
                props.logout();
              }}
            >
              <LogoutIcon style={{ marginRight: "20px" }} />
              Logout
            </MenuItem>
          </Menu>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              aria-label="delete"
              className="mx-1"
              color="inherit"
              onClick={() => {
                props.chatwindow();
              }}
            >
              <ChatIcon />
            </IconButton>
            {JSON.parse(localStorage.getItem("user")).role === "Teacher" ? (
              <IconButton
                size="large"
                color="inherit"
                className="mx-1"
                onClick={props.uploadAttendance}
              >
                <UploadIcon />
              </IconButton>
            ) : (
              <IconButton
                size="large"
                color="inherit"
                className="mx-1"
                onClick={() => {
                  navigate("/attendance");
                }}
              >
                <SchoolIcon />
              </IconButton>
            )}
            <IconButton
              size="large"
              color="inherit"
              className="mx-1"
              onClick={() => {
                dispatch({
                  type: "SET_CURRENT_PAGE",
                  payload: 7,
                });
              }}
            >
              <ArticleIcon />
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              className="mx-1"
              onClick={props.notes}
            >
              <MenuBookIcon />
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              className="mx-1"
              onClick={() => {
                dispatch({
                  type: "SET_CURRENT_PAGE",
                  payload: 5,
                });
              }}
            >
              <HomeRepairServiceIcon />
            </IconButton>
            <IconButton
              size="large"
              color="inherit"
              className="mx-1"
              onClick={() => {
                dispatch({
                  type: "SET_CURRENT_PAGE",
                  payload: 6,
                });
              }}
            >
              <StarIcon />
            </IconButton>
            <IconButton
              size="large"
              // aria-label="show 17 new notifications"
              color="inherit"
              className="mx-1"
              onClick={props.notifications}
            >
              <Badge badgeContent={newNoticationCount} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            <IconButton
              onClick={props.logout}
              className="mx-1"
              size="large"
              aria-label="show 4 new mails"
              color="inherit"
            >
              <LogoutIcon />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      <div style={{ marginTop: "4rem" }}></div>
    </Box>
  );
}
