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
import { loginUser } from "../services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ username, password });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      successToast("Logged in successfully!");

      navigate("/dashboard");
    } catch (err) {
      errorToast("Invalid credentials");
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
            Login
          </Typography>

          <form onSubmit={handleLogin}>
            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 3 }}
            />
            <TextField
              fullWidth
              type="password"
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                py: 1.2,
                borderRadius: "12px",
                backgroundColor: "#0F4C3A",
                "&:hover": { backgroundColor: "#0d3f31" },
              }}
            >
              Login
            </Button>

            <Button
              fullWidth
              sx={{ mt: 2, color: "#0F4C3A" }}
              onClick={() => navigate("/signup")}
            >
              Don't have an account? Signup
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
