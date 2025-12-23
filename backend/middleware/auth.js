import jwt from "jsonwebtoken";

const JWT_SECRET = "supersecretkey";

export const authMiddleware = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header)
    return res.status(401).json({ message: "No token provided" });

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // { id: "12345" }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
