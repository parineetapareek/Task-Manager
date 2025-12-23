import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Button,
  Box,
} from "@mui/material";

import { updateTask } from "../services/taskService";
import { successToast, errorToast } from "../utils/toast";

const TaskForm = ({ open, onClose, task, reload }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [status, setStatus] = useState("Next");
  const [dueDate, setDueDate] = useState("");

  // Load task data when modal opens
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setPriority(task.priority || "Medium");
      setStatus(task.status || "Next");
      setDueDate(task.dueDate || "");
    }
  }, [task]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updated = {
      title,
      description,
      priority,
      status,
      dueDate,
    };

    try {
      await updateTask(task.id, updated);
      reload();
      onClose();
      successToast("Task updated");
    } catch (err) {
      console.log("Error updating task:", err);
      errorToast("Update failed");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: "16px",
          backgroundColor: "#F4FBF7",
        },
      }}
    >
      <DialogTitle sx={{ color: "#0F4C3A", fontWeight: 700 }}>
        Edit Task
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Task Title"
            sx={{ mt: 2, mb: 2 }}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <TextField
            fullWidth
            label="Description"
            multiline
            rows={3}
            sx={{ mb: 2 }}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
              select
              label="Priority"
              fullWidth
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </TextField>

            <TextField
              select
              label="Status"
              fullWidth
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              sx={{ mb: 2 }}
            >
              <MenuItem value="Next">Next</MenuItem>
              <MenuItem value="In Progress">In Progress</MenuItem>
              <MenuItem value="Completed">Completed</MenuItem>
            </TextField>
          </Box>

          <TextField
            fullWidth
            type="date"
            label="Due Date"
            InputLabelProps={{ shrink: true }}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#0F4C3A",
              color: "white",
              py: 1.3,
              borderRadius: "12px",
              fontWeight: 600,
              "&:hover": { backgroundColor: "#0d3f31" },
            }}
          >
            Save Changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskForm;
