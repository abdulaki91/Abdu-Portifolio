import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

// Verify JWT token
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  jwt.verify(token, JWT_SECRET, (err, admin) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    req.admin = admin;
    next();
  });
};

// Optional: Role-based access control
export const requireAdmin = (req, res, next) => {
  if (req.admin.role !== "admin") {
    return res.status(403).json({ message: "Admin access required" });
  }
  next();
};
