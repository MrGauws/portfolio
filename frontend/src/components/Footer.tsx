"use client";

import { useState } from "react";
import { FaGithub, FaLinkedin, FaYoutube, FaInstagram, FaShareAlt } from "react-icons/fa";
import { SiX } from "react-icons/si";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils"; 

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps) => {
  const [copyMessage, setCopyMessage] = useState(""); 

  const handleShare = async () => {
    const shareData = {
      title: "Herman Engström | Full-Stack Developer Portfolio",
      text: "Check out my portfolio showcasing my skills and projects as a full-stack developer!",
      url: window.location.href, 
    };

    try {
      if (navigator.share) {
        
        await navigator.share(shareData);
      } else {
        
        await navigator.clipboard.writeText(shareData.url);
        setCopyMessage("Link copied to clipboard!");
        setTimeout(() => setCopyMessage(""), 2000); 
      }
    } catch (error) {
      console.error("Error sharing:", error);
      setCopyMessage("Failed to copy link.");
      setTimeout(() => setCopyMessage(""), 2000);
    }
  };

  return (
    <footer className={cn("bg-black dark:bg-gray-900 text-gray-400 py-6 border-t border-gray-800 relative", className)}>
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center space-y-4">
        {/* Social Media Links */}
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
            href="https://www.linkedin.com/in/herman-engstr%C3%B6m-08bb42128/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-500 transition-colors duration-200"
          >
            <FaLinkedin className="text-2xl" />
          </a>
          <a
            href="https://x.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-500 transition-colors duration-200"
          >
            <SiX className="text-2xl" />
          </a>
          <a
            href="https://youtube.com/" 
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-teal-500 transition-colors duration-200"
          >
            <FaYoutube className="text-2xl" />
          </a>
          <a
            href="https://instagram.com/engstromh/" 
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

      {/* Copyright */}
      <div className="absolute bottom-2 right-4 text-gray-500 text-xs">
        <p>Copyright Herman Engström</p>
      </div>
    </footer>
  );
};

export default Footer;