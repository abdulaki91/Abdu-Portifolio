import express from "express";
import {
  listSkills,
  getSkill,
  createSkill,
  editSkill,
  removeSkill,
} from "../controllers/skillController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", listSkills);
router.get("/:id", getSkill);

// Protected routes (admin only)
router.post("/", authenticateToken, createSkill);
router.put("/:id", authenticateToken, editSkill);
router.delete("/:id", authenticateToken, removeSkill);

export default router;
