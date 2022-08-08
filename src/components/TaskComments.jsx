import { Paper, Typography } from "@mui/material";
import React from "react";

const TaskComments = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <Paper variant="outlined">
          <Typography paragraph>{comment.comment}</Typography>
        </Paper>
      ))}
    </div>
  );
};

export default TaskComments;
