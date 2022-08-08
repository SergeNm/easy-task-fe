import { useState } from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";
import MessageSnackbar from "./components/MessageSnackbar";

function App() {
  const token = localStorage.getItem("token");

  const user = token && jwt(token);
  // const { user } = useSelector((state) => state.user);
  const location = useLocation();


  return (
    <>
      <CssBaseline />
      <MessageSnackbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/"
          element={
            user && user.role === "kid" ? (
              <Home
                role="kid"
                menuItems={["Daily tasks", "All tasks"]}
                menuItems2={["logout"]}
              />
            ) : user && user.role === "Parent" ? (
              // <Navigate to="/login" state={{ from: location }} replace />
              <Home
                role="parent"
                menuItems={["Requests", "Kids"]}
                menuItems2={["logout"]}
              />
            ) : (
              <Navigate to="/login" state={{ from: location }} replace />
              // <Home setAuth={setAuth} menuItems={["Requests", "Kids"]} menuItems2={["logout"]} />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
