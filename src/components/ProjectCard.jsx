const ProjectCard = ({
  title = "Default Project Title",
  description = "Default Project Description",
  liveLink = "#",
  link = "#",
}) => {
  return (
    <div
      id="project"
      className="card group shadow-xl dark:bg-base-200/60 bg-base-100/80 border border-base-200 dark:border-base-300
      hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-primary/50 rounded-2xl p-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-poppins">
          {title}
        </h2>
        <p className="text-base text-base-content/70 leading-relaxed font-inter">
          {description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex flex-col gap-3">
        <a
          href={link}
          className="btn btn-outline btn-secondary font-semibold tracking-wide transition-all duration-300 
          hover:scale-105 hover:shadow-md"
          target="_blank"
          rel="noopener noreferrer"
        >
          💻 View Code
        </a>

        {liveLink && (
          <a
            href={liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-gradient-to-r from-primary to-secondary text-white border-none font-semibold
            tracking-wide hover:opacity-90 hover:scale-105 transition-all duration-300"
          >
            🚀 View Live
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
