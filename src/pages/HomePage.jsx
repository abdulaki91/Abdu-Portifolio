import { useState, useEffect } from "react";
import { Briefcase, Code, GraduationCap } from "lucide-react";
import { FaBriefcase } from "react-icons/fa";
import About from "../components/About";
import ProfileCard from "../components/Hero";
import BentoProjectGrid from "../components/BentoProjectGrid";
import SkillCard from "../components/SkillCard";
import ExperienceTimeline from "../components/ExperienvceTimeline";
import ContactUs from "../components/ContactUs";
import ProjectModal from "../components/ProjectModal";
import { projectsAPI, skillsAPI, experiencesAPI } from "../services/api";

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fallback data (your original static data)
  const fallbackTimelineData = [
    {
      icon: <FaBriefcase />,
      title: "Graduate Assistant II (GAII)",
      subtitle: "Haramaya University, Haramaya, Ethiopia — Current Position",
    },
    {
      icon: <Briefcase className="text-gray-700 dark:text-gray-200" />,
      title: "Intern at SSGI Company",
      subtitle: "Summer 2024",
    },
    {
      icon: <GraduationCap className="text-gray-700 dark:text-gray-200" />,
      title: "BSc in Computer Science",
      subtitle: "Haramaya University, Graduated 2025",
    },
    {
      icon: <Code className="text-gray-700 dark:text-gray-200" />,
      title: "React & React Native Projects",
      subtitle:
        "Developed several apps including chatbots, dashboards, and mobile UIs",
    },
  ];

  const fallbackProjectData = [
    {
      title: "Kondestock",
      description:
        "A full stack stock and inventory management web application designed to help businesses manage products, track stock levels, monitor transactions, and generate insights.",
      fullDescription:
        "Kondestock is a comprehensive inventory management solution that empowers businesses with real-time stock tracking, product and category management, sales monitoring, and powerful dashboard analytics. Built with modern web technologies, it offers a responsive and intuitive interface for seamless inventory control.",
      features: [
        "Real-time stock tracking",
        "Product and category management",
        "Sales and transaction records",
        "Dashboard analytics and summaries",
        "Responsive UI",
      ],
      techStack: ["React", "Node.js", "Express", "MySQL", "REST APIs"],
      link: "",
      liveLink: "https://kondestock.abdulaki.com",
      featured: true,
    },
    {
      title: "Check Result",
      description:
        "Check Result is a web application that allows students to check their academic results online. It provides a simple and efficient way to access grades and performance reports.",
      techStack: ["React", "JavaScript", "Web"],
      link: "https://github.com/abdulaki91/HU-Result-Checker",
      liveLink: "https://check-result.abdulaki.com",
    },
    // Add more fallback projects as needed
  ];

  const fallbackSkills = [
    { name: "React", level: 90, category: "Frontend" },
    { name: "React Native", level: 85, category: "Mobile" },
    { name: "JavaScript", level: 90, category: "Language" },
    { name: "Node.js", level: 85, category: "Backend" },
    { name: "Python", level: 80, category: "Language" },
    { name: "C++", level: 75, category: "Language" },
    { name: "Express", level: 85, category: "Backend" },
    { name: "MySQL", level: 80, category: "Database" },
    { name: "MongoDB", level: 75, category: "Database" },
  ];

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Try to fetch from API, fall back to static data if it fails
      const [projectsRes, skillsRes, experiencesRes] = await Promise.allSettled(
        [projectsAPI.getAll(), skillsAPI.getAll(), experiencesAPI.getAll()],
      );

      // Handle projects
      if (projectsRes.status === "fulfilled") {
        const apiProjects = projectsRes.value.data.projects.map((project) => ({
          ...project,
          techStack: project.tech_stack,
          link: project.github_link,
          liveLink: project.live_link,
          featured: project.is_featured,
        }));
        setProjects(apiProjects);
      } else {
        setProjects(fallbackProjectData);
      }

      // Handle skills
      if (skillsRes.status === "fulfilled") {
        setSkills(skillsRes.value.data.skills);
      } else {
        setSkills(fallbackSkills);
      }

      // Handle experiences
      if (experiencesRes.status === "fulfilled") {
        const apiExperiences = experiencesRes.value.data.experiences.map(
          (exp) => ({
            icon: <Briefcase className="text-gray-700 dark:text-gray-200" />,
            title: exp.title,
            subtitle: exp.subtitle,
          }),
        );
        setExperiences(apiExperiences);
      } else {
        setExperiences(fallbackTimelineData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Use fallback data
      setProjects(fallbackProjectData);
      setSkills(fallbackSkills);
      setExperiences(fallbackTimelineData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ProfileCard />
      <About />

      {/* Projects Section */}
      <section
        id="projects"
        className="section-padding bg-gray-50 dark:bg-slate-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gradient">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A showcase of my recent work and contributions
            </p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <BentoProjectGrid
              projects={projects}
              onViewDetails={setSelectedProject}
            />
          )}
        </div>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="section-padding bg-gray-50 dark:bg-slate-800"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gradient">
              Skills & Expertise
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {skills.map((skill, index) => (
                <SkillCard
                  key={skill.id || index}
                  title={skill.name}
                  level={skill.level}
                  category={skill.category}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="section-padding bg-white dark:bg-slate-900"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gradient">
              Experience & Education
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              My professional journey and academic background
            </p>
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="space-y-6">
              {experiences.map((item, index) => (
                <ExperienceTimeline
                  key={index}
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="section-padding bg-gray-50 dark:bg-slate-800"
      >
        <ContactUs />
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
