import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { FaTelegram } from "react-icons/fa";
import { useState, useEffect } from "react";
import { settingsAPI } from "../services/api";
import baseUrl from "../baseURL/baseUrl";
import defaultHeroBg from "../assets/images/hero-bg.png";

const ProfileCard = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  // Fallback data
  const fallbackSettings = {
    hero_title: "Hi, I'm Abdulaki Mustefa",
    hero_subtitle: "Full-Stack Developer & Problem Solver",
    about_text:
      "I craft elegant digital solutions that transform complex challenges into intuitive experiences.",
    github_url: "https://github.com/abex-COM",
    linkedin_url: "https://linkedin.com",
    contact_email: "abdulakimustefa@gmail.com",
    hero_background_path: "",
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.getAll();
      const settingsData = { ...fallbackSettings, ...response.data.settings };
      setSettings(settingsData);
    } catch (error) {
      console.error("Error fetching settings:", error);
      setSettings(fallbackSettings);
    } finally {
      setLoading(false);
    }
  };

  // Simplified animations for better performance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  // Get background style
  const getBackgroundStyle = () => {
    // Determine the image URL
    let imageUrl = defaultHeroBg;
    
    if (settings.hero_background_path) {
      imageUrl = settings.hero_background_path.startsWith("/uploads")
        ? `${baseUrl}${settings.hero_background_path}`
        : settings.hero_background_path;
    }

    // Modern professional dark gradient fallback that looks good even without an image
    const baseGradient = "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)";
    const overlayGradient = "linear-gradient(135deg, rgba(15, 23, 42, 0.7) 0%, rgba(30, 27, 75, 0.8) 100%)";

    return {
      backgroundImage: `${overlayGradient}, url(${imageUrl}), ${baseGradient}`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "scroll", // Use scroll for better mobile performance
    };
  };

  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-all duration-700"
      style={getBackgroundStyle()}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Simplified animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
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
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            Available for opportunities
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
        >
          <span className="block text-white drop-shadow-lg">
            {loading
              ? "Hi, I'm"
              : settings.hero_title?.split(" ").slice(0, 2).join(" ") ||
                "Hi, I'm"}
          </span>
          <span className="block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            {loading
              ? "Abdulaki Mustefa"
              : settings.hero_title?.split(" ").slice(2).join(" ") ||
                "Abdulaki Mustefa"}
          </span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-4 font-medium drop-shadow-md"
        >
          {loading
            ? "Full-Stack Developer & Problem Solver"
            : settings.hero_subtitle || "Full-Stack Developer & Problem Solver"}
        </motion.p>

        {/* Value Proposition */}
        <motion.p
          variants={itemVariants}
          className="text-base md:text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-sm"
        >
          {loading
            ? "I craft elegant digital solutions that transform complex challenges into intuitive experiences."
            : settings.about_text?.substring(0, 120) + "..." ||
              "I craft elegant digital solutions that transform complex challenges into intuitive experiences."}
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 font-semibold rounded-2xl hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl group"
          >
            View My Work
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={
              settings.cv_file_path?.startsWith("/uploads")
                ? `${baseUrl}${settings.cv_file_path}`
                : settings.cv_file_path || "/PDF/mycv.pdf"
            }
            download="Abdulaki_Mustefa_CV"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all group"
          >
            <Download className="w-5 h-5 group-hover:animate-bounce" />
            Download CV
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          variants={itemVariants}
          className="flex gap-4 justify-center items-center"
        >
          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={settings.github_url || "https://github.com/abex-COM"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 backdrop-blur-md text-white rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
            aria-label="GitHub"
          >
            <Github className="w-6 h-6" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="https://t.me/abex91"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 backdrop-blur-md text-white rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
            aria-label="Telegram"
          >
            <FaTelegram className="w-6 h-6" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href={settings.linkedin_url || "https://linkedin.com"}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/10 backdrop-blur-md text-white rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6" />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            href="#contact"
            className="p-3 bg-white/10 backdrop-blur-md text-white rounded-2xl border border-white/20 hover:bg-white/20 transition-all"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1.5 h-1.5 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ProfileCard;
