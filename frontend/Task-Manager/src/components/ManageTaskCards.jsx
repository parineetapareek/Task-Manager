import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  IconButton,
  Box,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { deleteTask } from "../services/taskService";
import TaskForm from "./TaskForm";

const ManageTaskCards = ({ task, reload }) => {
  // Modal state
  const [open, setOpen] = useState(false);

  // priority colors
  const priorityColor = {
    High: "#D32F2F",
    Medium: "#8C6D44",
    Low: "#2E7D32",
  };

  // status soft backgrounds
  const statusBg = {
    Next: "#F9F6EF",
    "In Progress": "#EAF7F1",
    Completed: "#E6F6ED",
  };

  // DELETE HANDLER
  const handleDelete = async () => {
    await deleteTask(task.id);
    reload();
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: "16px",
          backgroundColor: "#F4FBF7",
          boxShadow: "0px 4px 14px rgba(0,0,0,0.05)",
          p: 1,
          transition: "all 0.2s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 6px 18px rgba(0,0,0,0.08)",
          },
        }}
      >
        <CardContent>
          {/* Title */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: "#13322B",
              mb: 1,
            }}
          >
            {task.title}
          </Typography>

          {/* Description */}
          <Typography variant="body2" sx={{ color: "#6E8F84", mb: 2 }}>
            {task.description || "No description"}
          </Typography>

          {/* Chips */}
          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip
              label={task.status}
              size="small"
              sx={{
                backgroundColor: statusBg[task.status] || "#EAF7F1",
                color: "#0F4C3A",
                fontWeight: 600,
              }}
            />
            <Chip
              label={task.priority}
              size="small"
              sx={{
                backgroundColor: priorityColor[task.priority],
                color: "white",
                fontWeight: 600,
              }}
            />
          </Stack>

          {/* Action Buttons */}
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            {/* OPEN EDIT MODAL */}
            <IconButton
              sx={{ color: "#0F4C3A" }}
              onClick={() => setOpen(true)}
            >
              <EditIcon />
            </IconButton>

            <IconButton color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* EDIT MODAL */}
      <TaskForm
        open={open}
        onClose={() => setOpen(false)}
        task={task}
        reload={reload}
      />
    </>
  );
};

export default ManageTaskCards;
