"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    fetch("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const decoded: any = JSON.parse(atob(token.split(".")[1]));
        const foundUser = data.find((u: any) => u._id === decoded.id);
        if (foundUser) {
          setUser(foundUser);
        } else {
          router.push("/login");
        }
      });
  }, [router]);

  if (!user) return <p>Laddar...</p>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      {user.isAdmin && (
        <p className="mt-4 text-blue-600 font-semibold">👑 You are admin!</p>
      )}
    </main>
  );
}