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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/manage-tasks" element={<ManageTask />} />
            <Route path="/kanban" element={<KanbanPage />} />
          </Routes>
        </MainLayout>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </>
  );
};

export default App;
