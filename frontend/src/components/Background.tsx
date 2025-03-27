"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function Background() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!backgroundRef.current) return;

    // Parallax-effekt med GSAP
    gsap.to(backgroundRef.current, {
      y: "50%", // Öka rörelsen för en mer uttalad parallax-effekt
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom top",
        scrub: true, 
      },
    });
  }, []);

  return (
    <>
      {/* Bakgrundsbild med next/image, fäst i bakgrunden */}
      <div ref={backgroundRef} className="fixed inset-0 z-[-2]">
        <Image
          src="/background.jpg"
          alt="Background"
          fill
          className="object-cover object-bottom"
          priority
        />
        {/* Overlay för att säkerställa läsbarhet */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Partiklar för extra effekt */}
      <div className="fixed inset-0 pointer-events-none z-[-1]">
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
    </>
  );
}