"use client";

import { UserList } from "@/components/UserList";
import { motion } from "framer-motion";
import { CreateProjectForm } from "./admin/CreateProjectForm";
import { useEffect, useState } from "react";
import { User } from "@/components/UserList";
import { ContactForm } from "@/components/ContactForm";
import { AboutSection } from "@/components/AboutSection";
import Hero from "@/components/Hero";


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

const AnimatedSection = ({ children }: { children: React.ReactNode }) => (
  <motion.section className="mb-12" variants={itemVariants}>
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
  
      // Uppdatera projektlistan efter att ett nytt projekt lagts till
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
  
      // Uppdatera projektlistan efter borttagning
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
      // Exempel: Sätt användarens isAdmin till true för testning
      setUser({ ...decoded, isAdmin: true });
    }
  }, []);

  return (
    <main className="p-8">
      <motion.div
        className="space-y-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <Hero />
      {/*<AnimatedSection>
        <section className="flex flex-col items-center justify-center text-center py-20 px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-accent"
          >
            Herman Engström
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-4 text-xl md:text-3xl"
          >
            Fullstack Developer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-6 text-lg text-gray-300 max-w-2xl"
          >
            Hej! Jag är en passionerad utvecklare som älskar att bygga moderna
            webbapplikationer med React, Next.js och Node.js. 🚀
          </motion.p>
        </section>
      </AnimatedSection>
      */}

        {/* About Section */}
        <AnimatedSection>
          <AboutSection />
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection>
          <section id="projects">
            <h2 className="text-3xl font-semibold mb-8 text-white text-center">🚀 Projekt</h2>
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {projects.map((project) => (
                <motion.div
                  key={project.id}
                  className="bg-zinc-800/30 backdrop-blur-md border border-zinc-700 rounded-2xl p-6 shadow-lg hover:shadow-accent hover:scale-[1.02] transition duration-300"
                  variants={itemVariants}
                >
                  <h3 className="text-xl font-semibold text-accent mb-2">{project.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap justify-between gap-2 text-sm">
                    <a
                      href={project.demoLink}
                      target="_blank"
                      className="text-accent hover:underline"
                    >
                      🌐 Demo
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      className="text-gray-400 hover:underline"
                    >
                      🖥️ GitHub
                    </a>
                    {user?.isAdmin && (
                      <button
                        className="ml-auto text-red-500 hover:text-red-600 transition"
                        onClick={() => handleDelete(project.id)}
                      >
                        🗑️ Ta bort
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Adminformulär */}
          {user?.isAdmin && (
            <section className="mt-10">
              <h3 className="text-2xl font-semibold mb-4 text-accent">
                ✨ Lägg till nytt projekt
              </h3>
              <CreateProjectForm onAdd={handleAddProject} />
            </section>
          )}
        </AnimatedSection>


        {/* Skills Section */}
        <AnimatedSection>
          <h2 className="text-2xl font-semibold mb-4">Kunskaper</h2>
          <motion.ul className="list-disc pl-6" variants={containerVariants}>
            {["React", "Next.js", "Node.js", "MongoDB", "TailwindCSS"].map(
              (skill) => (
                <motion.li
                  key={skill}
                  className="hover:text-blue-500 transition duration-300 ease-in-out"
                  variants={itemVariants}
                >
                  {skill}
                </motion.li>
              )
            )}
          </motion.ul>
        </AnimatedSection>

        {/* Contact Section */}
        <AnimatedSection>
        <section id="contact">
          <h2 className="text-2xl font-semibold mb-4">Kontakt</h2>
            <ContactForm />
            </section>
        </AnimatedSection>

        {/* UserList Section */}
        <AnimatedSection>
          <h2 className="text-2xl font-semibold mb-4">Användare</h2>
          <UserList />
        </AnimatedSection>
      </motion.div>
    </main>
  );
}
