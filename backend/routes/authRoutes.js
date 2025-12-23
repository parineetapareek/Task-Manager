import express from "express";
import { signupUser, loginUser, updateProfile } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.put("/profile/:id", updateProfile);


export default router;
