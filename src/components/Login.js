import React, { useState } from "react";
import { loginUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const result = await loginUser(form);
      if (result.token) {
        localStorage.setItem("token", result.token);
        window.location.href = '/files';  // Redirect to files page
      }
    } catch (err) {
      setError(err.message || "Login failed.");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#f5f5f5",
        padding: 2,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
        </form>

        <Typography
          variant="body2"
          align="center"
          sx={{ mt: 2 }}
        >
          Don't have an account?{" "}
          <Button
            color="secondary"
            size="small"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </Typography>
      </Box>
    </Box>
  );
}
