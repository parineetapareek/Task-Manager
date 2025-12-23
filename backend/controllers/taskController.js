import { readFile, writeFile } from "fs/promises";

const TASKS_FILE = "./tasks.json";

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

// GET all tasks
export const getTasks = async (req, res) => {
  const tasks = await readTasks();
  res.json(tasks);
};

// POST new task
export const addTask = async (req, res) => {
  const { title, description } = req.body;

  if (!title)
    return res.status(400).json({ message: "Title is required" });

  const tasks = await readTasks();

  const newTask = {
    id: Date.now().toString(),
    title,
    description: description || "",
    completed: false,
  };

  tasks.push(newTask);
  await writeTasks(tasks);

  res.status(201).json(newTask);
};

// PUT update task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  const tasks = await readTasks();
  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1)
    return res.status(404).json({ message: "Task not found" });

  tasks[index] = {
    ...tasks[index],
    title: title ?? tasks[index].title,
    description: description ?? tasks[index].description,
    completed: completed ?? tasks[index].completed,
  };

  await writeTasks(tasks);

  res.json(tasks[index]);
};

// DELETE task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  const tasks = await readTasks();
  const filtered = tasks.filter((t) => t.id !== id);

  if (filtered.length === tasks.length)
    return res.status(404).json({ message: "Task not found" });

  await writeTasks(filtered);

  res.json({ message: "Task deleted" });
};
