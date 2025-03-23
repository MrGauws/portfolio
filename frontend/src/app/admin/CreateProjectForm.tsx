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

    const newProject = { title, description, demoLink, githubLink };

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Du måste vara inloggad för att skapa projekt.");
        return;
      }

      const res = await fetch("http://localhost:5000/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newProject),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Fel från server:", errorText);
        throw new Error("Kunde inte spara projektet");
      }

      const savedProject = await res.json();

      if (!savedProject || !savedProject.title) {
        console.warn("Svar från server saknar giltig data:", savedProject);
        return;
      }

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
