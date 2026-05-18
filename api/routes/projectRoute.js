import express from "express";
import {
  listProjects,
  getProject,
  createProject,
  editProject,
  removeProject,
} from "../controllers/projectController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", listProjects);
router.get("/:id", getProject);

// Protected routes (admin only)
router.post("/", authenticateToken, createProject);
router.put("/:id", authenticateToken, editProject);
router.delete("/:id", authenticateToken, removeProject);

export default router;
