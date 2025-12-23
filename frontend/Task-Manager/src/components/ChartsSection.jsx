import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

const ChartsSection = ({ tasks }) => {
  // STATUS COUNTS
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const ongoing = tasks.filter((t) => t.status === "In Progress").length;
  const pending = tasks.filter((t) => t.status === "Next").length;

  const statusData = [
    { name: "Completed", value: completed },
    { name: "In Progress", value: ongoing },
    { name: "Pending", value: pending },
  ];

  // PRIORITY COUNTS
  const high = tasks.filter((t) => t.priority === "High").length;
  const medium = tasks.filter((t) => t.priority === "Medium").length;
  const low = tasks.filter((t) => t.priority === "Low").length;

  const priorityData = [
    { priority: "High", tasks: high },
    { priority: "Medium", tasks: medium },
    { priority: "Low", tasks: low },
  ];

  // SOFT AESTHETIC COLORS
  const COLORS = ["#2E7D32", "#8C6D44", "#D32F2F"]; // muted green / beige / red
  const softGreen = "#EAF7F1";

  return (
    <Grid container spacing={3}>
      {/* -------------------------------- PIE CHART -------------------------------- */}
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            borderRadius: "16px",
            backgroundColor: softGreen,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: "#0F4C3A", fontWeight: 700, mb: 2 }}
            >
              Task Status Overview
            </Typography>

            <Box sx={{ width: "100%", height: 250 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                    dataKey="value"
                  >
                    {statusData.map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>

                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>

      {/* -------------------------------- BAR CHART -------------------------------- */}
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            borderRadius: "16px",
            backgroundColor: softGreen,
            boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <CardContent>
            <Typography
              variant="h6"
              sx={{ color: "#0F4C3A", fontWeight: 700, mb: 2 }}
            >
              Tasks by Priority
            </Typography>

            <Box sx={{ width: "100%", height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={priorityData}>
                  <XAxis dataKey="priority" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tasks" fill="#0F4C3A" radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default ChartsSection;
