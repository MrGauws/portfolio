// frontend/src/components/Footer.tsx
"use client";

import { useState } from "react";
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram, FaShareAlt } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { motion } from "framer-motion";

const Footer = () => {
  const [copyMessage, setCopyMessage] = useState(""); // State för att visa kopieringsmeddelande

  const handleShare = async () => {
    const shareData = {
      title: "Herman Engström | Full-Stack Developer Portfolio",
      text: "Check out my portfolio showcasing my skills and projects as a full-stack developer!",
      url: window.location.href, // Hämta aktuell URL
    };

    try {
      if (navigator.share) {
        // Använd navigator.share om det stöds (främst mobila enheter)
        await navigator.share(shareData);
      } else {
        // Fallback: Kopiera URL:en till urklippet
        await navigator.clipboard.writeText(shareData.url);
        setCopyMessage("Link copied to clipboard!");
        setTimeout(() => setCopyMessage(""), 2000); // Dölj meddelandet efter 2 sekunder
      }
    } catch (error) {
      console.error("Error sharing:", error);
      setCopyMessage("Failed to copy link.");
      setTimeout(() => setCopyMessage(""), 2000);
    }
  };

  return (
    <footer className="bg-black dark:bg-gray-900 text-gray-400 py-6 border-t border-gray-800 relative">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center space-y-4">
        {/* Social Media Links and Share Button (Centered) */}
        <div className="flex space-x-4 items-center">
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
          {/* Share Button */}
          <motion.button
            onClick={handleShare}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-gray-400 hover:text-teal-500 transition-colors duration-200 relative"
            aria-label="Share portfolio"
          >
            <FaShareAlt className="text-2xl" />
            {/* Copy confirmation message */}
            {copyMessage && (
              <motion.span
                className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded p-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                {copyMessage}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>

      {/* Copyright in bottom-right corner */}
      <div className="absolute bottom-2 right-4 text-gray-500 text-xs">
        <p>Copyright Herman Engström</p>
      </div>
    </footer>
  );
};

export default Footer;