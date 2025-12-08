const databaseSkills = ["MySQL", "PostgreSQL", "MongoDB"];

function Database({ dbName }) {
  return (
    <div
      className="flex items-center justify-center p-6 rounded-2xl shadow-lg 
      bg-base-200 dark:bg-base-300 hover:bg-gradient-to-r hover:from-primary 
      hover:to-secondary hover:text-white transition-all duration-500 
      w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 cursor-pointer mx-auto"
    >
      <p className="text-lg md:text-xl font-semibold font-poppins text-center">
        {dbName}
      </p>
    </div>
  );
}

export default function DatabaseList() {
  return (
    <section className="max-w-4xl mx-auto p-6 flex flex-col items-center">
      <h1
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-8
        bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent 
        font-poppins text-center"
      >
        Databases
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full justify-items-center">
        {databaseSkills.map((db, index) => (
          <Database key={index} dbName={db} />
        ))}
      </div>
    </section>
  );
}
