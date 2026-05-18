import {
  getAllProjects,
  getProjectById,
  insertProject,
  updateProject,
  deleteProject,
} from "../models/projectModel.js";

// Get all projects (public)
export const listProjects = async (req, res, next) => {
  try {
    const result = await getAllProjects();
    res.json({ projects: result.rows });
  } catch (err) {
    next(err);
  }
};

// Get single project (public)
export const getProject = async (req, res, next) => {
  try {
    const result = await getProjectById(req.params.id);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ project: result.rows[0] });
  } catch (err) {
    next(err);
  }
};

// Create project (admin only)
export const createProject = async (req, res, next) => {
  try {
    const projectData = {
      title: req.body.title,
      description: req.body.description,
      fullDescription: req.body.fullDescription || req.body.description,
      features: req.body.features || [],
      techStack: req.body.techStack || [],
      githubLink: req.body.githubLink || "",
      liveLink: req.body.liveLink || "",
      imageUrl: req.body.imageUrl || "",
      isFeatured: req.body.isFeatured || false,
      displayOrder: req.body.displayOrder || 0,
    };

    const result = await insertProject(projectData);
    res.status(201).json({
      message: "Project created successfully",
      project: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

// Update project (admin only)
export const editProject = async (req, res, next) => {
  try {
    const projectData = {
      title: req.body.title,
      description: req.body.description,
      fullDescription: req.body.fullDescription || req.body.description,
      features: req.body.features || [],
      techStack: req.body.techStack || [],
      githubLink: req.body.githubLink || "",
      liveLink: req.body.liveLink || "",
      imageUrl: req.body.imageUrl || "",
      isFeatured: req.body.isFeatured || false,
      displayOrder: req.body.displayOrder || 0,
    };

    const result = await updateProject(req.params.id, projectData);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({
      message: "Project updated successfully",
      project: result.rows[0],
    });
  } catch (err) {
    next(err);
  }
};

// Delete project (admin only)
export const removeProject = async (req, res, next) => {
  try {
    const result = await deleteProject(req.params.id);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    next(err);
  }
};
