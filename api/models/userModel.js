import db from "../config/db.config.js";

// Create the users table if it doesn't exist
export const createUsersTable = () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      phone VARCHAR(20) NOT NULL ,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  return db.execute(sql);
};

// Insert user into DB
export const insertUser = (name, email, phone) => {
  console.log("InsertUser:", { name, email, phone });

  const sql = `INSERT INTO users (name, email, phone) VALUES (?, ?, ?)`;
  return db.execute(sql, [name, email, phone]);
};

// Get all users
export const getAllUsers = () => {
  const sql = `SELECT * FROM users`;
  return db.query(sql);
};
