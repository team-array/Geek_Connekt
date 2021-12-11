import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function Navbar(props) {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                className="shadow-sm"
                position="static"
                style={{ padding: "0.1rem 1.6rem", backgroundColor: "#fff" }}
            >
                <Toolbar>
                    <Typography
                        variant="h6"
                        className="text-dark"
                        component="div"
                        sx={{
                            color: "#1e72e8",
                            flexGrow: 1,
                            fontSize: "1.9rem",
                            fontWeight: "600",
                            fontFamily: "Barlow",
                        }}
                    >
                        {props.name}
                    </Typography>
                    <Button
                        onClick={props.sigIn_func}
                        color="inherit"
                        className="text-dark mt-1"
                        sx={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            color: "#1e72e8",
                            padding: "0.6rem 1.5rem !important",
                        }}
                    >
                        {props.action2}
                    </Button>
                    <Button
                        onClick={props.action_func}
                        className="text-dark mt-1"
                        sx={{
                            fontSize: "1rem",
                            fontWeight: "600",
                            color: "white !important",
                            backgroundColor: "#1365C0",
                            padding: "0.6rem 1.5rem !important",
                        }}
                    >
                        {props.action}
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
