import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import FeedIcon from '@mui/icons-material/Feed';
import PersonIcon from '@mui/icons-material/Person';
import EventNoteIcon from '@mui/icons-material/EventNote';
import "./Footer.scss";
import {useDispatch} from "react-redux";


export default function Footer() {
  const disp = useDispatch();
  const [value, setValue] = React.useState(0);

  return (
    <Box className="shadow-lg" color="primary" sx={{ width: "100vw",position:"fixed",bottom:"0",zIndex:"999999"}}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          disp({type:"SET_CURRENT_PAGE",payload:newValue});
          setValue(newValue);
        }}
      >
        <BottomNavigationAction 
        className="py-md-1"
        label="Feed" icon={<FeedIcon />} />
         <BottomNavigationAction 
        className="py-md-1"
        label="Favorites" icon={<FavoriteIcon />} />
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