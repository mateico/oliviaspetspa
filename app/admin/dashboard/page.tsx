"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PhotoUploadForm from "./components/PhotoUploadForm";
import DogList from "./components/DogList";

interface Dog {
  id: number;
  title: string;
  image_url: string;
  created_at: string;
}

export default function DashboardPage() {
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    fetchDogs();
  }, []);

  async function fetchDogs() {
    try {
      const response = await fetch("/api/dogs");
      if (response.ok) {
        const data = await response.json();
        setDogs(data);
      }
    } catch (err) {
      console.log("Fetch error:", err);
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const reader = new FileReader();
      reader.onload = (event) => {
        // qq: como functiona esto
        setPreview(event.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!file || !title.trim()) {
      setError("Please enter a title and select an image");
      return;
    }

    setLoading(true);
    try {
      // Upload image
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Image upload failed");
      }

      const uploadData = await uploadResponse.json();
      const imageUrl = uploadData.url;

      //Add dog to database
      const dogResponse = await fetch("/api/dogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: title.trim(), imageUrl }),
      });

      if (dogResponse.ok) {
        setTitle("");
        setFile(null);
        setPreview("");
        fetchDogs();
      } else {
        throw new Error("Failed to add dog");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error adding dog");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dog Gallery Admin</h1>
          <button
            onClick={() => {
              document.cookie =
                "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
              router.push("/admin/login");
            }}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        <PhotoUploadForm onUploadSuccess={fetchDogs} />
        <DogList dogs={dogs} onDelete={fetchDogs} />
      </div>
    </div>
  );
}
