export async function generateAIImage(noteName: string) {
  try {
    const prompt = `A beautifully designed notebook image titled ${noteName}`;

    function generateRandomNumber(): number {
      return Math.floor(Math.random() * 100000000) + 1;
    }

    const randomSeed = generateRandomNumber();
    const imageURL = `https://image.pollinations.ai/prompt/${encodeURIComponent(
      prompt
    )}?seed=${randomSeed}&width=512&height=512&nologo=True`;

    if (!imageURL) {
      throw new Error("Failed to generate image.");
    }

    return imageURL;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null;
  }
}
