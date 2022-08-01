import React from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";

const FamilyImage = () => {
  return (
    <Box>
      <Link to="/">
        <Box component="img" src="/static/family.png" width={400} alt="logo"  style={{ position:"absolute", left:"26%", bottom:"0" }} />
      </Link>
    </Box>
  );
};

export default FamilyImage;
