"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

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
      <nav className="flex gap-4">
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
      </nav>
    </header>
  );
};