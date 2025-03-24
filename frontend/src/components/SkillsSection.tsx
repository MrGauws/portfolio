"use client";

import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaWordpress,
  FaShopify,
  FaPython,
  FaPhp,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiExpress,
  SiTailwindcss,
  SiMongodb,
  SiMysql,
  SiLinux,
} from "react-icons/si";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// Categorized skills with icons and descriptions
const categorizedSkills = [
  {
    category: "🔧 Programming",
    skills: [
      { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" />, description: "Built dynamic and interactive web applications." },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-600" />, description: "Developed typed and secure JavaScript applications." },
      { name: "PHP", icon: <FaPhp className="text-purple-600" />, description: "Worked on server-side logic in web projects." },
      { name: "C#", icon: <SiMysql className="text-purple-800" />, description: "Built applications using object-oriented programming." },
      { name: "Python", icon: <FaPython className="text-blue-500" />, description: "Used for scripting and data processing." },
    ],
  },
  {
    category: "🔧 Frameworks and Libraries",
    skills: [
      { name: "React", icon: <FaReact className="text-cyan-400" />, description: "Built interactive interfaces for web applications." },
      { name: "Next.js", icon: <SiNextdotjs className="text-white" />, description: "Created performance-optimized websites with SSR." },
      { name: "Express.js", icon: <SiExpress className="text-white" />, description: "Built RESTful APIs for backend." },
      { name: "Node.js", icon: <FaNodeJs className="text-green-500" />, description: "Ran JavaScript on the server-side for scalable applications." },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-500" />, description: "Created responsive designs with utility-first CSS." },
      { name: "Framer Motion", icon: <FaReact className="text-pink-500" />, description: "Created smooth animations for user interfaces." },
      { name: "React Type Animation", icon: <FaReact className="text-blue-400" />, description: "Used for typewriter effects in portfolio." },
      { name: "GSAP", icon: <FaReact className="text-green-400" />, description: "Created advanced parallax and timeline animations." },
      { name: "Three.js", icon: <FaReact className="text-purple-400" />, description: "Experimented with 3D graphics in web projects." },
    ],
  },
  {
    category: "🛠️ DevOps & Tools",
    skills: [
      { name: "Git", icon: <FaGitAlt className="text-orange-500" />, description: "Managed version control for projects." },
      { name: "GitHub Pages", icon: <FaGitAlt className="text-gray-400" />, description: "Hosted static websites." },
      { name: "Docker", icon: <FaDocker className="text-blue-500" />, description: "Containerized applications for deployment." },
      { name: "Linux", icon: <SiLinux className="text-white" />, description: "Worked in Linux environments for development." },
      { name: "AWS", icon: <FaAws className="text-orange-400" />, description: "Deployed applications to the cloud." },
      { name: "PowerShell", icon: null, description: "Automated tasks in Windows environments." },
    ],
  },
  {
    category: "🗃️ Databases",
    skills: [
      { name: "MongoDB", icon: <SiMongodb className="text-green-500" />, description: "Managed NoSQL databases in MERN projects." },
      { name: "SQL", icon: <SiMysql className="text-blue-600" />, description: "Worked with relational databases." },
    ],
  },
  {
    category: "🧩 CMS & E-commerce",
    skills: [
      { name: "WordPress", icon: <FaWordpress className="text-blue-700" />, description: "Built and maintained websites." },
      { name: "Shopify", icon: <FaShopify className="text-green-600" />, description: "Created e-commerce solutions." },
    ],
  },
  {
    category: "🌍 Languages",
    skills: [
      { name: "Swedish", icon: null, description: "Native language." },
      { name: "English", icon: null, description: "Fluent in speaking and writing." },
      { name: "Several Nordic/European basics", icon: null, description: "Basic knowledge of several languages." },
    ],
  },
];

export const SkillsSection = () => {
  return (
    <section className="relative py-16 px-4">
      {/* Subtle background effect with particles */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-teal-500 dark:bg-teal-400 rounded-full opacity-10"
            style={{
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${Math.random() * 5 + 5}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      <h2 className="text-4xl font-bold text-center uppercase mb-8 text-accent">
        Skills
      </h2>
      <div className="space-y-12 max-w-5xl mx-auto">
        {categorizedSkills.map((category, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold text-center text-gray-300 dark:text-gray-400 mb-6">
              {category.category}
            </h3>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {category.skills.map((skill, skillIndex) => (
                <div
                  key={skill.name}
                  className="relative group"
                >
                  <motion.div
                    className="bg-gray-800 dark:bg-gray-700 rounded-lg p-4 text-center border border-gray-700 dark:border-gray-600 hover:bg-gray-700 dark:hover:bg-gray-600 hover:scale-105 transition duration-300 flex flex-col items-center justify-center"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    {skill.icon ? (
                      <div className="text-3xl mb-2">{skill.icon}</div>
                    ) : (
                      <div className="text-3xl mb-2 text-gray-400 dark:text-gray-500">⚙️</div>
                    )}
                    <p className="text-gray-300 dark:text-gray-400 text-sm">{skill.name}</p>
                  </motion.div>
                  {/* Tooltip */}
                  <div
                    className="absolute top-[-40px] left-1/2 transform -translate-x-1/2 bg-gray-900 dark:bg-gray-800 text-white dark:text-gray-200 text-xs rounded p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
                  >
                    {skill.description}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};