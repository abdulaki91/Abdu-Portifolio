import { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "emailjs-com";
import {
  Mail,
  Send,
  User,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Download,
} from "lucide-react";

export default function ContactUs() {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const serviceID = "service_pylyirq";
  const templateID = "template_3uj2dvg";
  const userID = "5afh7B0IcHLdFAYRK";

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!contactData.name || !contactData.email || !contactData.message) {
      setStatus({ type: "error", message: "Please fill in all fields." });
      return;
    }

    setIsLoading(true);
    setStatus({ type: "", message: "" });

    const templateParams = {
      from_name: contactData.name,
      from_email: contactData.email,
      message: contactData.message,
      to_email: "your-email@example.com",
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, userID);
      setContactData({ name: "", email: "", message: "" });
      setStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
      console.error("EmailJS error:", error.text);
    } finally {
      setIsLoading(false);
      setTimeout(() => setStatus({ type: "", message: "" }), 5000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 text-gradient">
          Let's Work Together
        </h2>
        <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
          Have a project in mind? Let's discuss how I can help bring your ideas
          to life
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <div className="glass rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-base-content">
              Get in Touch
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-base-content">Email</p>
                  <a
                    href="mailto:abdulakimustefa@gmail.com"
                    className="text-base-content/60 hover:text-primary transition-colors"
                  >
                    abdulakimustefa@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <User className="text-secondary" size={24} />
                </div>
                <div>
                  <p className="font-semibold text-base-content">Location</p>
                  <p className="text-base-content/60">Haramaya, Ethiopia</p>
                </div>
              </div>
            </div>

            {/* Download CV */}
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href="/PDF/mycv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Abdulaki_Mustefa_CV"
              className="btn btn-outline btn-primary w-full mt-6 group"
            >
              <Download className="mr-2 group-hover:animate-bounce" size={20} />
              Download My CV
            </motion.a>
          </div>

          {/* Quick Links */}
          <div className="glass rounded-2xl p-6">
            <p className="text-sm text-base-content/60 mb-3">
              Prefer other platforms?
            </p>
            <div className="flex gap-3">
              <a
                href="https://github.com/abex-COM"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline flex-1"
              >
                GitHub
              </a>
              <a
                href="https://t.me/abex91"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline flex-1"
              >
                Telegram
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-2xl p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="form-control">
              <label className="label" htmlFor="name">
                <span className="label-text font-semibold">Your Name</span>
              </label>
              <div className="relative">
                <User
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40"
                  size={20}
                />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={contactData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="input input-bordered w-full pl-12 focus:input-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text font-semibold">Your Email</span>
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-base-content/40"
                  size={20}
                />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={contactData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="input input-bordered w-full pl-12 focus:input-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Message Input */}
            <div className="form-control">
              <label className="label" htmlFor="message">
                <span className="label-text font-semibold">Your Message</span>
              </label>
              <div className="relative">
                <MessageSquare
                  className="absolute left-4 top-4 text-base-content/40"
                  size={20}
                />
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={contactData.message}
                  onChange={handleInputChange}
                  placeholder="Tell me about your project..."
                  className="textarea textarea-bordered w-full pl-12 pt-4 resize-none focus:textarea-primary transition-all"
                  required
                />
              </div>
            </div>

            {/* Status Message */}
            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`alert ${
                  status.type === "success" ? "alert-success" : "alert-error"
                }`}
              >
                {status.type === "success" ? (
                  <CheckCircle2 size={20} />
                ) : (
                  <AlertCircle size={20} />
                )}
                <span>{status.message}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="btn bg-gradient-to-r from-primary to-secondary text-white border-none w-full hover:opacity-90 transition-all"
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Sending...
                </>
              ) : (
                <>
                  <Send size={20} />
                  Send Message
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
