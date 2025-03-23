// frontend/src/app/admin/AdminStats.tsx

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

        const res = await fetch("http://localhost:5000/stats", {
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
    <div className="stats-container border rounded p-4 bg-gray-100">
      <h2 className="text-xl font-semibold mb-4">Statistik</h2>
      <p>
        <strong>Totalt antal användare:</strong> {stats.totalUsers}
      </p>
      <p>
        <strong>Admin-användare:</strong> {stats.adminUsers}
      </p>
    </div>
  );
};
