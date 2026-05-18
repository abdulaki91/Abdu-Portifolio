import db from "../config/db.config.js";

// Create projects table
export const createProjectsTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS projects (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      full_description TEXT,
      features TEXT[], -- Array of features
      tech_stack TEXT[], -- Array of technologies
      github_link VARCHAR(500),
      live_link VARCHAR(500),
      image_url VARCHAR(500),
      is_featured BOOLEAN DEFAULT false,
      display_order INTEGER DEFAULT 0,
      status VARCHAR(50) DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  return db.query(sql);
};

// Get all projects
export const getAllProjects = async () => {
  const sql = `
    SELECT * FROM projects 
    WHERE status = 'active' 
    ORDER BY display_order ASC, created_at DESC
  `;
  return db.query(sql);
};

// Get project by ID
export const getProjectById = async (id) => {
  const sql = `SELECT * FROM projects WHERE id = $1`;
  return db.query(sql, [id]);
};

// Insert new project
export const insertProject = async (projectData) => {
  const {
    title,
    description,
    fullDescription,
    features,
    techStack,
    githubLink,
    liveLink,
    imageUrl,
    isFeatured,
    displayOrder,
  } = projectData;

  const sql = `
    INSERT INTO projects (
      title, description, full_description, features, tech_stack, 
      github_link, live_link, image_url, is_featured, display_order
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
    RETURNING *
  `;

  return db.query(sql, [
    title,
    description,
    fullDescription,
    features,
    techStack,
    githubLink,
    liveLink,
    imageUrl,
    isFeatured,
    displayOrder || 0,
  ]);
};

// Update project
export const updateProject = async (id, projectData) => {
  const {
    title,
    description,
    fullDescription,
    features,
    techStack,
    githubLink,
    liveLink,
    imageUrl,
    isFeatured,
    displayOrder,
  } = projectData;

  const sql = `
    UPDATE projects 
    SET 
      title = $1, 
      description = $2, 
      full_description = $3, 
      features = $4, 
      tech_stack = $5,
      github_link = $6, 
      live_link = $7, 
      image_url = $8, 
      is_featured = $9, 
      display_order = $10,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = $11 
    RETURNING *
  `;

  return db.query(sql, [
    title,
    description,
    fullDescription,
    features,
    techStack,
    githubLink,
    liveLink,
    imageUrl,
    isFeatured,
    displayOrder,
    id,
  ]);
};

// Delete project (soft delete)
export const deleteProject = async (id) => {
  const sql = `
    UPDATE projects 
    SET status = 'deleted', updated_at = CURRENT_TIMESTAMP 
    WHERE id = $1 
    RETURNING *
  `;
  return db.query(sql, [id]);
};

// Hard delete project
export const hardDeleteProject = async (id) => {
  const sql = `DELETE FROM projects WHERE id = $1 RETURNING *`;
  return db.query(sql, [id]);
};
