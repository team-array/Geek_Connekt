import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import {useSelector} from 'react-redux';

const Spinner = () => {
    const loading = useSelector(state => state.loading);
    return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => 999999999 }}
        open={loading}
        // onClick={handleClose}
      >
        <CircularProgress color="primary" style={{color:"blue"}}/>
      </Backdrop>
    )
}

export default Spinner
