import React, { useState } from "react";
import {
  Grid,
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
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { updateTask, deleteTask } from "../services/taskService";
import TaskForm from "./TaskForm";

const KanbanBoard = ({ tasks, reload }) => {
  // For edit modal
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const nextTasks = tasks.filter((t) => t.status === "Next");
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress");
  const completedTasks = tasks.filter((t) => t.status === "Completed");

  const priorityColor = {
    High: "#D32F2F",
    Medium: "#8C6D44",
    Low: "#2E7D32",
  };

  const columnStyle = {
    backgroundColor: "#EAF7F1",
    borderRadius: "16px",
    padding: "20px",
    height: "100%",
    boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
  };

  const taskCard = (task) => (
    <Card
      key={task.id}
      sx={{
        borderRadius: "16px",
        backgroundColor: "#FFFFFF",
        mb: 2,
        boxShadow: "0px 4px 12px rgba(0,0,0,0.06)",
        transition: "0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 6px 18px rgba(0,0,0,0.1)",
        },
      }}
    >
      <CardContent>
        {/* Task Title */}
        <Typography
          variant="subtitle1"
          sx={{ fontWeight: 700, color: "#13322B", mb: 1 }}
        >
          {task.title}
        </Typography>

        {/* Chips */}
        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
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

        {/* Action buttons */}
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          {/* Move to In Progress */}
          {task.status !== "In Progress" && (
            <IconButton
              onClick={async () => {
                await updateTask(task.id, { status: "In Progress" });
                reload();
              }}
              sx={{ color: "#0F4C3A" }}
            >
              <PlayArrowIcon />
            </IconButton>
          )}

          {/* Move to Completed */}
          {task.status !== "Completed" && (
            <IconButton
              onClick={async () => {
                await updateTask(task.id, { status: "Completed" });
                reload();
              }}
              sx={{ color: "#2E7D32" }}
            >
              <CheckCircleIcon />
            </IconButton>
          )}

          {/* EDIT BUTTON */}
          <IconButton
            onClick={() => {
              setSelectedTask(task);
              setOpen(true);
            }}
            sx={{ color: "#8C6D44" }}
          >
            <EditIcon />
          </IconButton>

          {/* DELETE BUTTON */}
          <IconButton
            onClick={async () => {
              await deleteTask(task.id);
              reload();
            }}
            sx={{ color: "#D32F2F" }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <>
      <Grid container spacing={3}>
        {/* Next Column */}
        <Grid item xs={12} md={4}>
          <Box sx={columnStyle}>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#0F4C3A", fontWeight: 700 }}
            >
              Next
            </Typography>
            {nextTasks.map(taskCard)}
          </Box>
        </Grid>

        {/* In Progress Column */}
        <Grid item xs={12} md={4}>
          <Box sx={columnStyle}>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#0F4C3A", fontWeight: 700 }}
            >
              In Progress
            </Typography>
            {inProgressTasks.map(taskCard)}
          </Box>
        </Grid>

        {/* Completed Column */}
        <Grid item xs={12} md={4}>
          <Box sx={columnStyle}>
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#0F4C3A", fontWeight: 700 }}
            >
              Completed
            </Typography>
            {completedTasks.map(taskCard)}
          </Box>
        </Grid>
      </Grid>

      {/* EDIT MODAL */}
      <TaskForm
        open={open}
        onClose={() => setOpen(false)}
        task={selectedTask}
        reload={reload}
      />
    </>
  );
};

export default KanbanBoard;
