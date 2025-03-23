"use client";

import { useState } from "react";

export const CreateProjectForm = ({ onAdd }: { onAdd: (project: any) => void }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [githubLink, setGithubLink] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!title || !description || !demoLink || !githubLink) {
      alert("Alla fält är obligatoriska");
      return;
    }
  
    // Skapa projektobjektet som ska skickas
    const newProject = { title, description, demoLink, githubLink };
  
    try {
      // Skicka projektet till backend
      const res = await fetch("http://localhost:5000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      });
  
      // Kontrollera om svaret var framgångsrikt
      if (!res.ok) {
        throw new Error("Kunde inte spara projektet");
      }
  
      // Lägg till projektet i frontendlistan
      const savedProject = await res.json();
      onAdd(savedProject);
      setTitle("");
      setDescription("");
      setDemoLink("");
      setGithubLink("");
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("Ett fel inträffade vid skapande av projekt");
    }
  };
  

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 border rounded">
      <div>
        <label className="block text-sm font-medium mb-1">Titel:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Beskrivning:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
          rows={3}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Demo-länk:</label>
        <input
          type="text"
          value={demoLink}
          onChange={(e) => setDemoLink(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">GitHub-länk:</label>
        <input
          type="text"
          value={githubLink}
          onChange={(e) => setGithubLink(e.target.value)}
          className="w-full border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Lägg till projekt
      </button>
    </form>
  );
};
