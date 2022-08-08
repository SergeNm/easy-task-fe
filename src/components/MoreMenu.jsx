import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreIcon from "@mui/icons-material/MoreVert";
import { requestForReview } from "../redux/thunks/task.thunk";
import { useDispatch, useSelector } from "react-redux";
import { toggleSnackbar } from "../redux/slices/user.slice";

export default function MoreMenu() {
  const dispatch = useDispatch();
  const { task, error } = useSelector((state) => state.task);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleRequestReview = async () => {
    handleClose();
    const res = await dispatch(requestForReview({ id: task.id }));
    console.log("🚀 ~ file: MoreMenu.jsx ~ line 24 ~ handleRequestReview ~ res", res)
    if (res.error) {
      dispatch(
        toggleSnackbar({
          showSnackbar: true,
          message: res.payload.message,
          severity: "error",
        })
      );
    } else if (res.payload.message) {
      dispatch(
        toggleSnackbar({
          showSnackbar: true,
          message: res.payload.message,
          severity: "success",
        })
      );
    } else {
      dispatch(
        toggleSnackbar({
          showSnackbar: true,
          message: "Request for review sent",
          severity: "success",
        })
      );
    }
  };

  return (
    <div>
      <span
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MoreIcon />
      </span>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleRequestReview}>Request for review</MenuItem>
        <MenuItem onClick={handleClose}>Mark as started</MenuItem>
        {/* <MenuItem onClick={handleClose}>Logout</MenuItem> */}
      </Menu>
    </div>
  );
}
