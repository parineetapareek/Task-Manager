import axios from "axios";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const API_URL = "https://task-manager-9c40.onrender.com/tasks";

export const getTasks = () => {
  return axios.get(API_URL, authHeader());
};

export const createTask = (task) => {
  return axios.post(API_URL, task, authHeader());
};

export const updateTask = (id, updatedTask) => {
  return axios.put(`${API_URL}/${id}`, updatedTask, authHeader());
};

export const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`, authHeader());
};
