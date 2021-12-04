import React from "react";
import UtilityCard from "./UtilityCard/UtilityCard";
import { Utility, UtilityAddCard } from "./ProfessionalTools.styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch,useSelector } from "react-redux";
import UtilityForm from "./UtilityForm/UtilityForm";
import axios from "axios";
import {BaseUrl} from "../../../constants";

const ProfessionalTools = () => {

  const dispatch = useDispatch();
  const [utilities,setUtilities] = React.useState([]);
  const reloadUtilities = useSelector((state) => state.reloadUtilities);
  const setUtility = () => {
    dispatch({ type: "SET_ADD_UTILITY", payload: true });
  };
  React.useEffect(()=>{
    const getutility = async () => {
      try{
        dispatch({ type: "SET_LOADING", payload: true });
        const response = await axios.post(
          `${BaseUrl}/getutilities`,
            {
              token:localStorage.getItem("jwt")
            }
        );
        dispatch({ type: "SET_LOADING", payload: false });
        if(response.data.success){
          console.log(response);
          setUtilities(response.data.utilities);
        }
      }catch(err){
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }
    getutility();
  },[reloadUtilities]);
  return (
    <>
      <UtilityForm />
      <h3
        className="text-center text-uppercase"
        style={{
          marginTop: "6rem",
          fontFamily: "Helvetica",
          fontWeight: "550",
          width: "max-content",
          display: "block",
          marginLeft: "auto",
          marginRight: "auto",
          paddingBottom: "7px",
          borderBottom: "3.4px solid #222",
          color: "#333",
        }}
      >
        Utilities
      </h3>
      <Utility >
        {
          utilities.map((utility)=>
            <UtilityCard
              title={utility.data.title}
              myrating={utility.data.myrating}
              rating={utility.data.rating}
              features={utility.data.features}
              description={utility.data.description}
              websitelink={utility.data.websitelink}
            />
          )
        }
        {
          (JSON.parse(localStorage.getItem("user")).role === "Student") ? "":
          <UtilityAddCard className="shadow my-4 mx-4 py-5">
          <h4
            className="text-center text-uppercase"
            style={{
              // left: "50%",
              // transform: "translateX(-50%)",
              // backgroundColor: "#666",
            }}
          >
            Add Utility
          </h4>
          <Fab
            color="primary"
            aria-label="add"

            style={{
              display: "block",
              // backgroundColor: "#666",
            }}
            onClick={setUtility}
          >
            <AddIcon />
          </Fab>
        </UtilityAddCard>
        }
      </Utility>
    </>
  );
};

export default ProfessionalTools;
