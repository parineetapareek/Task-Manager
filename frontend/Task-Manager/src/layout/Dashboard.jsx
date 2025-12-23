import React, { useEffect, useState } from "react";
import { Grid, Box, Typography, Card, CardContent } from "@mui/material";
import { getTasks } from "../services/taskService";

import SummaryCards from "../components/SummaryCards";
import ChartsSection from "../components/ChartsSection";
import RecentTasks from "../components/RecentTasks";
import CalendarView from "../components/CalendarView";
import TomorrowStats from "../components/TomorrowStats";

const Dashboard = () => {
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

  // SUMMARY
  const total = tasks.length;
  const ongoing = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = tasks.filter((t) => t.status === "Next").length;

  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
      {/* PAGE TITLE */}
      <Typography
        variant="h4"
        sx={{ mb: 3, color: "#0F4C3A", fontWeight: 700 }}
      >
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {/* ---------------------- LEFT + MIDDLE SECTION ---------------------- */}
        <Grid item xs={12} lg={7.5}>
          {/* SUMMARY CARDS */}
          <SummaryCards
            total={total}
            ongoing={ongoing}
            completed={completed}
            pending={pending}
          />

          {/* CHARTS */}
          <Box sx={{ mt: 4 }}>
            <ChartsSection tasks={tasks} />
          </Box>

          {/* RECENT TASKS */}
          <Box sx={{ mt: 4 }}>
            <RecentTasks tasks={tasks} />
          </Box>
        </Grid>

        {/* ---------------------- RIGHT COLUMN (Calendar + Tomorrow Stats) ---------------------- */}
        <Grid item xs={12} lg={4.5}>
          {/* FULL CALENDAR */}
          <Card
            sx={{
              backgroundColor: "#EAF7F1",
              borderRadius: "16px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
              p: 2,
              mb: 3,
            }}
          >
            <Typography
              variant="h6"
              sx={{ mb: 2, color: "#0F4C3A", fontWeight: 600 }}
            >
              Calendar
            </Typography>

            <CalendarView tasks={tasks} onEventClick={() => {}} />
          </Card>

          {/* TOMORROW'S TASKS */}
          <TomorrowStats tasks={tasks} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
