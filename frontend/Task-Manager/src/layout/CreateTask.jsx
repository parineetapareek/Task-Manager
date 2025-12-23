import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  MenuItem,
  Button,
  Card,
  CardContent,
} from "@mui/material";

import { createTask } from "../services/taskService";
import { successToast, errorToast } from "../utils/toast";

import { useNavigate } from "react-router-dom";

const CreateTask = () => {
  const navigate = useNavigate();

  // FORM STATE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Next");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      priority,
      status,
      dueDate,
    };

    try {
      await createTask(taskData);

      successToast("Task created");

      // Delay navigation slightly to let toast show
      setTimeout(() => navigate("/manage-tasks"), 300);

    } catch (err) {
      console.log("Error creating task:", err);
      errorToast("Failed to create task");
    }
  };

  return (
    <Box sx={{ maxWidth: "700px", margin: "0 auto" }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, color: "#0F4C3A", fontWeight: 700 }}
      >
        Create New Task
      </Typography>

      <Card
        sx={{
          backgroundColor: "#F4FBF7",
          borderRadius: "16px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
        }}
      >
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* TITLE */}
            <TextField
              fullWidth
              label="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              sx={{ mb: 3 }}
            />

            {/* DESCRIPTION */}
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              sx={{ mb: 3 }}
            />

            <Box sx={{ display: "flex", gap: 2 }}>
              {/* PRIORITY */}
              <TextField
                select
                fullWidth
                label="Priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                sx={{ mb: 3 }}
              >
                <MenuItem value="High">High</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Low">Low</MenuItem>
              </TextField>

              {/* STATUS */}
              <TextField
                select
                fullWidth
                label="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                sx={{ mb: 3 }}
              >
                <MenuItem value="Next">Next</MenuItem>
                <MenuItem value="In Progress">In Progress</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
              </TextField>
            </Box>

            {/* DUE DATE */}
            <TextField
              fullWidth
              type="date"
              label="Due Date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 3 }}
            />

            {/* SUBMIT BUTTON */}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#0F4C3A",
                color: "white",
                fontWeight: 600,
                py: 1.2,
                borderRadius: "12px",
                "&:hover": { backgroundColor: "#0d3f31" },
              }}
            >
              Create Task
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateTask;
