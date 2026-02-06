import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { noteId } = await req.json();
    await db.delete($notes).where(eq($notes.id, parseInt(noteId)));
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.error("Failed to delete note", error);
    return NextResponse.json(
      { message: "Failed to delete note" },
      { status: 500 }
    );
  }
}
