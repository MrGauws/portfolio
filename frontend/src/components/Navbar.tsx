"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import ReactGA from "react-ga4";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaDownload } from "react-icons/fa";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // För hamburgermenyn på mobilen
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // För inloggade användare
  const [activeSection, setActiveSection] = useState("home");
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Hantera klick utanför menyerna
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isMenuOpen || isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, isUserMenuOpen]);

  // Hantera scroll för att markera aktiv sektion
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "experience", "contact"];
      const scrollPosition = window.scrollY + 100;

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
    logout();
    router.push("/login");
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
    setIsUserMenuOpen(false); // Stäng användarmenyn om hamburgermenyn öppnas
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };

  const handleDownloadCV = () => {
    ReactGA.event({
      category: "User",
      action: "Download CV",
      label: "Navbar Download CV Button",
    });
  };

  const handleNavClick = (section: string) => {
    router.push("/");
    setTimeout(() => {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <header className="bg-black text-white p-2 sm:p-4 flex justify-center items-center gap-2 sm:gap-4 sticky top-0 z-50">
      {/* Navigeringslänkar (alltid synliga, men mindre på mobilen) */}
      <nav className="flex gap-1 sm:gap-6 items-center text-[10px] sm:text-base">
        <span className="text-gray-400"> // </span>
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("home");
          }}
          className={`hover:underline ${
            activeSection === "home" ? "underline text-teal-500" : ""
          }`}
        >
          home
        </Link>
        <span className="text-gray-400"> // </span>
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("about");
          }}
          className={`hover:underline ${
            activeSection === "about" ? "underline text-teal-500" : ""
          }`}
        >
          about
        </Link>
        <span className="text-gray-400"> // </span>
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("projects");
          }}
          className={`hover:underline ${
            activeSection === "projects" ? "underline text-teal-500" : ""
          }`}
        >
          projects
        </Link>
        <span className="text-gray-400"> // </span>
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("experience");
          }}
          className={`hover:underline ${
            activeSection === "experience" ? "underline text-teal-500" : ""
          }`}
        >
          experience
        </Link>
        <span className="text-gray-400"> // </span>
        <Link
          href="/"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick("contact");
          }}
          className={`hover:underline ${
            activeSection === "contact" ? "underline text-teal-500" : ""
          }`}
        >
          contact
        </Link>
      </nav>

      {/* Hamburgermeny för "Download CV", inloggning och light/darkmode på mobilen */}
      <div className="relative sm:hidden" ref={menuRef}>
        <button
          className="text-base focus:outline-none"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Menu"
        >
          ☰
        </button>

        {isMenuOpen && (
          <div className="absolute right-0 top-full mt-1 w-40 bg-gray-800 text-white rounded-md shadow-lg z-10">
            <motion.a
              href="/cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleDownloadCV}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="block px-2 py-1 hover:bg-gray-700 text-sm flex items-center gap-1"
            >
              <FaDownload className="text-sm" />
              <span>Download CV</span>
            </motion.a>
            {!user ? (
              <Link
                href="/login"
                className="block px-2 py-1 hover:bg-gray-700 text-sm flex items-center gap-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <FaUser className="text-sm" />
                <span>Login</span>
              </Link>
            ) : (
              <div className="relative">
                <button
                  className="block w-full text-left px-2 py-1 hover:bg-gray-700 text-sm flex items-center gap-1"
                  onClick={toggleUserMenu}
                  aria-expanded={isUserMenuOpen}
                  aria-label="User menu"
                >
                  <FaUser className="text-sm" />
                  <span>User</span>
                </button>
                {isUserMenuOpen && (
                  <div className="absolute left-0 top-full mt-1 w-40 bg-gray-800 text-white rounded-md shadow-lg z-10">
                    <Link
                      href="/dashboard"
                      className="block px-2 py-1 hover:bg-gray-700 text-sm"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/admin"
                      className="block px-2 py-1 hover:bg-gray-700 text-sm"
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsMenuOpen(false);
                      }}
                    >
                      Admin
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-2 py-1 hover:bg-gray-700 text-sm"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
            <button
              onClick={() => {
                toggleTheme();
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-2 py-1 hover:bg-gray-700 text-sm flex items-center gap-1"
            >
              {theme === "light" ? "🌙" : "☀️"}
              <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
            </button>
          </div>
        )}
      </div>

      {/* "Download CV", inloggning och light/darkmode (synliga på större skärmar) */}
      <div className="hidden sm:flex gap-2 sm:gap-4 items-center">
        <motion.a
          href="/cv.pdf"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleDownloadCV}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block px-2 sm:px-3 py-1 rounded-full bg-teal-500 text-black font-semibold hover:bg-teal-600 transition flex items-center gap-1 text-xs sm:text-sm"
        >
          <FaDownload className="text-xs sm:text-sm" />
          <span>CV</span>
        </motion.a>

        {!user ? (
          <Link href="/login" className="hover:text-teal-400 transition">
            <FaUser className="text-base sm:text-lg" />
          </Link>
        ) : (
          <div className="relative" ref={userMenuRef}>
            <button
              className="text-base sm:text-2xl focus:outline-none"
              onClick={toggleUserMenu}
              aria-expanded={isUserMenuOpen}
              aria-label="User menu"
            >
              ☰
            </button>

            {isUserMenuOpen && (
              <div className="absolute right-0 top-full mt-1 sm:mt-2 w-40 sm:w-48 bg-gray-800 text-white rounded-md shadow-lg z-10">
                <Link
                  href="/dashboard"
                  className="block px-2 sm:px-4 py-1 sm:py-2 hover:bg-gray-700 text-sm sm:text-base"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin"
                  className="block px-2 sm:px-4 py-1 sm:py-2 hover:bg-gray-700 text-sm sm:text-base"
                  onClick={() => setIsUserMenuOpen(false)}
                >
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-2 sm:px-4 py-1 sm:py-2 hover:bg-gray-700 text-sm sm:text-base"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        )}

        <button
          onClick={toggleTheme}
          className="text-sm sm:text-lg p-1 rounded shadow hover:scale-105 transition"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
};