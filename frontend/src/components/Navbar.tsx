"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home"); // State för aktiv sektion
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null);

  // Kontrollera inloggning
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    checkToken();
    window.addEventListener("storage", checkToken);
    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  // Hantera klick utanför dropdown för att stänga den
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Hantera scroll för att markera aktiv sektion
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 100; // Justera för navbar-höjd

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="bg-black text-white p-4 flex justify-center items-center gap-8 sticky top-0 z-50">
      {/* Main navigation links */}
      <nav className="flex gap-6 items-center">
        <span className="text-gray-400"> // </span>
        <Link
          href="#home"
          className={`hover:underline ${
            activeSection === "home" ? "underline text-teal-500" : ""
          }`}
          scroll={true}
        >
          home
        </Link>
        <span className="text-gray-400"> // </span>
        <Link
          href="#about"
          className={`hover:underline ${
            activeSection === "about" ? "underline text-teal-500" : ""
          }`}
          scroll={true}
        >
          about
        </Link>
        <span className="text-gray-400"> // </span>
        <Link
          href="#projects"
          className={`hover:underline ${
            activeSection === "projects" ? "underline text-teal-500" : ""
          }`}
          scroll={true}
        >
          projects
        </Link>
        <span className="text-gray-400"> // </span>
        <Link
          href="#experience"
          className={`hover:underline ${
            activeSection === "experience" ? "underline text-teal-500" : ""
          }`}
          scroll={true}
        >
          experience
        </Link>
        <span className="text-gray-400"> // </span>
        <Link
          href="#contact"
          className={`hover:underline ${
            activeSection === "contact" ? "underline text-teal-500" : ""
          }`}
          scroll={true}
        >
          contact
        </Link>
      </nav>

      {/* Right side: Login/Logout and Theme Toggle */}
      <div className="flex gap-4 items-center">
        {!isLoggedIn ? (
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        ) : (
          <div className="relative" ref={menuRef}>
            {/* Hamburger Icon */}
            <button
              className="text-2xl focus:outline-none"
              onClick={toggleMenu}
              aria-expanded={isMenuOpen}
              aria-label="User menu"
            >
              ☰
            </button>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 text-white rounded-md shadow-lg z-10">
                <Link
                  href="/dashboard"
                  className="block px-4 py-2 hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin"
                  className="block px-4 py-2 hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        {/* Theme Toggle Button (Icons Only) */}
        <button
          onClick={toggleTheme}
          className="text-lg p-1 rounded shadow hover:scale-105 transition"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
};