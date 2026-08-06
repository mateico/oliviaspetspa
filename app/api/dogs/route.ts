import { NextRequest, NextResponse } from "next/server";
import { getDogs, addDog } from "@/lib/db";

export async function GET() {
  try {
    const dogs = await getDogs();
    return NextResponse.json(dogs);
  } catch (error) {
    console.error("Fetch dogs error:", error);
    return NextResponse.json(
      { error: "Failed to fetch dogs" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const {
      title,
      photoType,
      photoTitle,
      imageUrl,
      beforeImageUrl,
      afterImageUrl,
      largeImageUrl,
      largeBeforeImageUrl,
      largeAfterImageUrl,
      clientEmail,
      clientWhatsapp,
    } = await request.json();

    if (photoType === "una-imagen") {
      if (!imageUrl || !largeImageUrl) {
        return NextResponse.json(
          { error: "Image required for una-imagen" },
          { status: 400 },
        );
      }
    } else if (photoType === "antes-despues") {
      if (
        !beforeImageUrl ||
        !afterImageUrl ||
        !largeBeforeImageUrl ||
        !largeAfterImageUrl
      ) {
        return NextResponse.json(
          { error: "Both before and after images required" },
          { status: 400 },
        );
      }
    }

    const dog = await addDog({
      title,
      photoType,
      photoTitle,
      imageUrl,
      beforeImageUrl,
      afterImageUrl,
      largeImageUrl,
      largeBeforeImageUrl,
      largeAfterImageUrl,
      clientEmail,
      clientWhatsapp,
    });

    return NextResponse.json({
      success: true,
      dog,
    });
  } catch (error) {
    console.error("Add dog error:", error);
    return NextResponse.json({ error: "Failed to add dog" }, { status: 500 });
  }
}
