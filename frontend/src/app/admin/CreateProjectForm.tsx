"use client";

import { useState, useRef, useEffect } from "react";

export const CreateProjectForm = ({ onAdd }: { onAdd: (project: any) => void }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [demoLink, setDemoLink] = useState("");
  const [githubLink, setGithubLink] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Prevent duplicate submissions
  const modalRef = useRef<HTMLDivElement>(null); // Ref to track the modal for outside clicks

  // Handle clicks outside the modal to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent multiple submissions while one is in progress
    if (isSubmitting) {
      console.log("Submission already in progress, ignoring...");
      return;
    }

    if (!title || !description || !demoLink || !githubLink) {
      alert("Alla fält är obligatoriska");
      return;
    }

    const newProject = { title, description, demoLink, githubLink };

    try {
      setIsSubmitting(true); // Disable further submissions
      console.log("Submitting project:", newProject);

      const token = localStorage.getItem("token");

      if (!token) {
        alert("Du måste vara inloggad för att skapa projekt.");
        setIsSubmitting(false);
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
        setIsSubmitting(false);
        return;
      }

      console.log("Project saved successfully:", savedProject);
      onAdd(savedProject); // Call onAdd only once
      setTitle("");
      setDescription("");
      setDemoLink("");
      setGithubLink("");
      setIsModalOpen(false); // Close the modal on successful submission
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("Ett fel inträffade vid skapande av projekt");
    } finally {
      setIsSubmitting(false); // Re-enable submissions
    }
  };

  return (
    <>
      {/* Button to open the modal */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        disabled={isSubmitting} // Disable button while submitting
      >
        Lägg till projekt...
      </button>

      {/* Modal (Popup) */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full space-y-4"
          >
            <h2 className="text-lg font-bold text-gray-900">Lägg till nytt projekt</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900">
                  Titel:
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border p-2 rounded text-gray-900"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900">
                  Beskrivning:
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full border p-2 rounded text-gray-900"
                  rows={3}
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900">
                  Demo-länk:
                </label>
                <input
                  type="text"
                  value={demoLink}
                  onChange={(e) => setDemoLink(e.target.value)}
                  className="w-full border p-2 rounded text-gray-900"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-900">
                  GitHub-länk:
                </label>
                <input
                  type="text"
                  value={githubLink}
                  onChange={(e) => setGithubLink(e.target.value)}
                  className="w-full border p-2 rounded text-gray-900"
                  disabled={isSubmitting}
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sparar..." : "Lägg till projekt"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  disabled={isSubmitting}
                >
                  Avbryt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};