"use client";

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
}
import { useEffect, useState } from "react";
import { AdminStats } from "./AdminStats";
import { useRouter } from "next/navigation";
import { MessagesList } from "./MessagesList";



export default function AdminPage() {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [inboxOpen, setInboxOpen] = useState(false);
  const router = useRouter();


  const fetchUsers = async (token: string) => {
    const res = await fetch("http://localhost:5000/users", {
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
      const res = await fetch(`http://localhost:5000/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Kunde inte ta bort användare");
      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch (err) {
      console.error(err);
      alert("Fel vid borttagning");
    }
  };

  const handleMakeAdmin = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/users/${id}/make-admin`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Fel vid adminuppgradering");

      // Uppdatera användaren i listan
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isAdmin: true } : u))
      );
    } catch (err: any) {
      console.error(err);
      alert(err.message);
    }
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:5000/users", {
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
      alert(err.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return router.push("/login");

    fetchUsers(token)
      .then((data) => {
        const decoded: any = JSON.parse(atob(token.split(".")[1]));
        const currentUser = data.find((u: User) => u._id === decoded.id);

        if (!currentUser?.isAdmin) {
          router.push("/profile");
        } else {
          setUser(currentUser);
          setUsers(data);
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

      <form onSubmit={handleCreateUser} className="mb-6 flex gap-4 flex-wrap">
        <input
          type="text"
          placeholder="Namn"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="E-post"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
          className="border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="Lösenord"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 rounded"
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
            {u._id !== user._id && (
              <>
                {!u.isAdmin && (
                  <button
                    onClick={() => handleMakeAdmin(u._id)}
                    className="mr-4 text-blue-600 hover:underline"
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
              </>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
