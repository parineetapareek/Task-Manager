import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Toolbar,
} from "@mui/material";

import DashboardOutlined from "@mui/icons-material/DashboardOutlined";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import ListAltOutlined from "@mui/icons-material/ListAltOutlined";
import ViewKanbanOutlined from "@mui/icons-material/ViewKanbanOutlined";

import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const MainLayout = ({ children }) => {
  const location = useLocation();

  const menu = [
    { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
    { label: "Create Task", icon: <AddCircleOutline />, path: "/create-task" },
    { label: "Manage Tasks", icon: <ListAltOutlined />, path: "/manage-tasks" },
    { label: "Kanban Board", icon: <ViewKanbanOutlined />, path: "/kanban" },
  ];

  return (
    <Box sx={{ display: "flex", bgcolor: "#FFFFFF" }}>
      {/* Sidebar Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#0F4C3A",
            color: "white",
            borderRight: "none",
          },
        }}
      >
        <Toolbar />
        <List>
          {menu.map((item) => (
            <ListItemButton
              key={item.label}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: "12px",
                mx: 1,
                my: 0.5,
                "&.Mui-selected": {
                  backgroundColor: "#DFF3EA",
                  color: "#0F4C3A",
                  fontWeight: 600,
                },
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.15)",
                },
              }}
            >
              <ListItemIcon
                sx={{
                  color: location.pathname === item.path ? "#0F4C3A" : "white",
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          bgcolor: "#FFFFFF",
          minHeight: "100vh",
          ml: `${drawerWidth}px`, // ⭐ KEY FIX ⭐
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
