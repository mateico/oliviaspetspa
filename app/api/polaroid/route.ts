import { put } from "@vercel/blob";
import { getDogById, updateDogPolaroidUrl } from "@/lib/db";
import {
  generateSinglePolaroid,
  generateBeforeAfterPolaroid,
} from "@/lib/polaroid/generator";
import { SHOP_NAME } from "../../../lib/polaroid/layout";

export async function POST(request: Request) {
  try {
    const { dogId } = await request.json();

    if (!dogId) {
      return Response.json({ error: "dogId is required" }, { status: 400 });
    }

    // Fetch dog from database
    const dog = await getDogById(dogId);

    if (!dog) {
      return Response.json({ error: "Dog not found" }, { status: 404 });
    }

    let polaroidBuffer;

    // Determine if single or before/after.
    if (dog.large_before_image_url && dog.large_after_image_url) {
      // Before/after
      polaroidBuffer = await generateBeforeAfterPolaroid({
        beforePhotoUrl: dog.large_before_image_url,
        afterPhotoUrl: dog.large_after_image_url,
        shopName: SHOP_NAME,
        dogName: dog.name,
        logoSvg: "", // not used in generator
      });
    } else if (dog.large_image_url) {
      // Single image
      polaroidBuffer = await generateSinglePolaroid({
        photoUrl: dog.large_image_url,
        shopName: SHOP_NAME,
        dogName: dog.name,
        tagline: dog.photo_title || "",
        logoSvg: "", // not used in generator
      });
    } else {
      return Response.json(
        { error: "No large image URL found for this dog" },
        { status: 400 },
      );
    }

    // Upload PNG to Vercel Blob
    const filename = `polaroid-${dogId}-${Date.now()}.png`;
    const blob = await put(filename, polaroidBuffer.pngBuffer, {
      access: "public",
      contentType: "image/png",
    });

    // Upload dog row with polaroid URL and timestamp
    await updateDogPolaroidUrl(dogId, blob.url);

    return Response.json({
      success: true,
      polaroidUrl: blob.url,
      dog: { id: dogId, name: dog.name },
    });
  } catch (error) {
    console.error("Polaroid generation failed:", error);
    return Response.json(
      { error: "Failed to generate polaroid", details: String(error) },
      { status: 500 },
    );
  }
}
