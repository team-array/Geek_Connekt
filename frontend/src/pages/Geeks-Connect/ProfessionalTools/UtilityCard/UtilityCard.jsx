import React from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Rating from '@mui/material/Rating';

const UtilityCard = (props) => {
  return (
    <div className="UtilityCard my-4">
      <Box className="shadow p-3" sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <Box sx={{ my: 3, mx: 2 }}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4" component="div">
                {props.title}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom variant="h6" component="div">
                Rating 4.5
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
          <Box  style={{display: 'flex', flexDirection:"row",flexWrap: 'wrap',justifyContent: 'space-between'}} direction="row">
            {props.features.map((feature) => (
                <Chip className="mt-2" label={feature} />
            ))}
          </Box>
        </Box>
        <Box sx={{ mt: 3, ml: 1, mb: 1 }} style={{display: 'flex', flexWrap: 'wrap',justifyContent: 'space-between'}}>
          <div style={{width:"max-content",marginLeft:"0.5rem"}}>
            {
                props.myrating===null || props.myrating===undefined ?(
                    <>
                        <h6  style={{display:"block",width:"max-contant"}}>No rating given</h6>
                        <Rating name="no-value" value={null} />
                    </>
                ):(
                    <>
                        <h6  style={{display:"block",width:"max-contant"}}>my rating</h6>
                        <Rating name="read-only" value={props.myrating} readOnly />
                    </>
                )
            }
          </div>
          <Button style={{display:"block",width:"max-content",marginRight:"10px"}}>visit website</Button>
        </Box>
      </Box>
    </div>
  );
};

export default UtilityCard;
