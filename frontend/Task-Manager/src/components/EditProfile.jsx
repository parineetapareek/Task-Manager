import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";
import { successToast, errorToast } from "../utils/toast";

const EditProfile = ({ open, onClose, user, onUpdated }) => {
  const [name, setName] = useState(user.name || "");
  const [username, setUsername] = useState(user.username || "");

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/auth/profile/${user.id}`,
        { name, username }
      );

      successToast("Profile updated");

      localStorage.setItem("user", JSON.stringify(res.data.user));

      onUpdated();
      onClose();
    } catch (err) {
      errorToast(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Profile</DialogTitle>

      <DialogContent>
        <TextField
          label="Full Name"
          fullWidth
          sx={{ mb: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <TextField
          label="Username"
          fullWidth
          sx={{ mb: 3 }}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{ backgroundColor: "#0F4C3A" }}
          onClick={handleSave}
        >
          Save Changes
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
