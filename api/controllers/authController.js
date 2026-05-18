import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  insertAdmin,
  getAdminByEmail,
  getAdminByUsername,
  getAdminById,
} from "../models/adminModel.js";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";
const JWT_EXPIRES_IN = "7d";

// Register new admin
export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if admin already exists
    const existingEmail = await getAdminByEmail(email);
    if (existingEmail.rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingUsername = await getAdminByUsername(username);
    if (existingUsername.rows.length > 0) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin
    const result = await insertAdmin(username, email, hashedPassword);
    const admin = result.rows[0];

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      },
    );

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Login admin
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Find admin
    const result = await getAdminByEmail(email);
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const admin = result.rows[0];

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, username: admin.username },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      },
    );

    res.json({
      message: "Login successful",
      token,
      admin: {
        id: admin.id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Get current admin profile
export const getProfile = async (req, res, next) => {
  try {
    const result = await getAdminById(req.admin.id);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.json({ admin: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

// Verify token
export const verifyToken = async (req, res) => {
  res.json({ valid: true, admin: req.admin });
};
