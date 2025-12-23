import React, { useEffect, useState } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { getTasks, deleteTask } from "../services/taskService";
import ManageTaskCards from "../components/ManageTaskCards";

const ManageTask = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (err) {
      console.log("Error loading tasks:", err);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      <Typography
        variant="h4"
        sx={{ mb: 3, color: "#0F4C3A", fontWeight: 700 }}
      >
        Manage Tasks
      </Typography>

      <Grid container spacing={3}>
        {tasks.map((task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <ManageTaskCards task={task} reload={loadTasks} />
          </Grid>
        ))}

        {tasks.length === 0 && (
          <Typography variant="body1" sx={{ color: "#6E8F84", mt: 2, ml: 1 }}>
            No tasks found.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default ManageTask;
