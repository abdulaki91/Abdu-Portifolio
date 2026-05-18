import { motion } from "framer-motion";
import { Code2, Lightbulb, Rocket, Users } from "lucide-react";
import { useState, useEffect } from "react";
import { settingsAPI } from "../services/api";
import AnimatedCounter from "./AnimatedCounter";
import baseUrl from "../baseURL/baseUrl";

const About = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Fallback data
  const fallbackSettings = {
    about_text:
      "I'm a passionate software developer dedicated to crafting innovative and user-friendly digital solutions. With strong expertise in modern web and mobile technologies, I enjoy transforming complex ideas into efficient, real-world applications.",
    profile_image_path: "/profile.jpg",
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await settingsAPI.getAll();
      setSettings({ ...fallbackSettings, ...response.data.settings });
    } catch (error) {
      console.error("Error fetching settings:", error);
      setSettings(fallbackSettings);
    } finally {
      setLoading(false);
    }
  };

  const highlights = [
    {
      icon: <Code2 size={24} />,
      title: "Clean Code",
      description: "Writing maintainable, scalable solutions",
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Innovation",
      description: "Exploring cutting-edge technologies",
    },
    {
      icon: <Rocket size={24} />,
      title: "Performance",
      description: "Optimized for speed and efficiency",
    },
    {
      icon: <Users size={24} />,
      title: "Collaboration",
      description: "Team player with strong communication",
    },
  ];

  // Simplified animations
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

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            About Me
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Passionate developer dedicated to creating impactful digital
            experiences
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Image Container */}
              <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-1 shadow-2xl">
                {loading ? (
                  <div className="w-full h-96 bg-gray-700 rounded-2xl animate-pulse"></div>
                ) : (
                  <>
                    {/* Preload image */}
                    <img
                      src={
                        settings.profile_image_path?.startsWith("/uploads")
                          ? `${baseUrl}${settings.profile_image_path}`
                          : settings.profile_image_path || "/profile.jpg"
                      }
                      alt=""
                      className="hidden"
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageLoaded(false)}
                    />

                    <img
                      src={
                        settings.profile_image_path?.startsWith("/uploads")
                          ? `${baseUrl}${settings.profile_image_path}`
                          : settings.profile_image_path || "/profile.jpg"
                      }
                      alt="Abdulaki Mustefa - Software Developer"
                      className={`rounded-2xl w-full h-auto object-cover transition-opacity duration-500 ${
                        imageLoaded ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    {!imageLoaded && (
                      <div className="absolute inset-1 bg-gray-700 rounded-2xl animate-pulse"></div>
                    )}
                  </>
                )}
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-2xl shadow-xl"
              >
                <p className="font-bold text-lg">
                  <AnimatedCounter end={3} suffix="+" />
                </p>
                <p className="text-sm opacity-90">Years</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Building the Future, One Line at a Time
              </h3>
              <div className="text-gray-300 leading-relaxed space-y-4">
                {loading ? (
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-1/2"></div>
                  </div>
                ) : (
                  <div className="whitespace-pre-line">
                    {settings.about_text || fallbackSettings.about_text}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-4 text-center border border-gray-600">
                <p className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  <AnimatedCounter end={15} suffix="+" />
                </p>
                <p className="text-sm text-gray-300">Projects</p>
              </div>
              <div className="bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl p-4 text-center border border-gray-600">
                <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  <AnimatedCounter end={10} suffix="+" />
                </p>
                <p className="text-sm text-gray-300">Technologies</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-gray-800 rounded-2xl p-6 text-center hover:shadow-xl transition-all group border border-gray-700 shadow-sm"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 text-white mb-4 group-hover:scale-110 transition-transform shadow-lg">
                {item.icon}
              </div>
              <h4 className="font-bold text-lg mb-2 text-white">
                {item.title}
              </h4>
              <p className="text-sm text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
