import React from "react";
import UtilityCard from "./UtilityCard/UtilityCard";
import { Utility, UtilityAddCard } from "./ProfessionalTools.styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import UtilityForm from "./UtilityForm/UtilityForm";
import axios from "axios";
import {BaseUrl} from "../../../constants";

const ProfessionalTools = () => {

  const dispatch = useDispatch();
  const [utilities,setUtilities] = React.useState([]);
  const setUtility = () => {
    dispatch({ type: "SET_ADD_UTILITY", payload: true });
  };
  React.useEffect(()=>{
    const getutility = async () => {
      const response = await axios.post(
        `${BaseUrl}/getutilities`,
          {
            token:localStorage.getItem("jwt")
          }
      );
      if(response.data.success){
        console.log(response);
        setUtilities(response.data.utilities);
      }
    }
    getutility();
  },[]);
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
      <Utility>
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
          <UtilityAddCard className="shadow my-4">
          <h4
            className="text-center text-uppercase"
            style={{
              position: "relative",
              top: "40px",
              left: "50%",
              transform: "translateX(-50%)",
              // backgroundColor: "#666",
            }}
          >
            Add Utility
          </h4>
          <Fab
            color="primary"
            aria-label="add"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
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
