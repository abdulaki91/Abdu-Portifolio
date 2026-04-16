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
    <footer className="relative transition-all duration-300 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-700">
      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1, y: -2 }}
        whileTap={{ scale: 0.9 }}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 btn btn-circle btn-gradient shadow-2xl hover:shadow-indigo-500/25"
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
            <p className="text-gray-600 dark:text-gray-300 mb-4">
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
            <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-block"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-gray-900 dark:text-white">
              Get in Touch
            </h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-300">
              <li>
                <a
                  href="mailto:abdulakimustefa@gmail.com"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  abdulakimustefa@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:abdulaki@abdulaki.com"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  abdulaki@abdulaki.com
                </a>
              </li>
              <li>Haramaya University</li>
              <li>
                <a
                  href="/PDF/mycv.pdf"
                  download="Abdulaki_Mustefa_CV"
                  className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Download CV
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-300 dark:border-slate-700 pt-8 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-sm flex items-center justify-center gap-2 flex-wrap">
            <span>&copy; {new Date().getFullYear()} Abdulaki Mustefa</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
