import React, { useState } from "react";
import { registerUser } from "../utils/api";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
  Container,
} from "@mui/material";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    phone_number: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const result = await registerUser({
        name: form.name,
        phone_number: form.phone_number,
        username: form.username,
        password: form.password,
      });

      if (result.token) {
        localStorage.setItem("token", result.token);
        navigate("/files");
      } else {
        setError(result.message || "Registration failed.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 4,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: "background.paper",
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Register
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
            />
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              onChange={(e) => setForm({ ...form, username: e.target.value })}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />
            <TextField
              label="Confirm Password"
              type="password"
              variant="outlined"
              fullWidth
              onChange={(e) =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Register
            </Button>
          </Stack>
        </form>

        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate("/login")}
          >
            Login here
          </Button>
        </Typography>
      </Box>
    </Container>
  );
}
