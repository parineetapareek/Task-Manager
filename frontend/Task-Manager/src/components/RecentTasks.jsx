import React from "react";
import { Card, CardContent, Typography, Box, Chip, Stack } from "@mui/material";

const RecentTasks = ({ tasks }) => {
  // Get 5 most recent tasks:
  const recent = [...tasks].slice(-5).reverse(); // newest first

  // Priority colors
  const priorityColor = {
    High: "#D32F2F",
    Medium: "#8C6D44",
    Low: "#2E7D32",
  };

  // Status colors (soft aesthetic)
  const statusColor = {
    Next: "#F9F6EF",
    "In Progress": "#EAF7F1",
    Completed: "#E6F6ED",
  };

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          color: "#0F4C3A",
          fontWeight: 700,
          mb: 2,
        }}
      >
        Recent Tasks
      </Typography>

      <Stack spacing={2}>
        {recent.map((task) => (
          <Card
            key={task.id}
            sx={{
              borderRadius: "16px",
              backgroundColor: "#F4FBF7",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
            }}
          >
            <CardContent>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 700, color: "#13322B" }}
              >
                {task.title}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  opacity: 0.7,
                  mt: 0.5,
                  mb: 1,
                  color: "#6E8F84",
                }}
              >
                {task.description || "No description"}
              </Typography>

              {/* Chips */}
              <Stack direction="row" spacing={1}>
                <Chip
                  label={task.status}
                  size="small"
                  sx={{
                    backgroundColor: statusColor[task.status] || "#EAF7F1",
                    color: "#0F4C3A",
                    fontWeight: 600,
                  }}
                />

                <Chip
                  label={task.priority}
                  size="small"
                  sx={{
                    backgroundColor: priorityColor[task.priority] || "#0F4C3A",
                    color: "white",
                    fontWeight: 600,
                  }}
                />
              </Stack>
            </CardContent>
          </Card>
        ))}

        {recent.length === 0 && (
          <Typography
            variant="body2"
            sx={{ color: "#6E8F84", fontStyle: "italic" }}
          >
            No recent tasks available.
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

export default RecentTasks;
