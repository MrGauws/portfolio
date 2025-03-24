// frontend/src/components/AboutSection.tsx
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const timelineVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 },
};

const markerVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "easeInOut",
    },
  },
};

export const AboutSection = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!lineRef.current || !timelineRef.current) return;

    // Animate the line to "draw itself" on scroll
    gsap.fromTo(
      lineRef.current,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          end: "bottom 20%",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <section className="relative flex justify-center items-center px-4">
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

      {/* Text container */}
      <motion.div
        className="bg-zinc-800/30 dark:bg-zinc-700/30 backdrop-blur-md border border-zinc-700 dark:border-zinc-600 text-white dark:text-gray-200 rounded-2xl shadow-lg p-10 max-w-4xl w-full space-y-6 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-center text-accent"
        >
          👨‍💻 About Me
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="text-md font-mono leading-relaxed text-gray-300"
        >
          My name is <strong className="text-white">Herman Engström</strong> and I am a recent
          graduate in web development from Grit Academy, with a strong passion for creating smart,
          modern systems – always with the user in focus. With over 10 years of experience in the
          banking industry, I have developed a deep understanding of customer needs, communication,
          and problem-solving.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-md font-mono leading-relaxed text-gray-300"
        >
          During my education, I have worked with the full stack: from user-friendly interfaces in
          <strong> React</strong> and <strong>Next.js</strong> to scalable backend solutions with
          <strong> Node.js</strong> and <strong>MongoDB</strong>. I have also built projects with
          authentication, API management, containerization using Docker, and cloud deployment.
        </motion.p>

        <motion.p
          variants={itemVariants}
          className="text-md font-mono leading-relaxed text-gray-300"
        >
          I combine technical expertise with strong interpersonal skills – I’m the developer who
          gladly rolls up their sleeves, whether it’s about coding, UX, or collaboration.
        </motion.p>

        {/* Timeline animation */}
        <motion.div
          ref={timelineRef}
          variants={containerVariants}
          className="space-y-8 mt-8"
        >
          <h3 className="text-xl font-semibold text-center text-accent">My Journey</h3>
          <div className="relative pl-8">
            {/* Vertical line for the timeline */}
            <div
              ref={lineRef}
              className="absolute left-4 top-0 bottom-0 w-0.5 bg-teal-500"
            />

            <motion.div
              variants={timelineVariants}
              className="relative mb-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute left-2 top-1 w-4 h-4 bg-teal-500 rounded-full"
                variants={markerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
              <div className="pl-8">
                <h4 className="text-lg font-semibold text-white">10 Years in Banking</h4>
                <p className="text-gray-400">2012 - 2022</p>
                <p className="text-md text-gray-300">
                  Developed a deep understanding of customer needs, communication, and problem-solving.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={timelineVariants}
              className="relative mb-8"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute left-2 top-1 w-4 h-4 bg-teal-500 rounded-full"
                variants={markerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
              <div className="pl-8">
                <h4 className="text-lg font-semibold text-white">Education at Grit Academy</h4>
                <p className="text-gray-400">2022 - 2024</p>
                <p className="text-md text-gray-300">
                  Graduated as a web developer with a focus on full-stack development.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={timelineVariants}
              className="relative"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="absolute left-2 top-1 w-4 h-4 bg-teal-500 rounded-full"
                variants={markerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              />
              <div className="pl-8">
                <h4 className="text-lg font-semibold text-white">Built Projects with React and Node.js</h4>
                <p className="text-gray-400">2023 - Present</p>
                <p className="text-md text-gray-300">
                  Worked on authentication, API management, Docker, and cloud deployment.
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.ul
          variants={containerVariants}
          className="list-disc pl-5 text-gray-300 font-mono text-sm space-y-1"
        >
          <motion.li variants={itemVariants}>
            🔧 Programming: JavaScript, TypeScript, PHP, C#, Python
          </motion.li>
          <motion.li variants={itemVariants}>
            🔧 Frameworks and Libraries: React, Next.js, Express.js, Node.js, Tailwind CSS, Framer Motion, React Type Animation, GSAP, Three.js
          </motion.li>
          <motion.li variants={itemVariants}>
            🛠️ DevOps & Tools: Git, GitHub Pages, Docker, Linux, AWS, PowerShell
          </motion.li>
          <motion.li variants={itemVariants}>
            🗃️ Databases: MongoDB, SQL
          </motion.li>
          <motion.li variants={itemVariants}>
            🧩 CMS & E-commerce: WordPress, Shopify
          </motion.li>
          <motion.li variants={itemVariants}>
            🌍 Languages: Swedish, English, Several Nordic/European basics
          </motion.li>
        </motion.ul>

        <motion.div
          variants={itemVariants}
          className="text-center pt-4"
        >
          <motion.a
            href="/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-6 py-2 rounded bg-accent text-black font-semibold hover:bg-teal-500 transition"
          >
            📄 Download My CV
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
};