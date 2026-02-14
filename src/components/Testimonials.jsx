import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useState } from "react";

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      name: "Dr. Ahmed Hassan",
      role: "Project Supervisor, Haramaya University",
      image:
        "https://ui-avatars.com/api/?name=Ahmed+Hassan&background=6366f1&color=fff&size=128",
      rating: 5,
      text: "Abdulaki demonstrated exceptional problem-solving skills and dedication throughout his academic projects. His ability to translate complex requirements into elegant solutions is remarkable.",
    },
    {
      name: "Sarah Johnson",
      role: "Tech Lead, SSGI Company",
      image:
        "https://ui-avatars.com/api/?name=Sarah+Johnson&background=8b5cf6&color=fff&size=128",
      rating: 5,
      text: "During his internship, Abdulaki quickly adapted to our tech stack and contributed meaningful features. His code quality and attention to detail exceeded our expectations.",
    },
    {
      name: "Mohammed Ali",
      role: "Client, Nesiha Herbal Clinic",
      image:
        "https://ui-avatars.com/api/?name=Mohammed+Ali&background=06b6d4&color=fff&size=128",
      rating: 5,
      text: "The clinic management system Abdulaki built has transformed our operations. It's intuitive, reliable, and exactly what we needed. Highly recommended!",
    },
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="section-padding bg-base-200/50">
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
            What People Say
          </h2>
          <p className="text-lg text-base-content/60 max-w-2xl mx-auto">
            Testimonials from colleagues, supervisors, and clients
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="glass rounded-3xl p-8 md:p-12 relative"
        >
          {/* Quote Icon */}
          <div className="absolute top-8 left-8 text-primary/10">
            <Quote size={64} fill="currentColor" />
          </div>

          <div className="relative z-10">
            {/* Rating */}
            <div className="flex gap-1 mb-6 justify-center">
              {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                <Star key={i} size={20} className="text-warning fill-warning" />
              ))}
            </div>

            {/* Testimonial Text */}
            <p className="text-xl md:text-2xl text-base-content/80 text-center mb-8 leading-relaxed italic">
              "{testimonials[activeIndex].text}"
            </p>

            {/* Author Info */}
            <div className="flex items-center justify-center gap-4">
              <img
                src={testimonials[activeIndex].image}
                alt={testimonials[activeIndex].name}
                className="w-16 h-16 rounded-full ring-4 ring-primary/20"
              />
              <div className="text-left">
                <h4 className="font-bold text-lg text-base-content">
                  {testimonials[activeIndex].name}
                </h4>
                <p className="text-base-content/60 text-sm">
                  {testimonials[activeIndex].role}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button
            onClick={prevTestimonial}
            className="btn btn-circle btn-outline btn-primary"
            aria-label="Previous testimonial"
          >
            ‹
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex
                    ? "bg-primary w-8"
                    : "bg-base-content/20"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="btn btn-circle btn-outline btn-primary"
            aria-label="Next testimonial"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
