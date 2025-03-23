"use client";
export type { User };

import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
};

export const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Ingen token hittades.");
      setLoading(false);
      return;
    }

    const decoded: any = JSON.parse(atob(token.split(".")[1]));
    setCurrentUserId(decoded.id);

    fetch("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Kunde inte hämta användare");
        const data: User[] = await res.json();
        setUsers(data);

        const current = data.find((u) => u._id === decoded.id);
        setIsAdmin(!!current?.isAdmin);
      })
      .catch((err) => {
        console.error(err);
        setError("Fel vid hämtning av användare");
      })
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (userId: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const confirmDelete = confirm("Är du säker på att du vill ta bort användaren?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Kunde inte ta bort användaren");

      setUsers(users.filter((u) => u._id !== userId));
    } catch (err) {
      console.error(err);
      alert("Något gick fel vid borttagning.");
    }
  };

  if (loading) return <p>⏳ Laddar användare...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <ul className="space-y-4">
      {users.map((user) => (
        <li key={user._id} className="border p-4 rounded">
          <p><strong>Namn:</strong> {user.name}</p>
          <p><strong>E-post:</strong> {user.email}</p>
          <p><strong>Admin:</strong> {user.isAdmin ? "Ja" : "Nej"}</p>

          {isAdmin && user._id !== currentUserId && (
            <button
              onClick={() => handleDelete(user._id)}
              className="mt-2 text-red-600 hover:underline"
            >
              🗑️ Ta bort
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};
