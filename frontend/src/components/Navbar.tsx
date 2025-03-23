"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    router.push("/login");
  };

  return (
    <header className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="text-lg font-bold">
        <Link href="/">🌐 Portfolio</Link>
      </h1>
      <nav className="flex gap-4 items-center">
        <Link href="/">Hem</Link>
        {!isLoggedIn ? (
          <Link href="/login">Logga in</Link>
        ) : (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/admin">Admin</Link>
            <button onClick={handleLogout} className="hover:underline">
              Logga ut
            </button>
          </>
        )}

        {/* 🌗 Light/Dark Toggle-knapp */}
        <button
          onClick={toggleTheme}
          className="text-sm bg-gray-200 dark:bg-gray-800 text-black dark:text-white px-3 py-1 rounded shadow hover:scale-105 transition"
        >
          {theme === "light" ? "🌙 Mörkt läge" : "☀️ Ljust läge"}
        </button>
      </nav>
    </header>
  );
};