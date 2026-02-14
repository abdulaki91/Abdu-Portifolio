import { motion } from "framer-motion";
import { ExternalLink, Github, Info, Sparkles } from "lucide-react";

const ProjectCard = ({
  title = "Default Project Title",
  description = "Default Project Description",
  liveLink = "#",
  link = "#",
  techStack = [],
  featured = false,
  onViewDetails,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      id="project"
      className={`card group shadow-xl dark:bg-base-200/60 bg-base-100/80 border border-base-200 dark:border-base-300
      hover:shadow-2xl transition-all duration-500 hover:border-primary/50 rounded-2xl p-6 relative overflow-hidden
      ${featured ? "ring-2 ring-primary/30" : ""}`}
    >
      {/* Featured Badge */}
      {featured && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: "spring" }}
          className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg"
        >
          <Sparkles size={12} />
          Featured
        </motion.div>
      )}

      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-poppins">
            {title}
          </h2>
          <p className="text-base text-base-content/70 leading-relaxed font-inter mb-4">
            {description}
          </p>
        </div>

        {/* Tech Stack Tags */}
        {techStack && techStack.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-4"
          >
            {techStack.map((tech, index) => (
              <motion.span
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className="badge badge-outline badge-sm hover:badge-primary transition-all duration-300 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3">
          {onViewDetails && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onViewDetails}
              className="btn btn-outline btn-primary font-semibold tracking-wide transition-all duration-300 
              hover:shadow-md flex items-center justify-center gap-2"
            >
              <Info size={18} />
              View Details
            </motion.button>
          )}

          {link && (
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={link}
              className="btn btn-outline btn-secondary font-semibold tracking-wide transition-all duration-300 
              hover:shadow-md flex items-center justify-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={18} />
              View Code
            </motion.a>
          )}

          {liveLink && liveLink !== "#" && (
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn bg-gradient-to-r from-primary to-secondary text-white border-none font-semibold
              tracking-wide hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <ExternalLink size={18} />
              View Live
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
