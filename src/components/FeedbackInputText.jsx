import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import { createCommentOfTask } from "../redux/thunks/parent.thunk";
import { useDispatch } from "react-redux";
import { toggleSnackbar } from "../redux/slices/user.slice";

export default function FeedbackInputText({ taskId, userId }) {
  const dispatch = useDispatch();
  const [comment, setComment] = React.useState("");

  const handleAddComment = async (e) => {
    e.preventDefault();
    const res = await dispatch(
      createCommentOfTask({ taskid: taskId, id: userId, comment })
    );
    e.target.value = "";
    if (res.payload.id) {
      dispatch(
        toggleSnackbar({
          showSnackbar: true,
          message: "Comment added successfully",
          severity: "success",
        })
      );
    } else {
      dispatch(
        toggleSnackbar({
          showSnackbar: true,
          message: "Something went wrong",
          severity: "error",
        })
      );
    }
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Enter your feedback"
        inputProps={{ "aria-label": "Enter your feedback" }}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <IconButton
        type="submit"
        sx={{ p: "10px" }}
        aria-label="search"
        onClick={handleAddComment}
      >
        <SendIcon />
      </IconButton>
    </Paper>
  );
}
