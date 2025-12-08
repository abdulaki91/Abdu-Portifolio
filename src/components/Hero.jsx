import React from "react";

const ProfileCard = () => {
  return (
    <div
      className="relative h-[22rem] w-full flex flex-col items-center justify-center overflow-hidden
      bg-white/90 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700
      shadow-xl rounded-2xl p-8 transition-all duration-500"
    >
      {/* Animated Gradient Background */}
      <div
        className="absolute inset-0 -z-10
        bg-gradient-to-r from-cyan-100 via-lime-100 to-pink-100
        dark:from-gray-900 dark:via-purple-900 dark:to-pink-900
        animate-gradient-move opacity-80 rounded-2xl"
      ></div>

      {/* Moving soft orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-200/30 dark:bg-purple-700/20 blur-3xl rounded-full opacity-40 animate-[pulse_6s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-pink-200/30 dark:bg-pink-700/20 blur-3xl rounded-full opacity-40 animate-[pulse_8s_ease-in-out_infinite]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-cyan-500 via-lime-500 to-pink-500 bg-clip-text text-transparent font-poppins">
          Abdulaki Mustefa
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-2 opacity-90 font-inter">
          Software Developer
        </h2>
        <p className="mt-4 text-base text-gray-700 dark:text-gray-300 max-w-xl mx-auto leading-relaxed font-satoshi">
          Passionate about building modern, intelligent, and user-friendly
          digital solutions that make an impact.
        </p>
      </div>

      {/* Tailwind Keyframes for gradient animation */}
      <style jsx>{`
        @keyframes gradient-move {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradient-move 20s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default ProfileCard;
