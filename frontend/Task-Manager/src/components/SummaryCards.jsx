import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";

const SummaryCards = ({ total, ongoing, completed, pending }) => {
  const cards = [
    {
      title: "Total Tasks",
      value: total,
      bg: "#EAF7F1",
      color: "#0F4C3A",
    },
    {
      title: "Ongoing",
      value: ongoing,
      bg: "#F9F6EF",
      color: "#8C6D44",
    },
    {
      title: "Completed",
      value: completed,
      bg: "#E6F6ED",
      color: "#2E7D32",
    },
    {
      title: "Pending",
      value: pending,
      bg: "#FFF4F4",
      color: "#D32F2F",
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.title}>
          <Card
            sx={{
              backgroundColor: card.bg,
              borderRadius: "16px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.05)",
              p: 1,
              height: "120px",
            }}
          >
            <CardContent>
              <Typography
                variant="body2"
                sx={{ color: card.color, fontWeight: 600, opacity: 0.8 }}
              >
                {card.title}
              </Typography>

              <Typography
                variant="h4"
                sx={{
                  color: card.color,
                  fontWeight: 700,
                  mt: 1,
                }}
              >
                {card.value}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SummaryCards;
