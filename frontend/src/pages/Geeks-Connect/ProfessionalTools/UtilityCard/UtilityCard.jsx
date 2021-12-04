import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import axios from "axios";
import {BaseUrl} from "../../../../constants";

const UtilityCard = (props) => {
  const [myrating, setMyRating] = React.useState(props.myrating);
  const [avgrating, setAvgRating] = React.useState(props.rating);
  console.log(myrating);
  const GiveRating = async (rating) => {
    if(myrating === -1){
      try{
        const response = await axios.post(
          BaseUrl + "/updateRating",
          {
            rating: rating,
            token: localStorage.getItem("jwt"),
            title:props.title
          }
        );
        console.log(response);
        if(response.data.success){
          setMyRating(rating);
          setAvgRating(response.data.rating);
        }
      }catch(err){
        console.log(err);
      }
    }
    else{
      alert("You have already given rating");
    }
  };
  const [hover,setHover] = React.useState(false);
  return (
    <div className="UtilityCard mt-4 mx-4">
      <Box
        className={`shadow p-3`}
        sx={{ bgcolor: "background.paper",height: "100%" }}
      >
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4" component="div">
                {props.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6" component="div">
                {avgrating === -1 ? "No Rating" : `Rating ${avgrating}`}
              </Typography>
            </Grid>
          </Grid>
          <Typography color="text.secondary" variant="body2">
            {props.description}
          </Typography>
        </Box>
        <Divider variant="middle" />
        <Box sx={{ m: 2 }}>
          <Typography gutterBottom variant="body1">
            features and usage
          </Typography>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
            }}
            direction="row"
          >
            {props.features.map((feature) => (
              <Chip className="mt-2" label={feature} />
            ))}
          </Box>
        </Box>
        <Box
          sx={{ mt: 3, ml: 1, mb: 1 }}
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          <div style={{ width: "max-content", marginLeft: "0.5rem" }}>
            {myrating === -1 ? (
              <>
                <h6 style={{ display: "block", width: "max-contant" }}>
                  No rating given
                </h6>
                <Rating
                  name="simple-controlled"
                  value={0}
                  onChange={(event, newValue) => {
                    GiveRating(newValue);
                  }}
                />

              </>
            ) : (
              <>
                <h6 style={{ display: "block", width: "max-contant" }}>
                  my rating
                </h6>
                <Rating
                  name="read-only"
                  value={myrating}
                  readOnly
                />
              </>
            )}
          </div>
          <Button
            style={{
              display: "block",
              width: "max-content",
              marginRight: "10px",
            }}
            onClick={() => {
              window.location.href = props.websitelink;
            }}
          >
            visit website
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default UtilityCard;
