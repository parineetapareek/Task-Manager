import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Dashboard from "./layout/Dashboard";
import CreateTask from "./layout/CreateTask";
import ManageTask from "./layout/ManageTask";
import KanbanPage from "./layout/KanbanPage";

import Login from "./layout/Login";
import Signup from "./layout/Signup";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Router>
        <Routes>

          {/* Redirect root → signup */}
          <Route path="/" element={<Navigate to="/signup" />} />

          {/* PUBLIC ROUTES (Only when logged out) */}
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <Signup />
              </PublicRoute>
            }
          />

          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* PROTECTED ROUTES */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="create-task" element={<CreateTask />} />
            <Route path="manage-tasks" element={<ManageTask />} />
            <Route path="kanban" element={<KanbanPage />} />
          </Route>

        </Routes>
      </Router>

      <ToastContainer />
    </>
  );
};

export default App;
