import { createAdminTable } from "../models/adminModel.js";
import { createProjectsTable } from "../models/projectModel.js";
import { createSkillsTable } from "../models/skillModel.js";
import { createExperiencesTable } from "../models/experienceModel.js";
import {
  createSettingsTable,
  initializeDefaultSettings,
} from "../models/settingsModel.js";

// Initialize all database tables
export const initializeDatabase = async (req, res, next) => {
  try {
    console.log("Creating database tables...");

    await createAdminTable();
    console.log("✓ Admins table created");

    await createProjectsTable();
    console.log("✓ Projects table created");

    await createSkillsTable();
    console.log("✓ Skills table created");

    await createExperiencesTable();
    console.log("✓ Experiences table created");

    await createSettingsTable();
    console.log("✓ Settings table created");

    await initializeDefaultSettings();
    console.log("✓ Default settings initialized");

    res.status(200).json({
      message: "Database initialized successfully",
      tables: ["admins", "projects", "skills", "experiences", "settings"],
    });
  } catch (err) {
    console.error("Error initializing database:", err);
    next(err);
  }
};
