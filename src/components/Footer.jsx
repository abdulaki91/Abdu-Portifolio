import { FaFacebook, FaTelegram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer
      className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 p-6
                 shadow-inner rounded-t-3xl transition-colors duration-500"
    >
      <div className="container mx-auto text-center space-y-4">
        <p className="font-medium text-sm md:text-base">
          &copy; {new Date().getFullYear()} Abdulaki Mustefa. All rights
          reserved.
        </p>

        <div className="flex justify-center space-x-6 text-2xl">
          <FaFacebook
            onClick={() =>
              window.open(
                "https://web.facebook.com/Abdulhaqqii.mustafa",
                "_blank"
              )
            }
            className="cursor-pointer text-blue-600 hover:scale-125 transition-transform duration-300"
          />
          <FaTwitter
            onClick={() => window.open("https://x.com/Abdulaki91", "_blank")}
            className="cursor-pointer text-sky-500 hover:scale-125 transition-transform duration-300"
          />
          <FaTelegram
            onClick={() => window.open("https://t.me/abex91", "_blank")}
            className="cursor-pointer text-cyan-500 hover:scale-125 transition-transform duration-300"
          />
        </div>
      </div>
    </footer>
  );
}
