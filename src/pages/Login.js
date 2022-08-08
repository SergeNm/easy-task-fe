import React, { useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Container, Typography, Link, Box, Divider, Grid } from "@mui/material";
import styled from "@emotion/styled";
import LoginForm from "../components/LoginForm";
import { motion } from "framer-motion";
import FamilyImage from "../components/FamilyImage";

const ContentStyle = styled("div")({
  maxWidth: 480,
  padding: "1em",
  margin: "1em",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  background: "white",
  minWidth: 320,
  borderRadius: "1em",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
});

let easing = [0.6, -0.05, 0.01, 0.99];
export const fadeInUp = {
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

const Login = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  useEffect(() => {
    if (token ) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);
  return (
    <Box
      component="div"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // marginTop: "2em",
      }}
    >
      <Grid
        container
        sx={{
          width: {
            xs: "100%",
            sm: "100%",
            md: "75%",
          },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid item xs={12} sm={4}>
          <Box
            sx={{
              background: "#51C8BC",
              width: "30vw",
              height: "100vh",
              borderRadius: "1em",
              boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography
              variant="h3"
              sx={{
                color: "white",
                textAlign: "center",
                padding: "1em",
              }}
            >
              Easy task !
            </Typography>
            <FamilyImage />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Container maxWidth="sm">
            <ContentStyle>
              <Box component={motion.div} {...fadeInUp}>
                Login
              </Box>
              <LoginForm />
              <Divider sx={{ my: 3 }} component={motion.div} {...fadeInUp}>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  OR
                </Typography>
              </Divider>
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
