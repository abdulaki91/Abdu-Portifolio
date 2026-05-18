import bcrypt from "bcryptjs";
import { createAdminTable } from "../models/adminModel.js";
import { createProjectsTable } from "../models/projectModel.js";
import { createSkillsTable } from "../models/skillModel.js";
import { createExperiencesTable } from "../models/experienceModel.js";
import {
  createSettingsTable,
  initializeDefaultSettings,
} from "../models/settingsModel.js";
import db from "../config/db.config.js";

const seedDatabase = async () => {
  try {
    console.log("🌱 Starting database seeding...");

    // Create all tables
    console.log("📋 Creating database tables...");

    await createAdminTable();
    console.log("✅ Admins table created");

    await createProjectsTable();
    console.log("✅ Projects table created");

    await createSkillsTable();
    console.log("✅ Skills table created");

    await createExperiencesTable();
    console.log("✅ Experiences table created");

    await createSettingsTable();
    console.log("✅ Settings table created");

    // Initialize default settings
    await initializeDefaultSettings();
    console.log("✅ Default settings initialized");

    // Create admin user
    console.log("👤 Creating admin user...");

    const adminEmail = "abdulakimustefa@gmail.com";
    const adminPassword = "Computer science##//91";
    const adminUsername = "abdulaki";

    // Check if admin already exists
    const existingAdmin = await db.query(
      "SELECT * FROM admins WHERE email = $1",
      [adminEmail],
    );

    if (existingAdmin.rows.length > 0) {
      console.log("⚠️  Admin user already exists, skipping creation");
    } else {
      // Hash password
      const hashedPassword = await bcrypt.hash(adminPassword, 10);

      // Insert admin user
      const result = await db.query(
        `INSERT INTO admins (username, email, password, role) 
         VALUES ($1, $2, $3, $4) 
         RETURNING id, username, email, role`,
        [adminUsername, adminEmail, hashedPassword, "admin"],
      );

      console.log("✅ Admin user created successfully:");
      console.log(`   Email: ${result.rows[0].email}`);
      console.log(`   Username: ${result.rows[0].username}`);
      console.log(`   Role: ${result.rows[0].role}`);
    }

    // Seed some sample data (optional)
    console.log("📊 Seeding sample data...");

    // Sample skills
    const sampleSkills = [
      { name: "React", level: 90, category: "Frontend", display_order: 1 },
      { name: "Node.js", level: 85, category: "Backend", display_order: 2 },
      { name: "JavaScript", level: 90, category: "Language", display_order: 3 },
      { name: "PostgreSQL", level: 80, category: "Database", display_order: 4 },
      { name: "Python", level: 80, category: "Language", display_order: 5 },
      { name: "React Native", level: 85, category: "Mobile", display_order: 6 },
    ];

    for (const skill of sampleSkills) {
      const existingSkill = await db.query(
        "SELECT * FROM skills WHERE name = $1",
        [skill.name],
      );

      if (existingSkill.rows.length === 0) {
        await db.query(
          `INSERT INTO skills (name, level, category, display_order) 
           VALUES ($1, $2, $3, $4)`,
          [skill.name, skill.level, skill.category, skill.display_order],
        );
        console.log(`   ✅ Added skill: ${skill.name}`);
      }
    }

    // Sample experiences
    const sampleExperiences = [
      {
        title: "Graduate Assistant II (GAII)",
        subtitle: "Haramaya University, Haramaya, Ethiopia — Current Position",
        type: "work",
        is_current: true,
        display_order: 1,
      },
      {
        title: "Intern at SSGI Company",
        subtitle: "Summer 2024",
        type: "work",
        is_current: false,
        display_order: 2,
      },
      {
        title: "BSc in Computer Science",
        subtitle: "Haramaya University, Graduated 2025",
        type: "education",
        is_current: false,
        display_order: 3,
      },
    ];

    for (const experience of sampleExperiences) {
      const existingExp = await db.query(
        "SELECT * FROM experiences WHERE title = $1",
        [experience.title],
      );

      if (existingExp.rows.length === 0) {
        await db.query(
          `INSERT INTO experiences (title, subtitle, type, is_current, display_order) 
           VALUES ($1, $2, $3, $4, $5)`,
          [
            experience.title,
            experience.subtitle,
            experience.type,
            experience.is_current,
            experience.display_order,
          ],
        );
        console.log(`   ✅ Added experience: ${experience.title}`);
      }
    }

    // Sample projects
    const sampleProjects = [
      {
        title: "Kondestock",
        description:
          "A full stack stock and inventory management web application designed to help businesses manage products, track stock levels, monitor transactions, and generate insights.",
        full_description:
          "Kondestock is a comprehensive inventory management solution that empowers businesses with real-time stock tracking, product and category management, sales monitoring, and powerful dashboard analytics. Built with modern web technologies, it offers a responsive and intuitive interface for seamless inventory control.",
        features: [
          "Real-time stock tracking",
          "Product and category management",
          "Sales and transaction records",
          "Dashboard analytics and summaries",
          "Responsive UI",
        ],
        tech_stack: ["React", "Node.js", "Express", "MySQL", "REST APIs"],
        github_link: "",
        live_link: "https://kondestock.abdulaki.com",
        is_featured: true,
        display_order: 1,
      },
      {
        title: "Check Result",
        description:
          "Check Result is a web application that allows students to check their academic results online. It provides a simple and efficient way to access grades and performance reports.",
        full_description:
          "A comprehensive result checking system for students to access their academic performance online with secure authentication and detailed grade reports.",
        features: [
          "Online result checking",
          "Secure authentication",
          "Grade reports",
          "Performance analytics",
        ],
        tech_stack: ["React", "JavaScript", "Web"],
        github_link: "https://github.com/abdulaki91/HU-Result-Checker",
        live_link: "https://check-result.abdulaki.com",
        is_featured: false,
        display_order: 2,
      },
      {
        title: "Attendio",
        description:
          "Attendio is a web app for taking and managing employee(student) attendance efficiently. It simplifies tracking work hours and attendance records, helping organizations streamline workforce management.",
        full_description:
          "A comprehensive attendance management system that helps organizations track employee attendance, work hours, and generate detailed reports for better workforce management.",
        features: [
          "Attendance tracking",
          "Work hours monitoring",
          "Report generation",
          "Employee management",
        ],
        tech_stack: ["React", "Node.js", "Database"],
        github_link: "https://github.com/abdulaki91/Attendio",
        live_link: "https://attendio.abdulaki.com",
        is_featured: false,
        display_order: 3,
      },
    ];

    for (const project of sampleProjects) {
      const existingProject = await db.query(
        "SELECT * FROM projects WHERE title = $1",
        [project.title],
      );

      if (existingProject.rows.length === 0) {
        await db.query(
          `INSERT INTO projects (
            title, description, full_description, features, tech_stack, 
            github_link, live_link, is_featured, display_order
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
          [
            project.title,
            project.description,
            project.full_description,
            project.features,
            project.tech_stack,
            project.github_link,
            project.live_link,
            project.is_featured,
            project.display_order,
          ],
        );
        console.log(`   ✅ Added project: ${project.title}`);
      }
    }

    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\n📋 Summary:");
    console.log("   ✅ All tables created");
    console.log("   ✅ Admin user created");
    console.log("   ✅ Sample skills added");
    console.log("   ✅ Sample experiences added");
    console.log("   ✅ Sample projects added");
    console.log("   ✅ Default settings initialized");

    console.log("\n🔐 Admin Login Credentials:");
    console.log(`   Email: ${adminEmail}`);
    console.log(`   Password: ${adminPassword}`);
    console.log(`   Login URL: http://localhost:3000/admin/login`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
