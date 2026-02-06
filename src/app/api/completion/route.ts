// /api/completion
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Prompt for auto-completion
    const formattedPrompt = `I am writing a piece of text in a notion text editor app.
        Help me complete my train of thought here: ##${prompt}##
        keep the tone of the text consistent with the rest of the text.
        keep the response short and sweet.`;

    // Generate content
    const response = await model.generateContent({
      contents: [
        // { role: "system", parts: [{ text: sysPrompt }] },
        { role: "user", parts: [{ text: formattedPrompt }] },
      ],
      generationConfig: { maxOutputTokens: 30, temperature: 0.7 },
    });

    // Extract only the generated text
    let generatedText =
      response?.response?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!generatedText) {
      throw new Error("Failed to generate content.");
    }

    // **Clean the response:** Remove the prompt if it appears in the output
    generatedText = generatedText
      .replace(new RegExp(`##?${prompt}##?`, "gi"), "")
      .replace(/^(\.\.\.|…)/, "")
      .trim();

    return new NextResponse(generatedText);
  } catch (error) {
    console.error("Failed to auto complete", error);
    return NextResponse.json(
      { message: "Failed to generate note image" },
      { status: 500 }
    );
  }
}
