import profileImage from "../assets/images/profile.jpg";

const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-12
      bg-base-100/80 dark:bg-base-200/60 transition-all duration-700"
    >
      {/* Card Container */}
      <div
        className="max-w-3xl bg-base-100/90 dark:bg-base-200/60 shadow-xl rounded-2xl p-8 border border-base-200 dark:border-base-300
        transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl"
      >
        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-poppins">
          About Me
        </h1>

        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={profileImage}
            alt="Profile"
            className="rounded-full w-[150px] h-[150px] object-cover ring-4 ring-primary/40 shadow-md transition-transform duration-500 hover:scale-105"
          />
          <p className="text-lg md:text-xl font-semibold mt-4 text-base-content/90 font-inter">
            Software Developer
          </p>
        </div>

        {/* Description */}
        <p className="text-base md:text-lg leading-relaxed text-base-content/70 font-light font-satoshi">
          I’m a passionate software developer dedicated to crafting innovative
          and user-friendly digital solutions. With strong expertise in modern
          web and mobile technologies, I enjoy transforming complex ideas into
          efficient, real-world applications. I’m always eager to learn, grow,
          and contribute to meaningful projects that make a difference.
        </p>
      </div>
    </section>
  );
};

export default About;
