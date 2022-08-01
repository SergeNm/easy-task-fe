import { useState } from "react";
import { CssBaseline } from "@mui/material";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";
import jwt from "jwt-decode";


function App() {
  const [auth, setAuth] = useState(false);
  const token = localStorage.getItem("token");
  const user = token && jwt(token);
  // const { user } = useSelector((state) => state.user);
  const location = useLocation();

  return (
    <>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/signup" element={<Signup setAuth={setAuth} />} />

        <Route
          path="/"
          element={
            user && user.role === 'kid' ? (
              <Home role='kid' menuItems={["Daily tasks", "All tasks"]} menuItems2={["logout"]} />
            ) : user && user.role === 'Parent' ? (
              // <Navigate to="/login" state={{ from: location }} replace />
              <Home role='parent' menuItems={["Requests", "Kids"]} menuItems2={["logout"]} />
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
