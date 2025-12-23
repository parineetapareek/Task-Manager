import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";

import DashboardOutlined from "@mui/icons-material/DashboardOutlined";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import ListAltOutlined from "@mui/icons-material/ListAltOutlined";
import ViewKanbanOutlined from "@mui/icons-material/ViewKanbanOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import EditProfile from "../components/EditProfile";

import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 🔥 FIX — add state for edit profile modal
  const [profileOpen, setProfileOpen] = useState(false);

  const menu = [
    { label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
    { label: "Create Task", icon: <AddCircleOutline />, path: "/create-task" },
    { label: "Manage Tasks", icon: <ListAltOutlined />, path: "/manage-tasks" },
    { label: "Kanban Board", icon: <ViewKanbanOutlined />, path: "/kanban" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <Box sx={{ display: "flex", bgcolor: "#FFFFFF" }}>
      {/* Sidebar */}
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

        {/* USER INFO */}
        <Box sx={{ px: 2, py: 2, color: "white" }}>
          <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
            Welcome,
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {user?.name || user?.username}
          </Typography>
        </Box>

        {/* MENU */}
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
                "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
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

          {/* EDIT PROFILE */}
          <ListItemButton
            onClick={() => setProfileOpen(true)}
            sx={{
              borderRadius: "12px",
              mx: 1,
              my: 0.5,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Profile" />
          </ListItemButton>

          {/* LOGOUT */}
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: "12px",
              mx: 1,
              my: 0.5,
              "&:hover": { backgroundColor: "rgba(255,255,255,0.15)" },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
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
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>

      {/* Profile Modal */}
      <EditProfile
        open={profileOpen}
        onClose={() => setProfileOpen(false)}
        user={user}
        onUpdated={() => window.location.reload()}
      />
    </Box>
  );
};

export default MainLayout;
