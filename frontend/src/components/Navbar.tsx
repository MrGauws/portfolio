"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for dropdown menu
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();
  const menuRef = useRef<HTMLDivElement>(null); // Explicitly type the ref as HTMLDivElement

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

  // Handle clicks outside the dropdown to close it
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
    setIsMenuOpen(false); // Close the menu on logout
  };

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle the menu on click
  };

  return (
    <header className="bg-black text-white p-4 flex justify-center items-center gap-8">
      {/* Main navigation links */}
      <nav className="flex gap-6 items-center">
        <span className="text-gray-400"> // </span>
        <Link href="/" className="hover:underline">
          home
        </Link>
        <span className="text-gray-400"> // </span>
        <Link href="/#about" className="hover:underline">
          about
        </Link>
        <span className="text-gray-400"> // </span>
        <Link href="/#projects" className="hover:underline">
          projects
        </Link>
        <span className="text-gray-400"> // </span>
        <Link href="/experience" className="hover:underline">
          experience
        </Link>
        <span className="text-gray-400"> // </span>
        <Link href="/contact" className="hover:underline">
          contact
        </Link>
      </nav>

      {/* Right side: Login/Logout and Theme Toggle */}
      <div className="flex gap-4 items-center">
        {!isLoggedIn ? (
          <Link href="/login" className="hover:underline">
            Logga in
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
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  Dashboard
                </Link>
                <Link
                  href="/admin"
                  className="block px-4 py-2 hover:bg-gray-700"
                  onClick={() => setIsMenuOpen(false)} // Close menu on click
                >
                  Admin
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                >
                  Logga ut
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