// frontend/src/components/Footer.tsx
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram } from "react-icons/fa";
import { SiX } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-black dark:bg-gray-900 text-gray-400 py-6 border-t border-gray-800 relative">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center space-y-4">
        {/* Social Media Links (Centered) */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/MrGauws"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-500 transition-colors duration-200"
          >
            <FaGithub className="text-2xl" />
          </a>
          <a
            href="https://linkedin.com/in/herman-engstrom"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-500 transition-colors duration-200"
          >
            <FaLinkedin className="text-2xl" />
          </a>
          <a
            href="https://x.com/your-username" // Replace with your X profile
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-500 transition-colors duration-200"
          >
            <SiX className="text-2xl" />
          </a>
          <a
            href="https://youtube.com/your-channel" // Replace with your YouTube channel
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-500 transition-colors duration-200"
          >
            <FaYoutube className="text-2xl" />
          </a>
          <a
            href="https://instagram.com/your-username" // Replace with your Instagram profile
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-500 transition-colors duration-200"
          >
            <FaInstagram className="text-2xl" />
          </a>
        </div>
      </div>

      {/* Copyright in bottom-right corner */}
      <div className="absolute bottom-2 right-4 text-gray-500 text-xs">
        <p>© 2025 Herman Engström</p>
      </div>
    </footer>
  );
};

export default Footer;