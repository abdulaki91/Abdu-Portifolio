import db from "../config/db.config.js";

// Create the users table if it doesn't exist
export const createUsersTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      phone VARCHAR(20) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  return db.query(sql);
};

// Insert user into DB
export const insertUser = async (name, email, phone) => {
  console.log("InsertUser:", { name, email, phone });

  const sql = `INSERT INTO users (name, email, phone) VALUES ($1, $2, $3) RETURNING *`;
  return db.query(sql, [name, email, phone]);
};

// Get all users
export const getAllUsers = async () => {
  const sql = `SELECT * FROM users`;
  return db.query(sql);
};
