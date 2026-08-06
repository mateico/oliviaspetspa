"use client";

import { useState } from "react";

interface PhotoUploadFormProps {
  onUploadSuccess: () => void;
}

export default function PhotoUploadForm({
  onUploadSuccess,
}: PhotoUploadFormProps) {
  const [uploadType, setUploadType] = useState<"una-imagen" | "antes-despues">(
    "una-imagen",
  );
  const [dogName, setDogName] = useState("");
  const [title, setTitle] = useState("");
  const [tagline, setTagline] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientWhatsapp, setClientWhatsapp] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [antesFile, setAntesFile] = useState<File | null>(null);
  const [despuesFile, setDespuesFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!dogName.trim()) {
      setError("Please enter dog name");
      return;
    }

    if (uploadType === "una-imagen") {
      if (!imageFile) {
        setError("Please select image");
        return;
      }
    } else {
      if (!antesFile || !despuesFile) {
        setError("Please select both before and after images");
        return;
      }
    }

    setLoading(true);

    try {
      if (uploadType === "una-imagen") {
        // Upload single image
        const formData = new FormData();
        formData.append("file", imageFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Image upload failed");
        }

        const uploadData = await uploadResponse.json();
        const imageUrl = uploadData.url;
        const largeImageUrl = uploadData.largeUrl;

        // Save to database
        const dbResponse = await fetch("/api/dogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: dogName,
            imageUrl,
            largeImageUrl,
            photoType: "una-imagen",
            photoTitle: title || undefined,
            clientEmail: clientEmail || undefined,
            clientWhatsapp: clientWhatsapp || undefined,
          }),
        });

        if (!dbResponse.ok) {
          throw new Error("Failed to save dog");
        }

        const dogData = await dbResponse.json();
        const dogId = dogData.dog.id;

        // Trigger polaroid generator (non-blocking)
        fetch("/api/polaroid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dogId }),
        }).catch((err) => console.error("Polaroid generation failed:", err));
      } else {
        // Upload before/after images
        const formData = new FormData();
        formData.append("beforeFile", antesFile);
        formData.append("afterFile", despuesFile);

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Images upload failed");
        }

        const uploadData = await uploadResponse.json();
        const beforeUrl = uploadData.beforeUrl;
        const afterUrl = uploadData.afterUrl;
        const largeBeforeUrl = uploadData.largeBeforeUrl;
        const largeAfterUrl = uploadData.largeAfterUrl;

        //Save to database
        const dbResponse = await fetch("/api/dogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: dogName,
            beforeImageUrl: beforeUrl,
            afterImageUrl: afterUrl,
            largeBeforeImageUrl: largeBeforeUrl,
            largeAfterImageUrl: largeAfterUrl,
            photoType: "antes-despues",
            clientEmail: clientEmail || undefined,
            clientWhatsapp: clientWhatsapp || undefined,
          }),
        });

        if (!dbResponse.ok) {
          throw new Error("Failed to save dog");
        }

        const dogData = await dbResponse.json();
        const dogId = dogData.dog.id;

        // Trigger polaroid generation
        fetch("/api/polaroid", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dogId }),
        }).catch((err) => console.error("Polaroid generation failed:", err));
      }
      // Reset form
      setDogName("");
      setTitle("");
      setTagline("");
      setClientEmail("");
      setClientWhatsapp("");
      setImageFile(null);
      setAntesFile(null);
      setDespuesFile(null);

      // Notify parent to refresh dog list
      onUploadSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error uploading");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-bold mb-4">Agregar Nueva Foto</h2>

      {/* Radio Buttons */}
      <div className="mb-6 space-y-3">
        <div className="flex items-center">
          <input
            type="radio"
            id="una-imagen"
            name="uploadType"
            value="una-imagen"
            checked={uploadType === "una-imagen"}
            onChange={(e) =>
              setUploadType(e.target.value as "una-imagen" | "antes-despues")
            }
            className="w-4 h-4"
            disabled={loading}
          />
          <label htmlFor="una-imagen" className="ml-2 font-medium">
            Una Imagen
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            id="antes-despues"
            name="uploadType"
            value="antes-despues"
            checked={uploadType === "antes-despues"}
            onChange={(e) =>
              setUploadType(e.target.value as "una-imagen" | "antes-despues")
            }
            className="w-4 h-4"
            disabled={loading}
          />
          <label htmlFor="antes-despues" className="ml-2 font-medium">
            Antes/Despues
          </label>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/*Dog Name - Always visible */}
        <div>
          <label className="block text-sm font-medium mb-1">Dog Name</label>
          <input
            type="text"
            value={dogName}
            onChange={(e) => setDogName(e.target.value)}
            placeholder="Enter dog name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        {/*Client Email - Optional */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Client Email (Optional)
          </label>
          <input
            type="email"
            value={clientEmail}
            onChange={(e) => setClientEmail(e.target.value)}
            placeholder="Enter client email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        {/*Client WhatsApp - Optional */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Client WhatsApp (Optional)
          </label>
          <input
            type="tel"
            value={clientWhatsapp}
            onChange={(e) => setClientWhatsapp(e.target.value)}
            placeholder="Enter client WhatsApp number"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          />
        </div>

        {/*Una Imagen Section */}
        {uploadType === "una-imagen" && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Imagen</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                placeholder="Enter file"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Titulo</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter title"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
          </>
        )}

        {/*Antes/Despues Section */}
        {uploadType === "antes-despues" && (
          <>
            <div>
              <label className="block text-sm font-medium mb-1">Antes</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setAntesFile(e.target.files?.[0] || null)}
                placeholder="Enter file"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Despues</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setDespuesFile(e.target.files?.[0] || null)}
                placeholder="Enter file"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Tagline (Optional)
              </label>
              <input
                type="text"
                value={tagline}
                onChange={(e) => setTagline(e.target.value)}
                placeholder="Enter tagline for polaroid"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>
          </>
        )}

        {error && <div className="bg-red-100 text-red-700 p-3">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}
