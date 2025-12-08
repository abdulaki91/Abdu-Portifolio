// src/routes/user.routes.js
import express from "express";
import {
  createUser,
  initializeDB,
  listUsers,
} from "../controllers/userController.js";

const router = express.Router();
router.get("/initialize", initializeDB); // GET /users/initialize → Initialize users table
router.post("/createUser", createUser); // POST /users → Create user
router.get("/getAllUsers", listUsers); // GET /users → List users

export default router;
