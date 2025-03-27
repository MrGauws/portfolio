"use client";

import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden"
    >
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
        className="text-sm md:text-base font-medium tracking-widest uppercase mt-4"
      >
        I'm a...
      </motion.h2>
      <div className="mt-6">
        <TypeAnimation
          sequence={[
            "</>Developer",
            1000,
            "</>Developer\n\n</>Software Engineer    </>Fullstack Developer",
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