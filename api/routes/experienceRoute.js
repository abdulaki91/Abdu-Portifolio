import express from "express";
import {
  listExperiences,
  getExperience,
  createExperience,
  editExperience,
  removeExperience,
} from "../controllers/experienceController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", listExperiences);
router.get("/:id", getExperience);

// Protected routes (admin only)
router.post("/", authenticateToken, createExperience);
router.put("/:id", authenticateToken, editExperience);
router.delete("/:id", authenticateToken, removeExperience);

export default router;
