import express from "express";
import { initializeDatabase } from "../controllers/initController.js";

const router = express.Router();

// Initialize database tables
router.post("/", initializeDatabase);

export default router;
