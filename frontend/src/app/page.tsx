"use client";

import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion, AnimatePresence } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { CreateProjectForm } from "./admin/CreateProjectForm";
import { User } from "../components/UserList";
import { ContactForm } from "../components/ContactForm";
import { AboutSection } from "../components/AboutSection";
import Hero from "../components/Hero";
import { SkillsSection } from "../components/SkillsSection";
import BackToTopButton from "../components/BackToTopButton";
import LoadingSpinner from "../components/LoadingSpinner";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const AnimatedSection = ({ children, id }: { children: React.ReactNode; id: string }) => (
  <motion.section
    id={id}
    className="py-16 px-4"
    variants={itemVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
  >
    {children}
  </motion.section>
);

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`);
      if (!res.ok) {
        throw new Error("Failed to fetch projects.");
      }
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProject = async (newProject: any) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newProject),
      });

      if (!res.ok) {
        throw new Error("Failed to add project.");
      }

      fetchProjects();
    } catch (error) {
      console.error("Error adding project:", error);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete project.");
      }

      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
    const token = localStorage.getItem("token");
    if (token) {
      const decoded: any = JSON.parse(atob(token.split(".")[1]));
      console.log("Decoded token payload:", decoded);
      setUser({ ...decoded, isAdmin: true });
    }
  }, []);

  return (
    <main className="bg-black dark:bg-gray-900 text-white dark:text-gray-200">
      <motion.div
        className="space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <section id="home">
          <Hero />
        </section>

        {/* About Section */}
        <AnimatedSection id="about">
          <AboutSection />
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection id="projects">
          <h2 className="text-4xl font-bold text-center uppercase mb-8">Projects</h2>
          <div className="max-w-5xl mx-auto">
            {/* Show loading spinner while fetching projects */}
            <AnimatePresence>
              {isLoading && <LoadingSpinner />}
            </AnimatePresence>

            {/* Show projects when loading is complete */}
            {!isLoading && (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
              >
                {projects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    variants={itemVariants}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <ProjectCard
                      id={project.id}
                      title={project.title}
                      description={project.description}
                      demoLink={project.demoLink}
                      githubLink={project.githubLink}
                    />
                    {user?.isAdmin && (
                      <button
                        className="mt-2 text-red-500 hover:text-red-600 transition"
                        onClick={() => handleDelete(project.id)}
                      >
                        🗑️ Delete
                      </button>
                    )}
                  </motion.div>
                ))}
                {user?.isAdmin && (
                  <motion.div
                    variants={itemVariants}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: projects.length * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <CreateProjectForm onAdd={handleAddProject} />
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </AnimatedSection>

        {/* Skills Section */}
        <AnimatedSection id="skills">
          <SkillsSection />
        </AnimatedSection>

        {/* Experience Section */}
        <AnimatedSection id="experience">
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

            <h2 className="text-4xl font-bold text-center uppercase mb-12 text-accent">
              Experience
            </h2>
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="relative pl-8">
                {/* Vertical line for the timeline */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-teal-500" />

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                  className="relative mb-8 group"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="absolute left-2 top-1 w-4 h-4 bg-teal-500 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                    viewport={{ once: true }}
                  />
                  <div className="pl-8">
                    <h3 className="text-2xl font-semibold text-white flex items-center">
                      <span className="mr-2">💻</span> Full-Stack Developer Intern, Partihandel.se
                    </h3>
                    <p className="text-gray-400">2024 - 2025</p>
                    <p className="text-lg text-gray-300 mt-2">
                      Developed and maintained frontend components using <strong>React</strong>, and worked on backend solutions with <strong>Node.js</strong> and <strong>Express.js</strong>. Implemented <strong>JWT authentication</strong> and <strong>CORS management</strong> for secure API communication, built and tested features for login, dashboard, and user flows, and used <strong>Git</strong> and <strong>Docker</strong> for version control and containerization. Improved application performance by 25% through modular development practices using <strong>Concurrently</strong> and <strong>Cross-env</strong>, and collaborated with the team to deliver scalable solutions.
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative mb-8 group"
                  whileHover={{ scale: 1.02 }}
                >
                  <motion.div
                    className="absolute left-2 top-1 w-4 h-4 bg-teal-500 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut",
                    }}
                    viewport={{ once: true }}
                  />
                  <div className="pl-8">
                    <h3 className="text-2xl font-semibold text-white flex items-center">
                      <span className="mr-2">🏦</span> Bank Clerk, Sparbanken Skåne
                    </h3>
                    <p className="text-gray-400">2013 - 2024</p>
                    <p className="text-lg text-gray-300 mt-2">
                      Managed an average of 50-100 customer cases per day, focusing on service, problem-solving, and high customer satisfaction. Built strong customer relationships through active listening and tailored communication, achieving consistently high satisfaction ratings. Handled customer onboarding during the transition from Färs & Frosta Sparbank to Sparbanken Skåne (2014-2015), and became a go-to contact for complex inquiries by translating financial terminology into clear, understandable information. Worked in the Customer Center (Feb-Jun 2021) and at various branches, enhancing my ability to understand underlying customer needs.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection id="contact">
          <h2 className="text-4xl font-bold text-center uppercase mb-8">Contact Me</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-8">
            Have a project in mind or just want to say hi? Send me a message!
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-md mx-auto"
          >
            <ContactForm />
          </motion.div>
        </AnimatedSection>
      </motion.div>
      <BackToTopButton />
    </main>
  );
}