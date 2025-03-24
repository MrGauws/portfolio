"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
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

  if (!user) return <p>Loading...</p>;

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <p>You're logged in! 🎉</p>
    </main>
  );
}