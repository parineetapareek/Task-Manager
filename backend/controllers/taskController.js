import { readFile, writeFile } from "fs/promises";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const TASKS_FILE = path.join(__dirname, "../data/tasks.json");

// Read tasks
async function readTasks() {
  try {
    const data = await readFile(TASKS_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

// Write tasks
async function writeTasks(tasks) {
  await writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// GET tasks (Only user’s tasks)
export const getTasks = async (req, res) => {
  const tasks = await readTasks();
  const filtered = tasks.filter((t) => t.userId === req.user.id);
  res.json(filtered);
};

// POST new task
export const addTask = async (req, res) => {
  const { title, description, priority, status, dueDate } = req.body;
  const userId = req.user.id;

  if (!title) return res.status(400).json({ message: "Title is required" });

  const tasks = await readTasks();

  const newTask = {
    id: Date.now().toString(),
    userId, 
    title,
    description: description || "",
    priority: priority || "Medium",
    status: status || "Next",
    dueDate: dueDate || null,
  };

  tasks.push(newTask);
  await writeTasks(tasks);

  res.status(201).json(newTask);
};

// PUT update task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, priority, status, dueDate } = req.body;

  const tasks = await readTasks();
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) return res.status(404).json({ message: "Task not found" });

  if (tasks[index].userId !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  tasks[index] = {
    ...tasks[index],
    title: title ?? tasks[index].title,
    description: description ?? tasks[index].description,
    priority: priority ?? tasks[index].priority,
    status: status ?? tasks[index].status,
    dueDate: dueDate ?? tasks[index].dueDate,
  };

  await writeTasks(tasks);

  res.json(tasks[index]);
};

// DELETE task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  const tasks = await readTasks();
  const task = tasks.find((t) => t.id === id);

  if (!task) return res.status(404).json({ message: "Task not found" });

  if (task.userId !== req.user.id) {
    return res.status(403).json({ message: "Not allowed" });
  }

  const filtered = tasks.filter((t) => t.id !== id);

  await writeTasks(filtered);

  res.json({ message: "Task deleted" });
};
