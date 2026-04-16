import { motion } from "framer-motion";

const SkillCard = ({ title, level = 85, category = "Frontend" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="glass rounded-2xl p-6 hover:shadow-xl transition-all group"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
          {level}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
        />
      </div>

      {/* Category Badge */}
      <div className="mt-3">
        <span className="text-xs px-2 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium">
          {category}
        </span>
      </div>
    </motion.div>
  );
};

export default SkillCard;
