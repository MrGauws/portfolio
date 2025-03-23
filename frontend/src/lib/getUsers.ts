export async function getUsers() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch("http://localhost:5000/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch users");
  }

  return res.json();
}
