import {
  getAllSkills,
  getSkillById,
  insertSkill,
  updateSkill,
  deleteSkill,
} from "../models/skillModel.js";

// Get all skills (public)
export const listSkills = async (req, res, next) => {
  try {
    const result = await getAllSkills();
    res.json({ skills: result.rows });
  } catch (err) {
    next(err);
  }
};

// Get single skill (public)
export const getSkill = async (req, res, next) => {
  try {
    const result = await getSkillById(req.params.id);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }
    res.json({ skill: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

// Create skill (admin only)
export const createSkill = async (req, res, next) => {
  try {
    const { name, level, category, icon, displayOrder } = req.body;

    if (!name || !level || !category) {
      return res
        .status(400)
        .json({ message: "Name, level, and category are required" });
    }

    const result = await insertSkill(name, level, category, icon, displayOrder);
    res.status(201).json({
      message: "Skill created successfully",
      skill: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

// Update skill (admin only)
export const editSkill = async (req, res, next) => {
  try {
    const { name, level, category, icon, displayOrder } = req.body;

    const result = await updateSkill(
      req.params.id,
      name,
      level,
      category,
      icon,
      displayOrder,
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json({
      message: "Skill updated successfully",
      skill: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

// Delete skill (admin only)
export const removeSkill = async (req, res, next) => {
  try {
    const result = await deleteSkill(req.params.id);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Skill not found" });
    }

    res.json({ message: "Skill deleted successfully" });
  } catch (err) {
    next(err);
  }
};
