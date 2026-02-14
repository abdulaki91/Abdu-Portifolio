import { Briefcase, Code, GraduationCap } from "lucide-react";
import { useState } from "react";
import About from "../components/About";
import ProfileCard from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import SkillCard from "../components/SkillCard";
import ExperienceTimeline from "../components/ExperienvceTimeline";
import ContactUs from "../components/ContactUs";
import ProjectModal from "../components/ProjectModal";
import { FaBriefcase } from "react-icons/fa";

const timelineData = [
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

const projectData = [
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
    liveLink: "https://kondestock.abdiko.com",
    featured: true,
  },
  {
    title: "Abbabiyo",
    description:
      "Abbabiyo is a multilingual AI assistant for Ethiopian farmers, offering farming tips, disease detection, and real-time updates",
    techStack: ["React Native", "AI/ML", "Mobile"],
    link: "https://github.com/abex-COM/Abbabiyo-Mobile-App",
    liveLink: "https://apkpure.com/p/com.abdulaki.Abbabiyo",
  },
  {
    title: "Grading System",
    description:
      "Grading System is a simple web app that helps Ethiopian students and educators calculate GPAs, manage grades, and track academic performance with ease.",
    techStack: ["React", "JavaScript", "Web"],
    link: "https://github.com/abex-COM/Grading-System",
    liveLink: "https://grading-system.abdiko.com",
  },
  {
    title: "Project Monitoring System",
    description:
      "Project Monitoring System is a comprehensive tool designed to help organizations track project progress, manage resources, and ensure timely delivery.",
    techStack: ["React", "Node.js", "MongoDB"],
    link: "https://github.com/EntoB/Project-Monitoring-SSGI",
    liveLink: "#",
  },
  {
    title: "Attendio",
    description:
      "Attendio  is a web app for taking and managing employee(student) attendance efficiently. It simplifies tracking work hours and attendance records, helping organizations streamline workforce management.",
    techStack: ["React", "Node.js", "Database"],
    link: "https://github.com/abdulaki91/Attendio",
    liveLink: "https://attendio.abdiko.com",
  },
  {
    title: "Atomic Blog",
    description:
      "Atomic Blog is a platform dedicated to sharing insights, tutorials, and discussions on contemporary web development practices, design principles, and the latest in technology trends.",
    techStack: ["React", "JavaScript", "Blog"],
    link: "https://github.com/abex-COM/Atomic-Blog",
    liveLink: "https://atomic-blog.abdiko.com",
  },
  {
    title: "Nesiha Herbal Clinic",
    description:
      "Nesiha Herbal Clinic is a web application designed to manage clinic operations efficiently. It helps track patient appointments, medical records, and herbal treatment plans, streamlining daily workflows for better patient care.",
    techStack: ["React", "Node.js", "Healthcare"],
    link: "",
    liveLink: "https://www.nesihaherbalclinic.com/",
  },
];

const skills = [
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

export default function HomePage() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <ProfileCard />
      <About />

      {/* Projects Section */}
      <section id="projects" className="section-padding bg-base-200/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gradient">
              Featured Projects
            </h2>
            <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
              A showcase of my recent work and contributions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectData.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                link={project.link}
                liveLink={project.liveLink}
                techStack={project.techStack}
                featured={project.featured}
                onViewDetails={() => setSelectedProject(project)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section-padding">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gradient">
              Skills & Expertise
            </h2>
            <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <SkillCard
                key={index}
                title={skill.name}
                level={skill.level}
                category={skill.category}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section-padding">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gradient">
              Experience & Education
            </h2>
            <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
              My professional journey and academic background
            </p>
          </div>
          <div className="space-y-6">
            {timelineData.map((item, index) => (
              <ExperienceTimeline
                key={index}
                icon={item.icon}
                title={item.title}
                subtitle={item.subtitle}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding bg-base-200/50">
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
