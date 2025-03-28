"use client";

import { useEffect, useState } from "react";

interface Message {
  _id: string;
  senderName: string;
  senderEmail: string;
  message: string;
  createdAt: string;
  isRead?: boolean; 
}

export const MessagesList = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages`);
        if (!res.ok) throw new Error("Kunde inte hämta meddelanden.");
        const data: Message[] = await res.json();

        const sortedMessages = data.sort((a, b) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        setMessages(sortedMessages);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const markAsRead = async (id: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/messages/${id}/read`, {
        method: "PATCH",
      });

      if (!res.ok) throw new Error("Kunde inte uppdatera meddelande");

      const updated = await res.json();
      setMessages((prev) =>
        prev.map((msg) => (msg._id === updated._id ? updated : msg))
      );
    } catch (err) {
      console.error("Fel vid uppdatering:", err);
    }
  };

  if (loading) return <p>⏳ Laddar meddelanden...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="space-y-4">
      {selectedMessage ? (
        <div className="border p-4 rounded shadow">
          <h3 className="font-semibold text-lg">{selectedMessage.senderName}</h3>
          <p className="text-sm text-gray-600">{selectedMessage.senderEmail}</p>
          <p className="text-gray-800">{selectedMessage.message}</p>
          <p className="text-sm text-gray-500">
            {new Date(selectedMessage.createdAt).toLocaleString()}
          </p>
          <div className="mt-4 flex space-x-4">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() =>
                window.location.href = `mailto:${selectedMessage.senderEmail}`
              }
            >
              Svara
            </button>
            <button
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              onClick={() => setSelectedMessage(null)}
            >
              Stäng
            </button>
          </div>
        </div>
      ) : (
        messages.map((message) => (
          <div
            key={message._id}
            className="border p-4 rounded shadow hover:bg-gray-100 cursor-pointer"
            onClick={() => setSelectedMessage(message)}
          >
            <p className="font-semibold">{message.senderName}</p>
            <p className="text-sm text-gray-600">{message.senderEmail}</p>
            <p className="text-gray-800">{message.message}</p>
            <p className="text-sm text-gray-500">
              {new Date(message.createdAt).toLocaleString()}
            </p>
            <div className="mt-2 flex items-center gap-4">
              {!message.isRead ? (
                <span className="text-blue-400 text-sm">🔵 Oläst</span>
              ) : (
                <span className="text-green-400 text-sm">✅ Läst</span>
              )}
              {!message.isRead && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); 
                    markAsRead(message._id);
                  }}
                  className="text-sm text-blue-400 underline hover:text-blue-300"
                >
                  Markera som läst
                </button>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
};