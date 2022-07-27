import React from "react";
import { Button, Typography, Container, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import "@mobiscroll/react/dist/css/mobiscroll.min.css";
import { Eventcalendar, getJson, toast } from "@mobiscroll/react";
// import Logo from "../components/Logo";
//////////////////////////////////////

const Home = ({ setAuth }) => {
  const theme = useTheme();

  const [myEvents, setEvents] = React.useState([]);

  React.useEffect(() => {
    getJson(
      "https://trial.mobiscroll.com/events/?vers=5",
      (events) => {
        setEvents(events);
      },
      "jsonp"
    );
  }, []);

  const onEventClick = React.useCallback((event) => {
    toast({
      message: event.event.title,
    });
  }, []);

  const view = React.useMemo(() => {
    return {
      schedule: { type: "day" },
    };
  }, []);

  return (
    <Eventcalendar
      theme="ios"
      themeVariant="light"
      clickToCreate={true}
      dragToCreate={true}
      dragToMove={true}
      dragToResize={true}
      eventDelete={true}
      data={myEvents}
      view={view}
      onEventClick={onEventClick}
    />

    // <Container
    //   maxWidth="lg"
    //   sx={{
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     flexDirection: "column",
    //     height: "100vh",
    //   }}
    // >
    //   <Box sx={{ mb: 5, mt: -10 }}>
    //     {/* <Logo /> */}
    //   </Box>
    //   <Typography
    //     sx={{
    //       textAlign: "center",
    //       marginTop: "-4rem",
    //       fontSize: "5rem",
    //       fontWeight: 700,
    //       letterSpacing: "-0.5rem",
    //       display: "inline-block",
    //       whiteSpace: "nowrap",
    //       [theme.breakpoints.down("sm")]: {
    //         fontSize: "4rem",
    //         letterSpacing: "-0.4rem",
    //       },
    //     }}
    //     gutterBottom
    //   >
    //     Welcome Back
    //   </Typography>

    //   <Button size="large" variant="contained" onClick={() => setAuth(false)}>
    //     Log out
    //   </Button>
    // </Container>
  );
};


export default Home;
