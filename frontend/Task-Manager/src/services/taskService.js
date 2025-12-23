import axios from "axios";

// CHANGE THIS IF NEEDED
export const API_URL = "http://localhost:5000/tasks";

// ---------------------- GET ALL TASKS ----------------------
export const getTasks = () => {
  return axios.get(API_URL);
};

// ---------------------- CREATE TASK ----------------------
export const createTask = (task) => {
  return axios.post(API_URL, task);
};

// ---------------------- UPDATE TASK ----------------------
export const updateTask = (id, updatedTask) => {
  return axios.put(`${API_URL}/${id}`, updatedTask);
};

// ---------------------- DELETE TASK ----------------------
export const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
