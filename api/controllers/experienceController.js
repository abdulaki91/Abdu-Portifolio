import {
  getAllExperiences,
  getExperienceById,
  insertExperience,
  updateExperience,
  deleteExperience,
} from "../models/experienceModel.js";

// Get all experiences (public)
export const listExperiences = async (req, res, next) => {
  try {
    const result = await getAllExperiences();
    res.json({ experiences: result.rows });
  } catch (err) {
    next(err);
  }
};

// Get single experience (public)
export const getExperience = async (req, res, next) => {
  try {
    const result = await getExperienceById(req.params.id);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.json({ experience: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

// Create experience (admin only)
export const createExperience = async (req, res, next) => {
  try {
    const experienceData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      icon: req.body.icon || "",
      type: req.body.type || "work",
      startDate: req.body.startDate || null,
      endDate: req.body.endDate || null,
      isCurrent: req.body.isCurrent || false,
      description: req.body.description || "",
      displayOrder: req.body.displayOrder || 0,
    };

    const result = await insertExperience(experienceData);
    res.status(201).json({
      message: "Experience created successfully",
      experience: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

// Update experience (admin only)
export const editExperience = async (req, res, next) => {
  try {
    const experienceData = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      icon: req.body.icon || "",
      type: req.body.type || "work",
      startDate: req.body.startDate || null,
      endDate: req.body.endDate || null,
      isCurrent: req.body.isCurrent || false,
      description: req.body.description || "",
      displayOrder: req.body.displayOrder || 0,
    };

    const result = await updateExperience(req.params.id, experienceData);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.json({
      message: "Experience updated successfully",
      experience: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

// Delete experience (admin only)
export const removeExperience = async (req, res, next) => {
  try {
    const result = await deleteExperience(req.params.id);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.json({ message: "Experience deleted successfully" });
  } catch (err) {
    next(err);
  }
};
