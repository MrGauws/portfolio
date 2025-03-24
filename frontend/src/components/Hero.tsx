"use client";

import { TypeAnimation } from "react-type-animation";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center text-center bg-black text-white">
      <h1 className="text-6xl md:text-8xl font-bold tracking-wide uppercase">
        Herman Engström
      </h1>
      <h2 className="text-2xl md:text-xl font-medium tracking-widest uppercase mt-4">
        I'm a...
      </h2>

      {/* Typewriter-effekt för Developer, Software Engineer och Fullstack Developer */}
      <div className="mt-6">
        <TypeAnimation
          sequence={[
            "Developer",
            1000, 
            "Developer\n\nSoftware Engineer    Fullstack Developer", 
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