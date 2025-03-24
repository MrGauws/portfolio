// frontend/src/components/Hero.tsx
"use client";

import { useEffect, useRef } from "react";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { gsap } from "gsap";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!backgroundRef.current) return;

    // Parallax-effekt med GSAP
    gsap.to(backgroundRef.current, {
      y: "20%", 
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true, 
      },
    });
  }, []);

  return (
    <section
  ref={heroRef}
  className="relative w-full min-h-screen flex flex-col items-center justify-center text-center bg-black dark:bg-gray-900 overflow-hidden"
>
  {/* Bakgrund med parallax-effekt */}
        <div
            ref={backgroundRef}
            className="absolute inset-0 bg-gradient-to-b from-black to-gray-900 dark:from-gray-900 dark:to-gray-800 opacity-50"
            style={{
            backgroundImage: "radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)",
            zIndex: -1,
            }}
        />

      {/* Partiklar för extra effekt */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-20"
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

      {/* Textinnehåll */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-6xl md:text-8xl font-bold tracking-wide uppercase"
      >
        Herman Engström
      </motion.h1>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-2xl md:text-3xl font-medium tracking-widest uppercase mt-4"
      >
        I'm a...
      </motion.h2>
      <div className="mt-6">
        <TypeAnimation
          sequence={[
            "Developer",
            1000,
            "Developer\nSoftware Engineer    Fullstack Developer",
            11000,
            "",
          ]}
          wrapper="div"
          speed={50}
          repeat={Infinity}
          className="text-2xl md:text-3xl font-medium tracking-widest uppercase whitespace-pre"
        />
      </div>
    </section>
  );
}