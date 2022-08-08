import * as React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Paper } from "@mui/material";
import FeedbackInputText from "./FeedbackInputText";
import TaskComments from "./TaskComments";
import { useDispatch, useSelector } from "react-redux";
import { fetchKidComments } from "../redux/thunks/parent.thunk";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SingleTask({
  name,
  start_date,
  end_date,
  description,
  id,
  userId,
}) {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const {comments} = useSelector((state) => state.parent);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleComments = () => {
    handleExpandClick()
    dispatch(fetchKidComments({ taskid: id, id: userId }));
  }

  return (
    <Card sx={{ minWidth: 345 }}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={"from: " + start_date + " to: " + end_date}
      />

      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleComments}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>FeedBack</Typography>

          <FeedbackInputText taskId={id} userId={userId} />
          {comments.length > 0 && <TaskComments comments={comments} />}
        </CardContent>
      </Collapse>
    </Card>
  );
}
