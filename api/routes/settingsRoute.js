import express from "express";
import {
  listSettings,
  getSetting,
  updateSetting,
  removeSetting,
} from "../controllers/settingsController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public routes
router.get("/", listSettings);
router.get("/:key", getSetting);

// Protected routes (admin only)
router.post("/", authenticateToken, updateSetting);
router.put("/:key", authenticateToken, updateSetting);
router.delete("/:key", authenticateToken, removeSetting);

export default router;
