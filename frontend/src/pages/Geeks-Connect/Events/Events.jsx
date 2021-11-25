import React from "react";
import { EventsContainer } from "./Events.styles";
import isWeekend from "date-fns/isWeekend";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import StaticDatePicker from "@mui/lab/StaticDatePicker";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import "./Events.scss"
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddEvents from "./AddEvents/AddEvents";
import {useDispatch} from 'react-redux';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

const Events = () => {
  const [value, setValue] = React.useState(new Date());
  const dispatch = useDispatch();
  const eventform = () => {
    dispatch({ type: "SET_ADD_EVENTS", payload: true });
  }
  return (
    <>
        <AddEvents/>
    <EventsContainer  data-aos="fade-down" className="Events">
        <Button className="mb-4" onClick={eventform}><AddBoxIcon style={{marginBottom:"0.2rem"}}/> &nbsp; Add Events</Button>
      <div className="shadow-sm card" style={{display: 'flex', flexDirection: 'row',justifyContent: 'space-between',flexWrap:"wrap"}}>
        <LocalizationProvider className="mx-auto" style={{fontSize:"2rem",width:"600px"}} dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            orientation="landscape"
            openTo="day"
            value={value}
            shouldDisableDate={isWeekend}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <div className="mx-auto EventBox" style={{overflowY:"scroll",width: "100%",maxWidth:"400px" }}>
          
          <List
            sx={{ width: "100%", bgcolor: "background.paper", }}
            className="mt-3 mx-0"
          >
          <p className="text-center mb-0" style={{zIndex:"9999",fontSize:"1.4rem"}}><EventAvailableIcon style={{marginBottom:"0.22rem"}}/>  Events</p>
          <p className="text-center text-muted font-italic mb-3" style={{zIndex:"9999",fontSize:"0.8rem"}}>on {`${
            value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`}
          </p>
          <IconButton style={{display:"block",borderRadius:"0",padding:0,width:"100%"}}>

            <ListItem alignItems="flex-start" className="ml-3">
              {/* <ListItemAvatar>
              </ListItemAvatar> */}
              
              <ListItemText
                primary="Brunch this weekend?"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Ali Connors
                    </Typography>
                    {" — I'll be in your neighborhood doing errands this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </IconButton>
            <Divider  component="li" />
            <IconButton style={{display:"block",borderRadius:"0",padding:0,width:"100%"}}>

            <ListItem alignItems="flex-start">
              {/* <ListItemAvatar>
              </ListItemAvatar> */}
              <ListItemText
                primary="Summer BBQ"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      to Scott, Alex, Jennifer
                    </Typography>
                    {" — Wish I could come, but I'm out of town this…"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </IconButton>
            <Divider component="li" />
            <IconButton style={{display:"block",borderRadius:"0",padding:0,width:"100%"}}>

            <ListItem alignItems="flex-start">
              {/* <ListItemAvatar>
              </ListItemAvatar> */}
              <ListItemText
                primary="Oui Oui"
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      Sandra Adams
                    </Typography>
                    {" — Do you have Paris recommendations? Have you ever…"}
                  </React.Fragment>
                }
              />
            </ListItem>
          </IconButton>
          </List>
        </div>
      </div>
    </EventsContainer>
    </>
  );
};

export default Events;
