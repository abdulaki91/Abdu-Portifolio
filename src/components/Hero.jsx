import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { FaTelegram } from "react-icons/fa";

const ProfileCard = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-mesh bg-noise">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-primary/10 via-transparent to-transparent rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-secondary/10 via-transparent to-transparent rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 max-w-5xl mx-auto px-4 text-center"
      >
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Available for opportunities
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight"
        >
          <span className="block text-base-content">Hi, I'm</span>
          <span className="block text-gradient animate-gradient">
            Abdulaki Mustefa
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl lg:text-3xl text-base-content/70 mb-4 font-medium"
        >
          Full-Stack Developer & Problem Solver
        </motion.p>

        {/* Value Proposition */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-base-content/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I craft elegant digital solutions that transform complex challenges
          into intuitive experiences. Specializing in modern web and mobile
          applications with a focus on performance, accessibility, and user
          delight.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="btn btn-lg bg-gradient-to-r from-primary to-secondary text-white border-none hover:opacity-90 shadow-lg hover:shadow-xl transition-all group"
          >
            View My Work
            <ArrowRight
              className="ml-2 group-hover:translate-x-1 transition-transform"
              size={20}
            />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/PDF/mycv.pdf"
            download="Abdulaki_Mustefa_CV"
            className="btn btn-lg btn-outline btn-primary hover:bg-primary hover:text-white transition-all group"
          >
            <Download className="mr-2 group-hover:animate-bounce" size={20} />
            Download CV
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center items-center"
        >
          <motion.a
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            href="https://github.com/abex-COM"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-circle btn-ghost hover:bg-primary/10 hover:text-primary transition-all"
            aria-label="GitHub"
          >
            <Github size={24} />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            href="https://t.me/abex91"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-circle btn-ghost hover:bg-primary/10 hover:text-primary transition-all"
            aria-label="Telegram"
          >
            <FaTelegram size={24} />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-circle btn-ghost hover:bg-primary/10 hover:text-primary transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            href="#contact"
            className="btn btn-circle btn-ghost hover:bg-primary/10 hover:text-primary transition-all"
            aria-label="Email"
          >
            <Mail size={24} />
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.5,
            duration: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-base-content/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProfileCard;
