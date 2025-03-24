// frontend/src/app/page.tsx
"use client";

import { useState, useEffect } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { CreateProjectForm } from "./admin/CreateProjectForm";
import { User } from "../components/UserList";
import { ContactForm } from "../components/ContactForm";
import { AboutSection } from "../components/AboutSection";
import Hero from "../components/Hero";
import { SkillsSection } from "../components/SkillsSection";
import BackToTopButton from "../components/BackToTopButton";

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

  const fetchProjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/projects");
      if (!res.ok) {
        throw new Error("Kunde inte hämta projekt.");
      }
      const data = await res.json();
      setProjects(data);
    } catch (error) {
      console.error("Fel vid hämtning av projekt:", error);
    }
  };

  const handleAddProject = async (newProject: any) => {
    try {
      const res = await fetch("http://localhost:5000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newProject),
      });

      if (!res.ok) {
        throw new Error("Kunde inte lägga till projektet.");
      }

      fetchProjects();
    } catch (error) {
      console.error("Fel vid tillägg av projekt:", error);
    }
  };

  const handleDelete = async (projectId: string) => {
    if (!confirm("Är du säker på att du vill ta bort detta projekt?")) return;

    try {
      const res = await fetch(`http://localhost:5000/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!res.ok) {
        throw new Error("Kunde inte ta bort projektet.");
      }

      fetchProjects();
    } catch (error) {
      console.error("Fel vid borttagning av projekt:", error);
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
        {/* Hero-sektion */}
        <section id="home">
          <Hero />
        </section>

        {/* Om mig-sektion */}
        <AnimatedSection id="about">
          <AboutSection />
        </AnimatedSection>

        {/* Projekt-sektion */}
        <AnimatedSection id="projects">
          <h2 className="text-4xl font-bold text-center uppercase mb-8">Projects</h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
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
                    🗑️ Ta bort
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
        </AnimatedSection>

        {/* Kunskaper-sektion */}
        <AnimatedSection id="skills">
          <SkillsSection />
        </AnimatedSection>

        {/* Experience Section */}
        <AnimatedSection id="experience">
          <h2 className="text-4xl font-bold text-center uppercase mb-8">Experience</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-2xl font-semibold">Full-Stack Developer, Company X</h3>
              <p className="text-gray-400">Jan 2022 - Present</p>
              <p className="text-lg text-gray-300 mt-2">
                Worked on developing and maintaining web applications using React, Node.js, and MongoDB. Implemented new features, optimized performance, and collaborated with the team to deliver high-quality solutions.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h3 className="text-2xl font-semibold">Frontend Developer, Company Y</h3>
              <p className="text-gray-400">Jun 2020 - Dec 2021</p>
              <p className="text-lg text-gray-300 mt-2">
                Focused on creating responsive and user-friendly interfaces with React and Tailwind CSS. Collaborated with designers to transform mockups into functional code.
              </p>
            </motion.div>
          </div>
        </AnimatedSection>

        {/* Kontakt-sektion */}
        <AnimatedSection id="contact">
          <h2 className="text-4xl font-bold text-center uppercase mb-8">Contact me</h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto text-center mb-8">
            Do you have a project in mind or would you like to hire me? Send me a message!
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