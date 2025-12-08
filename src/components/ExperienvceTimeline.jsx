const ExperienceTimeline = ({ title, subtitle, icon }) => {
  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="relative space-y-8 border-l-4 border-gray-300 dark:border-gray-600 pl-6">
        <div className="relative flex items-start group">
          {/* Timeline Icon */}
          <div className="absolute -left-7 top-0 bg-gradient-to-tr from-primary to-secondary text-white rounded-full p-3 shadow-lg flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
            {icon}
          </div>

          {/* Content Card */}
          <div
            className="ml-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 dark:from-indigo-900 dark:via-purple-800 dark:to-pink-900
          rounded-2xl p-5 shadow-lg transition-transform duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl"
          >
            <h3 className="text-lg md:text-xl font-bold font-poppins text-white drop-shadow-md">
              {title}
            </h3>
            <p className="text-sm md:text-base text-white/80 mt-1 font-inter leading-relaxed">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperienceTimeline;
