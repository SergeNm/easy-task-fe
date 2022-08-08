import React from "react";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import AllKids from "./AllKids";
import Requests from "./SingleTask";
import NewKid from "./NewKidModal";

const Parent = () => {
  const { tab } = useSelector((state) => state.user);
  console.log("🚀 ~ file: Parent.jsx ~ line 8 ~ Parent ~ tab", tab);
  return tab === "Kids" ? (
    <div>
      {/* <Stack direction="row" spacing={2}>
        <Button variant="outlined" startIcon={<AddIcon />}>
          Add Children
        </Button>
      </Stack> */}
      <NewKid />
      <AllKids />
    </div>
  ) : tab === "Requests" ? (
    <>
      <Requests />
      <Requests />
    </>
  ) : (
    <div>Parent</div>
  );
};

export default Parent;
