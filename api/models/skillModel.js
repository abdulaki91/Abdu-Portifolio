import db from "../config/db.config.js";

// Create skills table
export const createSkillsTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS skills (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      level INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
      category VARCHAR(100) NOT NULL,
      icon VARCHAR(255),
      display_order INTEGER DEFAULT 0,
      status VARCHAR(50) DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  return db.query(sql);
};

// Get all skills
export const getAllSkills = async () => {
  const sql = `
    SELECT * FROM skills 
    WHERE status = 'active' 
    ORDER BY display_order ASC, category ASC
  `;
  return db.query(sql);
};

// Get skill by ID
export const getSkillById = async (id) => {
  const sql = `SELECT * FROM skills WHERE id = $1`;
  return db.query(sql, [id]);
};

// Insert skill
export const insertSkill = async (
  name,
  level,
  category,
  icon,
  displayOrder,
) => {
  const sql = `
    INSERT INTO skills (name, level, category, icon, display_order) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *
  `;
  return db.query(sql, [name, level, category, icon, displayOrder || 0]);
};

// Update skill
export const updateSkill = async (
  id,
  name,
  level,
  category,
  icon,
  displayOrder,
) => {
  const sql = `
    UPDATE skills 
    SET name = $1, level = $2, category = $3, icon = $4, display_order = $5, updated_at = CURRENT_TIMESTAMP
    WHERE id = $6 
    RETURNING *
  `;
  return db.query(sql, [name, level, category, icon, displayOrder, id]);
};

// Delete skill
export const deleteSkill = async (id) => {
  const sql = `
    UPDATE skills 
    SET status = 'deleted', updated_at = CURRENT_TIMESTAMP 
    WHERE id = $1 
    RETURNING *
  `;
  return db.query(sql, [id]);
};
