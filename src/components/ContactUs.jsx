import { useState } from "react";
import emailjs from "emailjs-com";

export default function ContactUs() {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const serviceID = "service_pylyirq";
  const templateID = "template_3uj2dvg";
  const userID = "5afh7B0IcHLdFAYRK"; // Your public key

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!contactData.name || !contactData.email || !contactData.message) {
      setMessage("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    const templateParams = {
      from_name: contactData.name,
      from_email: contactData.email,
      message: contactData.message,
      to_email: "your-email@example.com",
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, userID);
      setContactData({ name: "", email: "", message: "" });
      setMessage("✅ Message sent successfully!");
    } catch (error) {
      setMessage("❌ Failed to send message. Please try again.");
      console.error("EmailJS error:", error.text);
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(""), 4000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12
        bg-base-100/80 dark:bg-base-200/60 transition-all duration-700"
    >
      <h2
        className="text-4xl md:text-5xl font-extrabold mb-10 text-center
        bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-poppins animate-gradient-text"
      >
        Contact Me
      </h2>

      <div
        className="max-w-xl w-full bg-base-100/90 dark:bg-base-200/60 rounded-2xl shadow-xl p-8 border border-base-200 dark:border-base-300
        transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
      >
        <form className="flex flex-col w-full" onSubmit={handleSubmit}>
          {/* Name */}
          <div className="form-control mb-4">
            <label className="label" htmlFor="name">
              <span className="label-text font-medium text-base-content/80 dark:text-base-content/70">
                Name
              </span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={contactData.name}
              onChange={handleInputChange}
              placeholder="Your Name"
              className="input input-bordered w-full focus:ring-2 focus:ring-primary transition-all"
              required
            />
          </div>

          {/* Email */}
          <div className="form-control mb-4">
            <label className="label" htmlFor="email">
              <span className="label-text font-medium text-base-content/80 dark:text-base-content/70">
                Email
              </span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={contactData.email}
              onChange={handleInputChange}
              placeholder="Your Email"
              className="input input-bordered w-full focus:ring-2 focus:ring-primary transition-all"
              required
            />
          </div>

          {/* Message */}
          <div className="form-control mb-6">
            <label className="label" htmlFor="message">
              <span className="label-text font-medium text-base-content/80 dark:text-base-content/70">
                Message
              </span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={contactData.message}
              onChange={handleInputChange}
              placeholder="Your Message"
              className="textarea textarea-bordered w-full resize-none focus:ring-2 focus:ring-primary transition-all"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-full flex items-center justify-center gap-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-spinner loading-md text-white"></span>
            ) : (
              "Send Message"
            )}
          </button>
        </form>

        {/* Status Message */}
        {message && (
          <p className="mt-4 text-center font-medium text-sm text-base-content/80 dark:text-base-content/70">
            {message}
          </p>
        )}
      </div>

      {/* Extra Info */}
      <p className="text-sm text-center mt-6 text-base-content/70 dark:text-base-content/60">
        Feel free to reach out for any inquiries or collaborations!
      </p>
      <p className="text-sm text-center mt-2 text-base-content/70 dark:text-base-content/60">
        You can also download my CV for more details.
      </p>
      <a
        href="/PDF/mycv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        download="Abdulaki CV"
        className="btn btn-secondary mt-4 rounded-full transition-transform hover:scale-105"
      >
        Download CV
      </a>
    </section>
  );
}
