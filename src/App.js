import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import Register from "./components/Register";
import Login from "./components/Login";
import UploadFile from "./components/UploadFile";
import FilesList from "./components/FilesList";
import { useNavigate } from "react-router-dom";
import "./styles/app.css";
import ImageView from './components/ImageView';

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/files" /> : <Navigate to="/login" />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/upload" element={isAuthenticated ? <UploadFile /> : <Navigate to="/login" />} />
        <Route path="/files" element={isAuthenticated ? <FilesList /> : <Navigate to="/login" />} />
        <Route path="/image/:fileId" element={<ImageView />} />
      </Routes>
    </Router>
  );
}

export default App;

function Navbar() {
  const isAuthenticated = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Files
        </Typography>
        {isAuthenticated ? (
          <>
            <Button color="inherit" onClick={() => navigate("/files")}>
              Files
            </Button>
            <Button color="inherit" onClick={() => navigate("/upload")}>
              Upload File
            </Button>
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button color="inherit" onClick={() => navigate("/register")}>
              Register
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
