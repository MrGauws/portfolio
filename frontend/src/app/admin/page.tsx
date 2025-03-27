"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminStats } from "./AdminStats";
import { MessagesList } from "./MessagesList";
import AdminUsers from "../../components/AdminUsers";

export default function AdminPage() {
  const [user, setUser] = useState<{ _id: string; name: string; email: string; isAdmin?: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [inboxOpen, setInboxOpen] = useState(false);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchUsers = async (token: string) => {
    const res = await fetch(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) throw new Error("Unauthorized");
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    fetchUsers(token)
      .then((data) => {
        const decoded: any = JSON.parse(atob(token.split(".")[1]));
        const currentUser = data.find((u: { _id: string }) => u._id === decoded.id);

        if (!currentUser?.isAdmin) {
          router.push("/profile");
        } else {
          setUser(currentUser);
        }
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router]);

  if (loading) return <p>Laddar adminpanel...</p>;
  if (!user) return <p>⛔ Inte tillåtet. Endast admin kan se detta.</p>;

  return (
    <main className="p-8">
      {inboxOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded shadow-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Inkorg</h2>
              <button onClick={() => setInboxOpen(false)} className="text-red-500">
                Stäng
              </button>
            </div>
            <MessagesList />
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6">Adminpanel 👑</h1>
      <button
        onClick={() => setInboxOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Inkorg
      </button>
      <AdminStats />
      <p className="mb-4">Välkommen, {user.name}. Här är alla användare:</p>
      <AdminUsers currentUserId={user._id} />
    </main>
  );
}