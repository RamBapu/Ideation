// /api/saveNote

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { eq, and, ne, isNull } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { noteId: noteIdStr, editorState } = body;
    const noteId = parseInt(noteIdStr);

    if (!editorState || !noteId) {
      return NextResponse.json(
        { message: "Missing credentials" },
        { status: 500 }
      );
    }

    await db.update($notes).set({ editorState: "" }).where(isNull($notes.editorState));

    await db
      .update($notes)
      .set({ editorState })
      .where(and(eq($notes.id, noteId), ne($notes.editorState, editorState)))
      .returning();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
