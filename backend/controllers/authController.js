import { readFile, writeFile } from "fs/promises";
import jwt from "jsonwebtoken";

const USERS_FILE = "./users.json";
const JWT_SECRET = "supersecretkey"; 

async function readUsers() {
  try {
    const data = await readFile(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeUsers(users) {
  await writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

export const signupUser = async (req, res) => {
  const { username, password, name } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username & password required" });
  }

  const users = await readUsers();

  const exists = users.find((u) => u.username === username);
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = {
    id: Date.now().toString(),
    username,
    password,
    name: name || "",
  };

  users.push(newUser);
  await writeUsers(users);

  // AUTO LOGIN AFTER SIGNUP
  const token = jwt.sign({ id: newUser.id }, JWT_SECRET);

  res.status(201).json({
    message: "Signup successful",
    token,
    user: {
      id: newUser.id,
      username: newUser.username,
      name: newUser.name,
    },
  });
};


export const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const users = await readUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user.id }, JWT_SECRET);

  return res.json({
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
    },
  });
};


export const updateProfile = async (req, res) => {
  const { id } = req.params;
  const { name, username } = req.body;

  const users = await readUsers();
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) return res.status(404).json({ message: "User not found" });

  const exists = users.some(
    (u) => u.username === username && u.id !== id
  );
  if (exists)
    return res.status(400).json({ message: "Username already taken" });

  users[index].name = name || users[index].name;
  users[index].username = username || users[index].username;

  await writeUsers(users);

  res.json({
    message: "Profile updated",
    user: users[index],
  });
};
