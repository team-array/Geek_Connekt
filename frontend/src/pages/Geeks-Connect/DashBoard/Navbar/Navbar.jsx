import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
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
import {BaseUrl,ClientUrl} from "../../../../constants";
import MenuBookIcon from '@mui/icons-material/MenuBook';

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
                            href={ClientUrl+`/#/user/${user._id}`}
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

    const newNoticationCount = useSelector(
        (state) => state.newNotificationCount
    );

    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = React.useState("");

    const { loading, error, searchedUsers, hasMore, setPageNumber } =
        SearchHook(searchTerm, 1);

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
                url: BaseUrl+`/getNotifications`,
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
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
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
                <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                >
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
                <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                >
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
                <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                >
                    <LogoutIcon />
                </IconButton>
                <p className="mt-2">Logout</p>
            </MenuItem>
        </Menu>
    );
    return (
        <Box sx={{ flexGrow: 1 }} className="NavbarGk">
            <AppBar
                position="static"
                className="py-0"
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
                    <AutoComplete
                        dropdownMatchSelectWidth={252}
                        style={{
                            width: 300,
                        }}
                        options={options}
                        onSelect={onSelect}
                        onSearch={handleSearch}
                    >
                        <Input.Search
                            size="large"
                            placeholder="Search ..."
                            enterButton
                        />
                    </AutoComplete>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
                            <Badge
                                badgeContent={newNoticationCount}
                                color="error"
                            >
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            className="mx-1"
                            size="large"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
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
