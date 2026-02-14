import { motion } from "framer-motion";
import { Heart, ArrowUp } from "lucide-react";
import {
  FaFacebook,
  FaTelegram,
  FaTwitter,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socialLinks = [
    {
      icon: <FaGithub size={20} />,
      href: "https://github.com/abex-COM",
      label: "GitHub",
      color: "hover:text-gray-600 dark:hover:text-gray-400",
    },
    {
      icon: <FaLinkedin size={20} />,
      href: "https://linkedin.com",
      label: "LinkedIn",
      color: "hover:text-blue-600",
    },
    {
      icon: <FaTwitter size={20} />,
      href: "https://x.com/Abdulaki91",
      label: "Twitter",
      color: "hover:text-sky-500",
    },
    {
      icon: <FaTelegram size={20} />,
      href: "https://t.me/abex91",
      label: "Telegram",
      color: "hover:text-cyan-500",
    },
    {
      icon: <FaFacebook size={20} />,
      href: "https://web.facebook.com/Abdulhaqqii.mustafa",
      label: "Facebook",
      color: "hover:text-blue-600",
    },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <footer className="relative bg-base-200 border-t border-base-300">
      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 btn btn-circle bg-gradient-to-r from-primary to-secondary text-white border-none shadow-lg hover:opacity-90"
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </motion.button>

      <div className="max-w-6xl mx-auto px-4 pt-16 pb-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Abdulaki Mustefa
            </h3>
            <p className="text-base-content/60 mb-4">
              Full-Stack Developer passionate about creating impactful digital
              solutions.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`btn btn-circle btn-ghost btn-sm ${social.color} transition-colors`}
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-base-content">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-base-content/60 hover:text-primary transition-colors inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-base-content">
              Get in Touch
            </h4>
            <ul className="space-y-2 text-base-content/60">
              <li>
                <a
                  href="mailto:abdulakimustefa@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  abdulakimustefa@gmail.com
                </a>
              </li>
              <li>Haramaya, Ethiopia</li>
              <li>
                <a
                  href="/PDF/mycv.pdf"
                  download="Abdulaki_Mustefa_CV"
                  className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                  Download CV
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-base-300 pt-8 text-center">
          <p className="text-base-content/60 text-sm flex items-center justify-center gap-2 flex-wrap">
            <span>&copy; {new Date().getFullYear()} Abdulaki Mustefa.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Built with{" "}
              <Heart size={14} className="text-red-500 animate-pulse" /> and
              React
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
}
