import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";

const BentoProjectGrid = ({ projects, onViewDetails }) => {
  // Separate featured and regular projects
  const featuredProject = projects.find((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      {/* Featured Project - Takes 2 columns on large screens */}
      {featuredProject && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2 lg:row-span-2 group"
        >
          <div
            className="glass rounded-3xl p-8 h-full flex flex-col justify-between hover:shadow-2xl transition-all duration-500 relative overflow-hidden cursor-pointer"
            style={{
              transform: "perspective(1000px)",
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const centerX = rect.width / 2;
              const centerY = rect.height / 2;
              const rotateX = (y - centerY) / 20;
              const rotateY = (centerX - x) / 20;
              e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
            }}
          >
            {/* Featured Badge */}
            <div className="absolute top-6 right-6 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-lg z-10">
              <Sparkles size={16} />
              Featured
            </div>

            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                {featuredProject.title}
              </h3>
              <p className="text-base-content/70 text-lg mb-6 leading-relaxed">
                {featuredProject.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 mb-6">
                {featuredProject.techStack?.map((tech, index) => (
                  <span
                    key={index}
                    className="badge badge-lg badge-primary font-semibold"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 relative z-10">
              {featuredProject.liveLink && featuredProject.liveLink !== "#" && (
                <a
                  href={featuredProject.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn bg-gradient-to-r from-primary to-secondary text-white border-none flex-1 hover:opacity-90"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
              )}
              {featuredProject.link && (
                <a
                  href={featuredProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-secondary flex-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Github size={18} />
                  Code
                </a>
              )}
            </div>
          </div>
        </motion.div>
      )}

      {/* Regular Projects - Bento style with varying sizes */}
      {regularProjects.map((project, index) => {
        // Vary the span for visual interest
        const isWide = index % 5 === 0;
        const colSpan = isWide ? "md:col-span-2" : "";

        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`${colSpan} group`}
          >
            <div
              className="glass rounded-2xl p-6 h-full flex flex-col justify-between hover:shadow-xl transition-all duration-500 cursor-pointer relative overflow-hidden"
              style={{
                transform: "perspective(1000px)",
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 30;
                const rotateY = (centerX - x) / 30;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform =
                  "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
              }}
              onClick={() => onViewDetails(project)}
            >
              {/* Hover Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3 text-base-content group-hover:text-gradient transition-all">
                  {project.title}
                </h3>
                <p className="text-base-content/60 text-sm mb-4 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech Stack */}
                {project.techStack && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.slice(0, 3).map((tech, i) => (
                      <span key={i} className="badge badge-sm badge-outline">
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="badge badge-sm badge-ghost">
                        +{project.techStack.length - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 relative z-10">
                {project.liveLink && project.liveLink !== "#" && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-primary flex-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={14} />
                    Live
                  </a>
                )}
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline btn-secondary flex-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={14} />
                    Code
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default BentoProjectGrid;
