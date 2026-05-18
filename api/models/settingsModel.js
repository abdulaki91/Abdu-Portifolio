import db from "../config/db.config.js";

// Create settings table for portfolio configuration
export const createSettingsTable = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS settings (
      id SERIAL PRIMARY KEY,
      setting_key VARCHAR(255) NOT NULL UNIQUE,
      setting_value TEXT,
      setting_type VARCHAR(50) DEFAULT 'text', -- text, json, boolean, number
      description TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
  return db.query(sql);
};

// Get all settings
export const getAllSettings = async () => {
  const sql = `SELECT * FROM settings ORDER BY setting_key ASC`;
  return db.query(sql);
};

// Get setting by key
export const getSettingByKey = async (key) => {
  const sql = `SELECT * FROM settings WHERE setting_key = $1`;
  return db.query(sql, [key]);
};

// Upsert setting (insert or update)
export const upsertSetting = async (key, value, type, description) => {
  const sql = `
    INSERT INTO settings (setting_key, setting_value, setting_type, description) 
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (setting_key) 
    DO UPDATE SET 
      setting_value = $2, 
      setting_type = $3, 
      description = $4,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *
  `;
  return db.query(sql, [key, value, type, description]);
};

// Delete setting
export const deleteSetting = async (key) => {
  const sql = `DELETE FROM settings WHERE setting_key = $1 RETURNING *`;
  return db.query(sql, [key]);
};

// Initialize default settings
export const initializeDefaultSettings = async () => {
  const defaultSettings = [
    {
      key: "site_title",
      value: "Abdulaki Mohammed - Portfolio",
      type: "text",
      description: "Website title",
    },
    {
      key: "site_description",
      value: "Full Stack Developer & Software Engineer",
      type: "text",
      description: "Website description",
    },
    {
      key: "hero_title",
      value: "Hi, I'm Abdulaki Mohammed",
      type: "text",
      description: "Hero section title",
    },
    {
      key: "hero_subtitle",
      value: "Full Stack Developer",
      type: "text",
      description: "Hero section subtitle",
    },
    {
      key: "about_text",
      value: "I'm a passionate full stack developer...",
      type: "text",
      description: "About section text",
    },
    {
      key: "contact_email",
      value: "contact@abdulaki.com",
      type: "text",
      description: "Contact email",
    },
    {
      key: "github_url",
      value: "https://github.com/abdulaki91",
      type: "text",
      description: "GitHub profile URL",
    },
    {
      key: "linkedin_url",
      value: "",
      type: "text",
      description: "LinkedIn profile URL",
    },
  ];

  for (const setting of defaultSettings) {
    await upsertSetting(
      setting.key,
      setting.value,
      setting.type,
      setting.description,
    );
  }
};
