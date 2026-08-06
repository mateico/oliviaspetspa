import { NextRequest, NextResponse } from "next/server";
import { deleteDog } from "@/lib/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid dog ID" }, { status: 400 });
    }

    await deleteDog(id);

    return NextResponse.json({
      success: true,
      message: "Dog deleted",
    });
  } catch (error) {
    console.error("Delete dog error:", error);
    return NextResponse.json(
      { error: "Failed to delete dog" },
      { status: 500 },
    );
  }
}
