import { Briefcase, Code, GraduationCap } from "lucide-react";
import About from "../components/About";
import ProfileCard from "../components/Hero";
import ProjectCard from "../components/ProjectCard";
import SkillCard from "../components/SkillCard";
import ExperienceTimeline from "../components/ExperienvceTimeline";
import ContactUs from "../components/ContactUs";
import DatabaseList from "../components/Datatabase";
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
    title: "Abbabiyo",
    description:
      "Abbabiyo is a multilingual AI assistant for Ethiopian farmers, offering farming tips, disease detection, and real-time updates",
    link: "https://github.com/abex-COM/Abbabiyo-Mobile-App",
    liveLink: "https://apkpure.com/p/com.abdulaki.Abbabiyo",
  },
  {
    title: "Grading System",
    description:
      "Grading System is a simple web app that helps Ethiopian students and educators calculate GPAs, manage grades, and track academic performance with ease.",
    link: "https://github.com/abex-COM/Grading-System",
    liveLink: "https://grading-system.abdiko.com",
  },
  {
    title: "Project Monitoring System",
    description:
      "Project Monitoring System is a comprehensive tool designed to help organizations track project progress, manage resources, and ensure timely delivery.",
    link: "https://github.com/EntoB/Project-Monitoring-SSGI",
    liveLink: "#",
  },
  {
    title: "Attendio",
    description:
      "Attendio  is a web app for taking and managing employee(student) attendance efficiently. It simplifies tracking work hours and attendance records, helping organizations streamline workforce management.",
    link: "https://github.com/abdulaki91/Attendio",
    liveLink: "https://attendio.abdiko.com",
  },
  {
    title: "Atomic Blog",
    description:
      "Atomic Blog is a platform dedicated to sharing insights, tutorials, and discussions on contemporary web development practices, design principles, and the latest in technology trends.",
    link: "https://github.com/abex-COM/Atomic-Blog",
    liveLink: "https://atomic-blog.abdiko.com",
  },
  {
    title: "Nesiha Herbal Clinic",
    description:
      "Nesiha Herbal Clinic is a web application designed to manage clinic operations efficiently. It helps track patient appointments, medical records, and herbal treatment plans, streamlining daily workflows for better patient care.",
    link: "",
    liveLink: "https://www.nesihaherbalclinic.com/",
  },
];

const skills = [
  "React",
  "React Native",
  "Javascript",
  "Python",
  "C++",
  "Node.js",
];

export default function HomePage() {
  return (
    <div>
      <div className="container mx-auto p-4">
        <ProfileCard />
        <About />

        {/* Projects Section */}
        <section className="my-12">
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-8 text-center
            bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-poppins"
          >
            Projects
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectData.map((project, index) => (
              <ProjectCard
                key={index}
                title={project.title}
                description={project.description}
                link={project.link}
                liveLink={project.liveLink}
              />
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="my-12">
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-8 text-center
            bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-poppins"
          >
            Skills
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <SkillCard key={index} title={skill} />
            ))}
          </div>
        </section>

        {/* Databases Section */}
        <section className="my-12">
          <DatabaseList />
        </section>

        {/* Experience Section */}
        <section id="experience" className="my-12">
          <h1
            className="text-4xl md:text-5xl font-extrabold mb-8 text-center
            bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-poppins"
          >
            Experience & Education
          </h1>
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
        </section>

        {/* Contact Section */}
        <section className="my-12">
          <ContactUs />
        </section>
      </div>
    </div>
  );
}
