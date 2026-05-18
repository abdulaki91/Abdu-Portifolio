import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = uploadsDir;

    // Create subdirectories based on file type
    if (file.fieldname === "cv") {
      uploadPath = path.join(uploadsDir, "cv");
    } else if (file.fieldname === "profile" || file.fieldname === "photo") {
      uploadPath = path.join(uploadsDir, "images");
    } else if (file.fieldname === "icon") {
      uploadPath = path.join(uploadsDir, "icons");
    } else {
      uploadPath = path.join(uploadsDir, "documents");
    }

    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }

    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Generate unique filename with timestamp
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext);
    cb(null, `${name}-${uniqueSuffix}${ext}`);
  },
});

// File filter for security
const fileFilter = (req, file, cb) => {
  const allowedTypes = {
    cv: [".pdf", ".doc", ".docx"],
    profile: [".jpg", ".jpeg", ".png", ".webp"],
    photo: [".jpg", ".jpeg", ".png", ".webp"],
    icon: [".svg", ".png", ".ico", ".jpg", ".jpeg"],
    document: [".pdf", ".doc", ".docx", ".txt", ".jpg", ".jpeg", ".png"],
  };

  const ext = path.extname(file.originalname).toLowerCase();
  const fieldAllowedTypes =
    allowedTypes[file.fieldname] || allowedTypes.document;

  if (fieldAllowedTypes.includes(ext)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type for ${file.fieldname}. Allowed: ${fieldAllowedTypes.join(", ")}`,
      ),
      false,
    );
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
});

// Upload single file
export const uploadSingle = (fieldName) => {
  return upload.single(fieldName);
};

// Upload multiple files
export const uploadMultiple = (fieldName, maxCount = 5) => {
  return upload.array(fieldName, maxCount);
};

// Upload mixed files
export const uploadFields = (fields) => {
  return upload.fields(fields);
};

// Controller functions
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
      });
    }

    const fileInfo = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      url: `/uploads/${path.basename(path.dirname(req.file.path))}/${req.file.filename}`,
    };

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      file: fileInfo,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "File upload failed",
      error: error.message,
    });
  }
};

export const uploadMultipleFiles = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No files uploaded",
      });
    }

    const filesInfo = req.files.map((file) => ({
      filename: file.filename,
      originalName: file.originalname,
      mimetype: file.mimetype,
      size: file.size,
      path: file.path,
      url: `/uploads/${path.basename(path.dirname(file.path))}/${file.filename}`,
    }));

    res.status(200).json({
      success: true,
      message: "Files uploaded successfully",
      files: filesInfo,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Files upload failed",
      error: error.message,
    });
  }
};

// Delete file
export const deleteFile = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(uploadsDir, filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.status(200).json({
        success: true,
        message: "File deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "File not found",
      });
    }
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({
      success: false,
      message: "File deletion failed",
      error: error.message,
    });
  }
};

// Get file info
export const getFileInfo = async (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(uploadsDir, filename);

    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      res.status(200).json({
        success: true,
        file: {
          filename,
          size: stats.size,
          created: stats.birthtime,
          modified: stats.mtime,
        },
      });
    } else {
      res.status(404).json({
        success: false,
        message: "File not found",
      });
    }
  } catch (error) {
    console.error("File info error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get file info",
      error: error.message,
    });
  }
};
