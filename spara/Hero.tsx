"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center text-center px-6 bg-gradient-to-b from-zinc-900 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-zinc-800/30 border border-zinc-700 backdrop-blur-lg rounded-2xl p-10 w-full max-w-3xl shadow-xl"
      >
        {/* Avatar/ikon */}
        <div className="flex justify-center mb-6">
          <div className="w-28 h-28 rounded-full bg-zinc-700 flex items-center justify-center text-4xl font-bold text-accent">
            HE
          </div>
        </div>

        {/* Titel och roll */}
        <h1 className="text-3xl md:text-5xl font-bold mb-2 tracking-tight">
          Software Engineer
        </h1>
        <h2 className="text-xl md:text-2xl font-mono text-accent mb-6">
          Fullstack / Frontend Developer
        </h2>

        {/* Beskrivning */}
        <p className="text-sm md:text-base font-mono text-gray-300 max-w-xl mx-auto leading-relaxed mb-8">
          Crafting modern, clean & responsive code with a passion for
          performance, design and user experience. Always learning, always
          building.
        </p>

        {/* Knappar */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="#projects">
            <button className="px-5 py-2 rounded bg-accent text-black font-semibold hover:bg-teal-500 transition">
              🚀 Mina Projekt
            </button>
          </Link>
          <Link href="#contact">
            <button className="px-5 py-2 rounded border border-accent text-accent hover:bg-accent hover:text-black transition">
              📬 Kontakta mig
            </button>
          </Link>
          <Link href="/cv.pdf" target="_blank">
            <button className="px-5 py-2 rounded bg-zinc-700 text-white hover:bg-zinc-600 transition">
              📄 Ladda ner CV
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}