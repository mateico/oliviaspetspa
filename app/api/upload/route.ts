import { put } from "@vercel/blob";
import sharp from "sharp";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;
    const beforeFile = formData.get("beforeFile") as File;
    const afterFile = formData.get("afterFile") as File;

    // Single image upload
    if (file) {
      // convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      //resize image to 400*400 with sharp
      const thumbnailBuffer = await sharp(buffer)
        .resize(400, 400, {
          fit: "cover",
          position: "attention",
        })
        .webp({ quality: 80 })
        .toBuffer();

      const largeBuffer = await sharp(buffer)
        .resize(1000, 1000, {
          fit: "cover",
          position: "attention",
        })
        .png()
        .toBuffer();

      //Upload to Vercel Blob
      const thumbnailBlob = await put(
        `dogs/${Date.now()}-${file.name}`,
        thumbnailBuffer,
        {
          access: "public",
        },
      );

      const largeBlob = await put(
        `dogs/${Date.now()}-large-${file.name}`,
        largeBuffer,
        { access: "public" },
      );

      return NextResponse.json({
        url: thumbnailBlob.url,
        largeUrl: largeBlob.url,
        success: true,
      });
    }

    // Before/after images upload
    if (beforeFile && afterFile) {
      const beforeBytes = await beforeFile.arrayBuffer();
      const beforeBuffer = Buffer.from(beforeBytes);

      const afterBytes = await afterFile.arrayBuffer();
      const afterBuffer = Buffer.from(afterBytes);

      const beforeThumbnail = await sharp(beforeBuffer)
        .resize(400, 400, {
          fit: "cover",
          position: "attention",
        })
        .webp({ quality: 80 })
        .toBuffer();

      const afterThumbnail = await sharp(afterBuffer)
        .resize(400, 400, {
          fit: "cover",
          position: "attention",
        })
        .webp({ quality: 80 })
        .toBuffer();

      const beforeLarge = await sharp(beforeBuffer)
        .resize(916, 1540, {
          fit: "cover",
          position: "attention",
        })
        .png()
        .toBuffer();

      const afterLarge = await sharp(afterBuffer)
        .resize(916, 1540, {
          fit: "cover",
          position: "attention",
        })
        .png()
        .toBuffer();

      // Upload all to Vercel Blob
      const beforeThumbnailBlob = await put(
        `dogs/${Date.now()}-before-${beforeFile.name}`,
        beforeThumbnail,
        { access: "public" },
      );

      const afterThumbnailBlob = await put(
        `dogs/${Date.now()}-after-${afterFile.name}`,
        afterThumbnail,
        { access: "public" },
      );

      const beforeLargeBlob = await put(
        `dogs/${Date.now()}-before-large-${beforeFile.name}`,
        beforeLarge,
        { access: "public" },
      );

      const afterLargeBlob = await put(
        `dogs/${Date.now()}-after-large-${afterFile.name}`,
        afterLarge,
        { access: "public" },
      );

      return NextResponse.json({
        beforeUrl: beforeThumbnailBlob.url,
        afterUrl: afterThumbnailBlob.url,
        largeBeforeUrl: beforeLargeBlob.url,
        largeAfterUrl: afterLargeBlob.url,
        success: true,
      });
    }
    return NextResponse.json({ error: "No files provided" }, { status: 400 });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
