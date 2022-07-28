import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Container, Typography, Link, Box, Divider, Grid } from "@mui/material";
import styled from "@emotion/styled";
import LoginForm from "../components/LoginForm";
import { motion } from "framer-motion";
import FamilyImage from "../components/FamilyImage";

const HeadingStyle = styled(Box)({
  textAlign: "center",
});

const ContentStyle = styled("div")({
  maxWidth: 480,
  padding: "1em",
  margin: "1em",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: "white",
  minWidth:320,
});

let easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
    transition: { duration: 0.6, ease: easing },
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const Login = ({ setAuth }) => {
  return (
    <Box
      component="div"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "2em",
      }}
    >
      <Grid container sx={{width:{
        xs: "100%",
        sm: "100%",
        md: "80%",
      }, background: "#51C8BC",}}>
        <Grid item xs={12} sm={4}>
          <FamilyImage />
        </Grid>
        <Grid item xs={6}>
          <Container maxWidth="sm">
            <ContentStyle>
              <HeadingStyle component={motion.div} {...fadeInUp}>
                {/* <Logo /> */}
                <Typography sx={{ color: "text.secondary", mb: 5 }}>
                  Login to your account
                </Typography>
              </HeadingStyle>

              <Box component={motion.div} {...fadeInUp}>
                Login..........
              </Box>

              <Divider sx={{ my: 3 }} component={motion.div} {...fadeInUp}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  OR
                </Typography>
              </Divider>

              <LoginForm setAuth={setAuth} />

              <Typography
                component={motion.p}
                {...fadeInUp}
                variant="body2"
                align="center"
                sx={{ mt: 3 }}
              >
                Don’t have an account?{" "}
                <Link variant="subtitle2" component={RouterLink} to="/signup">
                  Sign up
                </Link>
              </Typography>
            </ContentStyle>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Login;
