"use client";

import { useState } from "react";

export const ContactForm = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !subject || !message) {
      alert("Fyll i alla fält.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderEmail: email, senderName: subject, message }),
      });

      if (!res.ok) throw new Error("Misslyckades att skicka");

      alert("✅ Meddelandet skickat!");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      alert("❌ Något gick fel.");
    }
  };

  return (
    <section id="contact" className="flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-black text-green-400 font-mono p-6 rounded-lg border border-green-700 shadow-lg max-w-xl w-full space-y-4"
      >
        <h2 className="text-2xl text-green-400 text-center mb-4">
          {"echo 'Kontakta mig' ▍"}
        </h2>

        <div>
          <label className="block mb-1">> Din e-post:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border-b border-green-500 outline-none focus:border-green-300 transition-all"
          />
        </div>

        <div>
          <label className="block mb-1">> Ämne:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full bg-black border-b border-green-500 outline-none focus:border-green-300 transition-all"
          />
        </div>

        <div>
          <label className="block mb-1">> Meddelande:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full bg-black border border-green-500 outline-none focus:border-green-300 transition-all"
          />
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-black px-4 py-2 rounded font-bold transition-all"
          >
            ▍Skicka
          </button>
        </div>
      </form>
    </section>
  );
};
