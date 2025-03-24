"use client";

import { motion } from "framer-motion";

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  demoLink: string;
  githubLink: string;
}

const ProjectCard = ({ title, description, demoLink, githubLink }: ProjectCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="bg-primary rounded-xl p-6 shadow-lg hover:shadow-[0_0_15px_#14b8a6] hover:scale-[1.02] transition-all duration-300"
    >
      <h3 className="text-xl font-bold text-accent">{title}</h3>
      <p className="mt-2 text-gray-300">{description}</p>
      <div className="mt-4 flex space-x-4">
        <a href={demoLink} target="_blank" className="text-accent hover:underline">
          🚀 Demo
        </a>
        <a href={githubLink} target="_blank" className="text-gray-400 hover:underline">
          🖥️ GitHub
        </a>
      </div>
    </motion.div>
  );
};

export default ProjectCard;