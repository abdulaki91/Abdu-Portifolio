const SkillCard = ({ title }) => {
  return (
    <div
      id="skill"
      className="card group shadow-lg dark:bg-base-200 bg-base-100 border border-base-200 dark:border-base-300 
      rounded-2xl p-6 flex flex-col items-center justify-center
      transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-r from-primary to-secondary
      hover:text-white cursor-pointer"
    >
      <div className="flex items-center justify-center mb-2">
        <h3 className="text-lg md:text-xl font-semibold font-poppins text-base-content group-hover:text-white">
          {title}
        </h3>
      </div>
      <div className="w-16 h-1 bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
    </div>
  );
};

export default SkillCard;
