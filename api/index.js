import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "Portfolio API is running" });
});

// Import routes
const initRoutes = await import("./routes/initRoute.js");
const authRoutes = await import("./routes/authRoute.js");
const projectRoutes = await import("./routes/projectRoute.js");
const skillRoutes = await import("./routes/skillRoute.js");
const experienceRoutes = await import("./routes/experienceRoute.js");
const settingsRoutes = await import("./routes/settingsRoute.js");
const userRoutes = await import("./routes/userRoute.js");

// Register routes
app.use("/api/init", initRoutes.default);
app.use("/api/auth", authRoutes.default);
app.use("/api/projects", projectRoutes.default);
app.use("/api/skills", skillRoutes.default);
app.use("/api/experiences", experienceRoutes.default);
app.use("/api/settings", settingsRoutes.default);
app.use("/api/users", userRoutes.default);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});
