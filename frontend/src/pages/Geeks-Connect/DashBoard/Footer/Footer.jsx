import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import FeedIcon from '@mui/icons-material/Feed';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import "./Footer.scss";
import {useDispatch,useSelector} from "react-redux";
import BookmarkIcon from '@mui/icons-material/Bookmark';


export default function Footer() {
  const disp = useDispatch();
  const currentPage = useSelector(state => state.currentPage);

  return (
    <Box className="shadow-lg" color="primary" sx={{ width: "100vw",position:"fixed",bottom:"0",zIndex:"999999"}}>
      <BottomNavigation
        showLabels
        value={currentPage}
        onChange={(event, newValue) => {
          disp({type:"SET_CURRENT_PAGE",payload:newValue});
        }}
      >
        <BottomNavigationAction 
        className="py-md-1"
        label="Feed" icon={<FeedIcon />} />
         <BottomNavigationAction 
        className="py-md-1"
        label="Saved" icon={<BookmarkIcon />} />
        <BottomNavigationAction 
        className="py-md-1"
        label="New Post" icon={<AddAPhotoIcon />} />
        <BottomNavigationAction 
        className="py-md-1"
        label="Events" icon={<EventNoteIcon />} />
         <BottomNavigationAction 
        className="py-md-1"
        label="Profile" icon={<PersonIcon />} />
      </BottomNavigation>
    </Box>
  );
}