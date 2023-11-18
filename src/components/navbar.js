import React from "react";
import { AppBar, Typography, Box } from "@mui/material";
import { format } from "date-fns";

const Navbar = () => {
  const today = format(new Date(), "EEEE, MMMM do");

  return (
    <AppBar
      position="static"
      sx={{
        background: "#0F1014",
        padding: "20px",
        marginBottom: "30px",
        borderRadius: "15px",
        marginTop: "50px",
        flexDirection: "column",
        boxShadow: "none",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" fontWeight="bold" sx={{ flexGrow: 1 }}>
        OneDo
      </Typography>
      <Box>
        <Typography variant="h6">{today}</Typography>
      </Box>
    </AppBar>
  );
};

export default Navbar;
