import db from "../config/db.config.js";

// Create admin users table
export const createAdminTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS admins (
      id SERIAL PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'admin',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  return db.query(sql);
};

// Insert admin user
export const insertAdmin = async (username, email, hashedPassword) => {
  const sql = `
    INSERT INTO admins (username, email, password) 
    VALUES ($1, $2, $3) 
    RETURNING id, username, email, role, created_at
  `;
  return db.query(sql, [username, email, hashedPassword]);
};

// Get admin by email
export const getAdminByEmail = async (email) => {
  const sql = `SELECT * FROM admins WHERE email = $1`;
  return db.query(sql, [email]);
};

// Get admin by username
export const getAdminByUsername = async (username) => {
  const sql = `SELECT * FROM admins WHERE username = $1`;
  return db.query(sql, [username]);
};

// Get admin by ID
export const getAdminById = async (id) => {
  const sql = `SELECT id, username, email, role, created_at FROM admins WHERE id = $1`;
  return db.query(sql, [id]);
};
