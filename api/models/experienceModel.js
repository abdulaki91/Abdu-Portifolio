import db from "../config/db.config.js";

// Create experiences table
export const createExperiencesTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS experiences (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      subtitle TEXT NOT NULL,
      icon VARCHAR(100),
      type VARCHAR(50) DEFAULT 'work', -- work, education, project
      start_date DATE,
      end_date DATE,
      is_current BOOLEAN DEFAULT false,
      description TEXT,
      display_order INTEGER DEFAULT 0,
      status VARCHAR(50) DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  return db.query(sql);
};

// Get all experiences
export const getAllExperiences = async () => {
  const sql = `
    SELECT * FROM experiences 
    WHERE status = 'active' 
    ORDER BY display_order ASC, start_date DESC
  `;
  return db.query(sql);
};

// Get experience by ID
export const getExperienceById = async (id) => {
  const sql = `SELECT * FROM experiences WHERE id = $1`;
  return db.query(sql, [id]);
};

// Insert experience
export const insertExperience = async (experienceData) => {
  const {
    title,
    subtitle,
    icon,
    type,
    startDate,
    endDate,
    isCurrent,
    description,
    displayOrder,
  } = experienceData;

  const sql = `
    INSERT INTO experiences (
      title, subtitle, icon, type, start_date, end_date, 
      is_current, description, display_order
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
    RETURNING *
  `;

  return db.query(sql, [
    title,
    subtitle,
    icon,
    type,
    startDate,
    endDate,
    isCurrent,
    description,
    displayOrder || 0,
  ]);
};

// Update experience
export const updateExperience = async (id, experienceData) => {
  const {
    title,
    subtitle,
    icon,
    type,
    startDate,
    endDate,
    isCurrent,
    description,
    displayOrder,
  } = experienceData;

  const sql = `
    UPDATE experiences 
    SET 
      title = $1, 
      subtitle = $2, 
      icon = $3, 
      type = $4, 
      start_date = $5, 
      end_date = $6,
      is_current = $7, 
      description = $8, 
      display_order = $9,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $10 
    RETURNING *
  `;

  return db.query(sql, [
    title,
    subtitle,
    icon,
    type,
    startDate,
    endDate,
    isCurrent,
    description,
    displayOrder,
    id,
  ]);
};

// Delete experience
export const deleteExperience = async (id) => {
  const sql = `
    UPDATE experiences 
    SET status = 'deleted', updated_at = CURRENT_TIMESTAMP 
    WHERE id = $1 
    RETURNING *
  `;
  return db.query(sql, [id]);
};
