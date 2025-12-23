import React, { useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { getTasks } from "../services/taskService";
import KanbanBoard from "../components/KanbanBoard";

const KanbanPage = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data);
    } catch (error) {
      console.log("Error loading tasks:", error);
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
        Kanban Board
      </Typography>

      <KanbanBoard tasks={tasks} reload={loadTasks} />
    </Box>
  );
};

export default KanbanPage;
