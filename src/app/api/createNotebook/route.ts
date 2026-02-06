// /api/createNotebook

import { db } from "@/lib/db";
import { $notes } from "@/lib/db/schema";
import { generateAIImage } from "@/lib/aiImage";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Checking for user and note name
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { name: noteName } = body;

    if (!noteName) {
      return NextResponse.json(
        { message: "Invalid note name" },
        { status: 404 }
      );
    }

    // Generating Dall-E image based on note name
    const imageURL = await generateAIImage(noteName) as string;
    if (!imageURL) {
      return NextResponse.json(
        { message: "Failed to generate Image URL" },
        { status: 500 }
      );
    }

    const note_ids = await db
      .insert($notes)
      .values({
        name: noteName,
        userId,
        imageUrl: imageURL,
      })
      .returning({
        insertedId: $notes.id, // Returning the inserted note id
      });

    return NextResponse.json(
      {
        message: "Note created successfully!",
        note_id: note_ids[0].insertedId,
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error in generating note image", error);
    return NextResponse.json(
      { message: "Failed to generate note image" },
      { status: 500 }
    );
  }
}
