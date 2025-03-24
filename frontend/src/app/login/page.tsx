"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      localStorage.setItem("token", data.token);
      setToken(data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm">
        <input type="email" placeholder="E-post" value={email} onChange={(e) => setEmail(e.target.value)} className="p-2 border rounded" required />
        <input type="password" placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)} className="p-2 border rounded" required />
        <button type="submit" className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800">Login</button>
        {error && <p className="text-red-500">{error}</p>}
        {token && <p className="text-green-600 break-all">Login succeeded! Token: <br /> {token}</p>}
      </form>
    </main>
  );
}