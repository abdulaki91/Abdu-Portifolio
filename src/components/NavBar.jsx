import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function NavBar() {
  const [theme, setTheme] = useState(() => {
    return (
      localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
    );
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Dynamic background classes based on theme
  const navbarBg =
    theme === "light"
      ? "bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 text-white"
      : "bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-gray-200";

  return (
    <div
      className={`navbar sticky top-0 z-50 px-6 ${navbarBg} bg-opacity-95 backdrop-blur-xl shadow-2xl transition-all duration-500`}
    >
      {/* Navbar Start (Menus) */}
      <div className="navbar-start">
        {/* Mobile Menu */}
        <div className="dropdown md:hidden">
          <div
            tabIndex={0}
            role="button"
            className={`btn btn-ghost btn-circle transition-all ${
              theme === "light"
                ? "bg-white/20 text-white hover:bg-pink-300/40 hover:text-white"
                : "bg-gray-800/30 text-gray-200 hover:bg-gray-700/40"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className={`menu menu-sm dropdown-content rounded-lg z-10 mt-3 w-56 p-3 shadow-xl border transition-all ${
              theme === "light"
                ? "bg-white border-gray-200 hover:bg-pink-100"
                : "bg-gray-800 border-gray-700 text-gray-200"
            }`}
          >
            {["Home", "About", "Projects", "Experience", "Contact"].map(
              (item) => (
                <li key={item}>
                  <a
                    href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                    className={`btn btn-ghost font-semibold transition-colors duration-300 ${
                      theme === "light"
                        ? "text-gray-800 hover:text-pink-600"
                        : "text-gray-200 hover:text-yellow-400"
                    }`}
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <ul className="menu menu-horizontal p-0 space-x-4 text-lg">
            {["Home", "About", "Projects", "Experience", "Contact"].map(
              (item) => (
                <li key={item}>
                  <a
                    href={item === "Home" ? "/" : `#${item.toLowerCase()}`}
                    className={`btn btn-ghost font-semibold transition-colors duration-300 ${
                      theme === "light"
                        ? "text-white hover:bg-white/20 hover:text-white rounded-md px-3 py-2"
                        : "text-gray-200 hover:bg-gray-700 hover:text-gray-200 rounded-md px-3 py-2"
                    }`}
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Navbar End (Theme Toggle on Right) */}
      <div className="navbar-end">
        <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </div>
    </div>
  );
}
