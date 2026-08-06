"use client";

import Image from "next/image";
import { useState } from "react";

interface Dog {
  id: number;
  title: string;
  image_url: string;
  polaroid_url?: string;
  large_image_url?: string;
  large_before_image_url?: string;
  large_after_image_url?: string;
  photo_type: "una-imagen" | "antes-despues";
  created_at: string;
}

interface DogListProps {
  dogs: Dog[];
  onDelete: () => void;
}

export default function ImagesDogList({ dogs, onDelete }: DogListProps) {
  const [generatingId, setGeneratingId] = useState<number | null>(null);

  async function handleDelete(id: number) {
    if (!confirm("Are you sure?")) return;
    try {
      const response = await fetch(`/api/dogs/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        onDelete();
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  }

  async function handleGeneratePolaroid(dogId: number) {
    setGeneratingId(dogId);
    try {
      const response = await fetch("/api/polaroid", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dogId }),
      });
      if (response.ok) {
        onDelete(); // Refresh the list
      } else {
        console.error("Failed to generate polaroid");
      }
    } catch (err) {
      console.error("Polaroid generation error:", err);
    } finally {
      setGeneratingId(null);
    }
  }

  function hasLargeImages(dog: Dog): boolean {
    if (dog.photo_type === "una-imagen") {
      return !!dog.large_image_url;
    } else {
      return !!(dog.large_after_image_url && dog.large_before_image_url);
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Dogs ({dogs.length})</h2>
      {dogs.length === 0 ? (
        <p className="text-gray-500">No dogs yet. Add one above!</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {dogs.map((dog) => {
            const isGenerating = generatingId === dog.id;
            const hasLarges = hasLargeImages(dog);
            const displayImage = dog.polaroid_url || dog.image_url;

            return (
              <div
                key={dog.id}
                className="border rounded-lg overflow-hidden flex flex-col"
              >
                {/* Warning for legacy images */}
                {!hasLarges && (
                  <div className="bg-yellow-100 text-yellow-800 text-xs p-2 border-b">
                    ⚠ No high-res images (polaroid unavailable)
                  </div>
                )}

                {/* Image */}
                <div className="relative bg-gray-100">
                  <Image
                    src={displayImage}
                    width={400}
                    height={400}
                    alt={dog.title}
                    className="w-full h-40 object-cover"
                    unoptimized
                  />
                  {isGenerating && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <p className="text-white text-xs">Generating...</p>
                    </div>
                  )}
                </div>

                {/* Info and Actions */}
                <div className="p-3 flex-1 flex flex-col">
                  <p className="font-medium truncate text-sm">{dog.title}</p>

                  {/* Polaroid buttons */}
                  {hasLarges && (
                    <div className="mt-2 space-y-2">
                      {!dog.polaroid_url ? (
                        <button
                          onClick={() => handleGeneratePolaroid(dog.id)}
                          disabled={isGenerating}
                          className="w-full bg-blue-500 text-white text-xs py-1 rounded hover:bg-blue-600 disabled:opacity-50"
                        >
                          Generate Polaroid
                        </button>
                      ) : (
                        <>
                          <a
                            href={dog.polaroid_url}
                            download
                            className="block w-full bg-green-500 text-white text-xs py-1 rounded hover:bg-green-600 text-center"
                          >
                            Download Polaroid
                          </a>
                          <button
                            onClick={() => handleGeneratePolaroid(dog.id)}
                            disabled={isGenerating}
                            className="w-full bg-blue-500 text-white text-xs py-1 rounded hover:bg-blue-600 disabled:opacity-50"
                          >
                            Regenerate
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {/* Delete button */}
                  <button
                    onClick={() => handleDelete(dog.id)}
                    className="mt-auto w-full bg-red-500 text-white text-sm py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
