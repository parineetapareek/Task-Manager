import React from "react";
import { Card, CardContent, Typography, Box, Stack, Chip } from "@mui/material";

const TomorrowStats = ({ tasks }) => {
  // Get tomorrow date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  // Filter tasks due tomorrow
  const tomorrowTasks = tasks.filter((t) => {
    if (!t.dueDate) return false;
    const taskDate = new Date(t.dueDate);
    taskDate.setHours(0, 0, 0, 0);
    return taskDate.getTime() === tomorrow.getTime();
  });

  const highPriorityTomorrow = tomorrowTasks.filter(
    (t) => t.priority === "High"
  ).length;

  const priorityColor = {
    High: "#D32F2F",
    Medium: "#8C6D44",
    Low: "#2E7D32",
  };

  return (
    <Card
      sx={{
        backgroundColor: "#F4FBF7",
        borderRadius: "16px",
        boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
        mt: 3,
      }}
    >
      <CardContent>
        {/* Title */}
        <Typography
          variant="h6"
          sx={{ color: "#0F4C3A", fontWeight: 700, mb: 2 }}
        >
          Tomorrow’s Tasks
        </Typography>

        {/* Stats numbers */}
        <Typography variant="body1" sx={{ mb: 1, color: "#13322B" }}>
          Total Tasks:{" "}
          <strong style={{ color: "#0F4C3A" }}>{tomorrowTasks.length}</strong>
        </Typography>

        <Typography variant="body1" sx={{ mb: 2, color: "#13322B" }}>
          High Priority:{" "}
          <strong style={{ color: "#D32F2F" }}>{highPriorityTomorrow}</strong>
        </Typography>

        {/* Task List */}
        <Stack spacing={1}>
          {tomorrowTasks.slice(0, 3).map((t) => (
            <Box
              key={t.id}
              sx={{
                p: 1.5,
                backgroundColor: "#FFFFFF",
                borderRadius: "12px",
                boxShadow: "0px 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: "#13322B" }}
              >
                {t.title}
              </Typography>

              <Chip
                label={t.priority}
                size="small"
                sx={{
                  mt: 1,
                  backgroundColor: priorityColor[t.priority],
                  color: "white",
                  fontWeight: 600,
                }}
              />
            </Box>
          ))}

          {tomorrowTasks.length === 0 && (
            <Typography
              variant="body2"
              sx={{ color: "#6E8F84", fontStyle: "italic" }}
            >
              No tasks due tomorrow.
            </Typography>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TomorrowStats;
