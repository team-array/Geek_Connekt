import React from "react";
import { EventsContainer } from "./Events.styles";
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
import {useDispatch,useSelector} from 'react-redux';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import axios from "axios";
import { BaseUrl } from "../../../constants";

const Events = () => {
  const [value, setValue] = React.useState(new Date());
  const [events, setEvents] = React.useState([]);
  const reloadEvents = useSelector(state => state.reloadEvents);
  const dispatch = useDispatch();
  const eventform = () => {
    dispatch({ type: "SET_ADD_EVENTS", payload: true });
  }
  const getDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }
  Date.prototype.addDays = function(days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  }

  React.useEffect(() => {
    const getEvents = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      let start=getDate(value);
      let end=getDate(value.addDays(1));
      try{
        const response = await axios({
          method: "post",
          url: `${BaseUrl}/getEvents`,
          data: {
            EventDate: {
              start,
              end
            },
            token: localStorage.getItem("jwt")
          },
          headers: {
            "Content-Type": "application/json",
          },
        });
        dispatch({ type: "SET_LOADING", payload: false });
        if(response.data.success){
          console.log(response.data.events);
          setEvents(response.data.events);
        }
      }catch(err){
        dispatch({ type: "SET_LOADING", payload: false });
        console.log(err);
      }
    }
    getEvents();
  },[value,reloadEvents]);
  console.log(JSON.parse(localStorage.getItem("user")).role)
  return (
    <>
    {
      (JSON.parse(localStorage.getItem("user")).role === "Student") ?"":
        <AddEvents/>
    }
    <EventsContainer  data-aos="fade-down" className="Events">
      {
        (JSON.parse(localStorage.getItem("user")).role === "Student") ? <div className="Events-title mb-5"></div>:
        <Button className="mb-4" onClick={eventform}><AddBoxIcon style={{marginBottom:"0.2rem"}}/> &nbsp; Add Events</Button>
      }
      <div className="shadow-sm card" style={{display: 'flex', flexDirection: 'row',justifyContent: 'space-between',flexWrap:"wrap"}}>
        <LocalizationProvider className="mx-auto" style={{fontSize:"2rem",width:"600px"}} dateAdapter={AdapterDateFns}>
          <StaticDatePicker
            orientation="landscape"
            openTo="day"
            value={value}
            onChange={(newValue) => {

              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <div className="mx-auto EventBox" style={{overflowY:(events.length !== 0)?"scroll":"auto",width: "100%",maxWidth:"400px",borderLeft:(events.length !== 0)?"1px solid #bbb":"none" }}>
          
          <List
            sx={{ width: "100%", bgcolor: "background.paper", }}
            className="mt-3 mx-0"
          >
          <p className="text-center mb-0" style={{zIndex:"9999",fontSize:"1.4rem"}}><EventAvailableIcon style={{marginBottom:"0.22rem"}}/>  Events</p>
          <p className="text-center text-muted font-italic mb-3" style={{zIndex:"9999",fontSize:"0.8rem"}}>on {`${
            value.getDate()}-${value.getMonth() + 1}-${value.getFullYear()}`}
          </p>
          {
            (events.length === 0) ?(
              <div className="text-center text-muted font-italic mb-3" style={{zIndex:"9999",fontSize:"1.2rem"}}>No Events</div>
            ):(
            events.map((event,index) => {
              return (
                <>
                <IconButton style={{display:"block",borderRadius:"0",padding:0,width:"100%"}}
                  onClick={() => {
                    window.location.href=event.EventLink;
                  }}
                >

                <ListItem alignItems="flex-start" className="ml-3">
                  {/* <ListItemAvatar>
                  </ListItemAvatar> */}
                  
                  <ListItemText
                    primary={event.EventName}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {event.EventSubtitle}
                        </Typography>
                        {` — ${event.EventDescription}`}
                      </React.Fragment>
                    }
                  />
                </ListItem>
              </IconButton>
              {
                (index !== events.length-1)?
                      <Divider  component="li" />:""
              }
              </>
              )
          }))
          }
          </List>
        </div>
      </div>
    </EventsContainer>
    </>
  );
};

export default Events;

