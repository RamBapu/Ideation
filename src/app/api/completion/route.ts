// /api/completion
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ message: "Invalid prompt" }, { status: 400 });
    }

    const formattedPrompt = `
          You are helping autocomplete text in a Notion-style editor.

          Text so far:
          "${prompt}"

          Continue naturally.
          Keep the same tone.
          Keep it short (1–2 sentences).
          `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: formattedPrompt,
      config: {
        // maxOutputTokens: 40,
        temperature: 0.7,
      },
    });

    let generatedText = response.text?.trim();

    if (!generatedText) {
      throw new Error("EMPTY_MODEL_RESPONSE");
    }

    // Clean the response
    generatedText = generatedText
      .replace(new RegExp(`##?${prompt}##?`, "gi"), "")
      .replace(/^(\.\.\.|…)/, "");

    return new NextResponse(generatedText);
  } catch (error: unknown) {
    console.error("Failed to auto complete:", error);

    // ✅ Rate-limit handling (RESOURCE_EXHAUSTED)
    if (error instanceof Error && "status" in error && error?.status === 429) {
      return NextResponse.json(
        { message: "AI rate limit reached. Try again shortly." },
        { status: 429 },
      );
    }

    return NextResponse.json(
      { message: "Failed to generate completion" },
      { status: 500 },
    );
  }
}
