import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { ClassNames } from "@emotion/react";
import { toggleSnackbar } from "../redux/slices/user.slice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MessageSnackbar() {
  const [open, setOpen] = React.useState(false);
const dispatch = useDispatch();

  const { showSnackbar, message, severity } = useSelector((state) => state.user.snackbar);

  React.useEffect(() => {
    setOpen(showSnackbar);
  } , [showSnackbar]);
  

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(toggleSnackbar({ showSnackbar: false }));
    setOpen(false);
  };

  return (
    <Snackbar anchorOrigin={{ vertical:"top", horizontal:"center" }} open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
