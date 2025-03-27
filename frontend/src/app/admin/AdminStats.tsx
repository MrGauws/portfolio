"use client";

import { useEffect, useState } from "react";

interface User {
  _id: string;
  isAdmin: boolean;
}

interface Stats {
  totalUsers: number;
  adminUsers: number;
}

export const AdminStats = () => {
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, adminUsers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("Ingen token hittad");

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stats`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Kunde inte hämta statistik");

        const data = await res.json();
        setStats(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <p>Laddar statistik...</p>;
  }

  return (
    <div className="stats-container rounded p-4 bg-black text-white mb-6">
      <h2 className="text-xl font-semibold mb-4">Statistik</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 bg-gray-800 rounded">
          <p className="text-lg font-medium">Totalt antal användare:</p>
          <p className="text-2xl">{stats.totalUsers}</p>
        </div>
        <div className="p-4 bg-gray-800 rounded">
          <p className="text-lg font-medium">Admin-användare:</p>
          <p className="text-2xl">{stats.adminUsers}</p>
        </div>
      </div>
    </div>
  );
};