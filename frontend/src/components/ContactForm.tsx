    "use client";

    import { useState } from "react";

    export const ContactForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        // Kontrollera att fälten är ifyllda
        if (!name || !email || !message) {
          alert("Alla fält är obligatoriska");
          return;
        }
      
        try {
          const response = await fetch("http://localhost:5000/messages", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ senderName: name, senderEmail: email, message }),
          });
      
          if (!response.ok) {
            throw new Error("Ett fel inträffade vid skickandet av meddelandet.");
          }
      
          alert("Meddelandet skickades framgångsrikt!");
          // Rensa formuläret
          setName("");
          setEmail("");
          setMessage("");
        } catch (err) {
          console.error("Fel vid skickande av meddelande:", err);
          alert("Kunde inte skicka meddelandet.");
        }
      };
      

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
        <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
            Namn:
            </label>
            <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            required
            />
        </div>
        <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
            E-post:
            </label>
            <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
            />
        </div>
        <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
            Meddelande:
            </label>
            <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full border p-2 rounded"
            rows={4}
            required
            />
        </div>
        <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
            Skicka
        </button>
        </form>
    );
    };
