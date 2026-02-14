import { motion } from "framer-motion";

const ExperienceTimeline = ({ title, subtitle, icon }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="relative pl-8 pb-8 border-l-2 border-primary/30 last:pb-0"
    >
      {/* Timeline Icon */}
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="absolute -left-5 top-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-lg"
      >
        {icon}
      </motion.div>

      {/* Content Card */}
      <motion.div
        whileHover={{ x: 5 }}
        transition={{ duration: 0.2 }}
        className="glass rounded-2xl p-6 ml-4 hover:shadow-xl transition-all"
      >
        <h3 className="text-xl font-bold text-base-content mb-2">{title}</h3>
        <p className="text-base-content/60 leading-relaxed">{subtitle}</p>
      </motion.div>

      {/* Connecting Line Dot */}
      <div className="absolute -left-[3px] top-12 w-1.5 h-1.5 rounded-full bg-primary/50"></div>
    </motion.div>
  );
};

export default ExperienceTimeline;
