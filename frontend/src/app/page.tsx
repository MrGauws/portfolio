"use client";

import { UserList } from "@/components/UserList";
import { motion } from "framer-motion";
import { CreateProjectForm } from "./admin/CreateProjectForm";
import { useEffect, useState } from "react";
import { User } from "@/components/UserList";
import { ContactForm } from "@/components/ContactForm";

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
        {/* Header */}
        <AnimatedSection>
          <header className="text-center mb-12">
            <h1 className="text-4xl font-extrabold hover:text-blue-500 transition duration-300 ease-in-out">
              Herman Engström
            </h1>
            <p className="text-lg text-gray-500 mt-2 tracking-wide">
              Fullstack Developer
            </p>
          </header>
        </AnimatedSection>

        {/* Introduction Section */}
        <AnimatedSection>
          <p className="text-lg leading-relaxed">
            Hej! Jag är en passionerad utvecklare som älskar att bygga moderna
            webbapplikationer med React, Next.js, och Node.js.
          </p>
        </AnimatedSection>

        {/* Projects Section */}
        <AnimatedSection>
          <h2 className="text-2xl font-semibold mb-6">Projekt</h2>
          <motion.ul className="grid grid-cols-1 md:grid-cols-2 gap-6" variants={containerVariants}>
            {projects.map((project) => (
              <motion.li
                key={project.id}
                className="border p-4 rounded shadow-md hover:shadow-lg hover:-translate-y-1 transition-transform"
                variants={itemVariants}
              >
                <h3 className="text-lg font-bold hover:text-blue-500 transition duration-300 ease-in-out">
                  {project.title}
                </h3>
                <p className="text-gray-600 mt-2">{project.description}</p>
                <div className="mt-4 space-x-4">
                  <a
                    href={project.demoLink}
                    className="text-blue-500 hover:underline hover:text-blue-600"
                  >
                    Demo
                  </a>
                  <a
                    href={project.githubLink}
                    className="text-blue-500 hover:underline hover:text-blue-600"
                  >
                    GitHub
                  </a>
                  {user?.isAdmin && (
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(project.id)}
                    >
                      🗑️ Ta bort
                    </button>
                  )}
                </div>
              </motion.li>
            ))}
          </motion.ul>


          {/* Lägg till nytt projekt, endast för admins */}
          {user?.isAdmin && (
            <section className="mt-6">
              <h3 className="text-xl font-semibold mb-4">Lägg till nytt projekt</h3>
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
          <h2 className="text-2xl font-semibold mb-4">Kontakt</h2>
            <ContactForm />
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
