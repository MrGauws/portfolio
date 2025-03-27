"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}

interface AdminUsersProps {
  currentUserId: string;
}

export default function AdminUsers({ currentUserId }: AdminUsersProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
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

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    if (!confirm("Är du säker på att du vill ta bort denna användare?")) return;

    try {
      const res = await fetch(`${API_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Kunde inte ta bort användare");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
      setError("Fel vid borttagning");
    }
  };

  const handleMakeAdmin = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/users/${id}/make-admin`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Fel vid adminuppgradering");

      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isAdmin: true } : u))
      );
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: newName,
          email: newEmail,
          password: newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Fel vid skapande");
      setUsers((prev) => [...prev, data.user]);
      setNewName("");
      setNewEmail("");
      setNewPassword("");
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetchUsers(token)
      .then((data) => {
        setUsers(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch users");
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleCreateUser} className="mb-6 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Namn"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border p-2 rounded bg-white text-black !important"
          required
        />
        <input
          type="email"
          placeholder="E-post"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="border p-2 rounded bg-white text-black !important"
          required
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 rounded bg-white text-black !important"
          required
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Skapa användare
        </button>
      </form>

      <ul className="space-y-4">
        {users.map((u) => (
          <li key={u._id} className="border p-4 rounded">
            <p><strong>Namn:</strong> {u.name}</p>
            <p><strong>E-post:</strong> {u.email}</p>
            <p><strong>Admin:</strong> {u.isAdmin ? "Ja" : "Nej"}</p>
            {u._id !== currentUserId && (
              <div className="space-x-2">
                {!u.isAdmin && (
                  <button
                    onClick={() => handleMakeAdmin(u._id)}
                    className="text-blue-600 hover:underline"
                  >
                    🔐 Gör till admin
                  </button>
                )}
                <button
                  onClick={() => handleDelete(u._id)}
                  className="text-red-600 hover:underline"
                >
                  🗑️ Ta bort
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}