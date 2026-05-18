import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import {
  uploadSingle,
  uploadMultiple,
  uploadFields,
  uploadFile,
  uploadMultipleFiles,
  deleteFile,
  getFileInfo,
} from "../controllers/uploadController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Upload single file (CV, profile photo, etc.)
router.post("/single/:type", authenticateToken, (req, res) => {
  const { type } = req.params;
  const uploadMiddleware = uploadSingle(type);

  uploadMiddleware(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    uploadFile(req, res);
  });
});

// Upload multiple files
router.post("/multiple/:type", authenticateToken, (req, res) => {
  const { type } = req.params;
  const uploadMiddleware = uploadMultiple(type, 10);

  uploadMiddleware(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }
    uploadMultipleFiles(req, res);
  });
});

// Upload mixed files (profile + cv + icons)
router.post("/mixed", authenticateToken, (req, res) => {
  const uploadMiddleware = uploadFields([
    { name: "cv", maxCount: 1 },
    { name: "profile", maxCount: 1 },
    { name: "icon", maxCount: 5 },
    { name: "document", maxCount: 10 },
  ]);

  uploadMiddleware(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err.message,
      });
    }

    try {
      const result = {};

      if (req.files) {
        Object.keys(req.files).forEach((fieldname) => {
          result[fieldname] = req.files[fieldname].map((file) => ({
            filename: file.filename,
            originalName: file.originalname,
            mimetype: file.mimetype,
            size: file.size,
            url: `/uploads/${path.basename(path.dirname(file.path))}/${file.filename}`,
          }));
        });
      }

      res.status(200).json({
        success: true,
        message: "Files uploaded successfully",
        files: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Upload processing failed",
        error: error.message,
      });
    }
  });
});

// Delete file
router.delete("/:filename", authenticateToken, deleteFile);

// Get file info
router.get("/info/:filename", getFileInfo);

// Serve uploaded files (public access)
router.get("/:category/:filename", (req, res) => {
  const { category, filename } = req.params;
  const filePath = path.join(__dirname, "../uploads", category, filename);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({
      success: false,
      message: "File not found",
    });
  }
});

export default router;
