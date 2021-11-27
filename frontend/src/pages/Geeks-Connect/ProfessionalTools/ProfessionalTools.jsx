import React from "react";
import UtilityCard from "./UtilityCard/UtilityCard";
import { Utility, UtilityAddCard } from "./ProfessionalTools.styles";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import UtilityForm from "./UtilityForm/UtilityForm";


const ProfessionalTools = () => {

  const dispatch = useDispatch();
  const setUtility = () => {
    dispatch({ type: "SET_ADD_UTILITY", payload: true });
  };
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
        <UtilityCard
          title="Porfolyo"
          myrating={4.5}
          rating={4.5}
          features={["easy to use", "effective", "time saving", "usefull"]}
          description="Porfolyo is a tool that helps you to manage your professional life. It helps you to manage your time, manage your projects, and manage your tasks. It is a tool that helps you to manage your professional life. "
        />
        <UtilityCard
          title="Porfolyo"
          myrating={null}
          rating={4.5}
          features={["easy to use", "effective", "time saving", "usefull"]}
          description="Porfolyo is a tool that helps you to manage your professional life. It helps you to manage your time, manage your projects, and manage your tasks. It is a tool that helps you to manage your professional life. "
        />
        <UtilityCard
          title="Porfolyo"
          myrating={4.5}
          rating={4.5}
          features={["easy to use", "effective", "time saving", "usefull"]}
          description="Porfolyo is a tool that helps you to manage your professional life. It helps you to manage your time, manage your projects, and manage your tasks. It is a tool that helps you to manage your professional life. "
        />
        <UtilityCard
          title="Porfolyo"
          myrating={4.5}
          rating={4.5}
          features={["easy to use", "effective", "time saving", "usefull"]}
          description="Porfolyo is a tool that helps you to manage your professional life. It helps you to manage your time, manage your projects, and manage your tasks. It is a tool that helps you to manage your professional life. "
        />
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
      </Utility>
    </>
  );
};

export default ProfessionalTools;
