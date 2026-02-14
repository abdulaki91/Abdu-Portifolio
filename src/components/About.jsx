import { motion } from "framer-motion";
import { Code2, Lightbulb, Rocket, Users } from "lucide-react";
import profileImage from "../assets/images/profile.jpg";
import AnimatedCounter from "./AnimatedCounter";

const About = () => {
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

  return (
    <section id="about" className="section-padding bg-base-200/50">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gradient">
            About Me
          </h2>
          <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
            Passionate developer dedicated to creating impactful digital
            experiences
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Decorative Elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary to-secondary rounded-3xl blur-2xl opacity-20 animate-pulse"></div>

              {/* Image Container */}
              <div className="relative glass rounded-3xl p-2 shadow-2xl">
                <img
                  src={profileImage}
                  alt="Abdulaki Mustefa - Software Developer"
                  className="rounded-2xl w-full h-auto object-cover"
                />
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-6 -right-6 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-2xl shadow-xl"
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
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-4 text-base-content">
                Building the Future, One Line at a Time
              </h3>
              <p className="text-base-content/70 leading-relaxed mb-4">
                I'm a passionate software developer dedicated to crafting
                innovative and user-friendly digital solutions. With strong
                expertise in modern web and mobile technologies, I enjoy
                transforming complex ideas into efficient, real-world
                applications.
              </p>
              <p className="text-base-content/70 leading-relaxed">
                Currently serving as a Graduate Assistant II at Haramaya
                University, I combine academic excellence with practical
                development experience. I'm always eager to learn, grow, and
                contribute to meaningful projects that make a difference in
                people's lives.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-primary">
                  <AnimatedCounter end={15} suffix="+" />
                </p>
                <p className="text-sm text-base-content/60">Projects</p>
              </div>
              <div className="glass rounded-xl p-4 text-center">
                <p className="text-3xl font-bold text-secondary">
                  <AnimatedCounter end={10} suffix="+" />
                </p>
                <p className="text-sm text-base-content/60">Technologies</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Highlights Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="glass rounded-2xl p-6 text-center hover:shadow-xl transition-all group"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary text-white mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h4 className="font-bold text-lg mb-2 text-base-content">
                {item.title}
              </h4>
              <p className="text-sm text-base-content/60">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
