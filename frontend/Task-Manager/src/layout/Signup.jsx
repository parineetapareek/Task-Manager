import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import { successToast, errorToast } from "../utils/toast";
import { signupUser, loginUser } from "../services/authService";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      // SIGNUP
      await signupUser({ username, password, name });
      successToast("Signup successful!");

      // AUTO LOGIN
      const loginRes = await loginUser({ username, password });

      localStorage.setItem("token", loginRes.data.token);
      localStorage.setItem("user", JSON.stringify(loginRes.data.user));

      // Redirect
      navigate("/dashboard");
    } catch (err) {
      errorToast(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, margin: "0 auto", mt: 8 }}>
      <Card sx={{ backgroundColor: "#F4FBF7", borderRadius: "16px" }}>
        <CardContent>
          <Typography
            variant="h5"
            sx={{ mb: 3, color: "#0F4C3A", fontWeight: 700 }}
          >
            Create an Account
          </Typography>

          <form onSubmit={handleSignup}>
            <TextField
              fullWidth
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#0F4C3A",
                py: 1.2,
                borderRadius: "12px",
                color: "white",
                fontWeight: 600,
              }}
            >
              Signup
            </Button>

            <Button
              fullWidth
              sx={{ mt: 2, color: "#0F4C3A" }}
              onClick={() => navigate("/login")}
            >
              Already have an account? Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
