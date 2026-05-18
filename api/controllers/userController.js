// src/controllers/user.controller.js
import {
  insertUser,
  getAllUsers,
  createUsersTable,
} from "../models/userModel.js";

export const initializeDB = async (req, res, next) => {
  try {
    await createUsersTable(); // Create table if it doesn't exist
    res.status(200).json({ message: "Users table is ready." });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  const { name, email, phone } = req.body;

  try {
    await insertUser(name, email, phone);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    if (err.code === "23505") {
      // PostgreSQL unique violation error code
      return res.status(400).json({ message: "Email already exists." });
    }
    next(err); // Pass error to Express error handler
  }
};

export const listUsers = async (req, res, next) => {
  try {
    const result = await getAllUsers();
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
};
