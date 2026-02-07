export async function generateAIImage(noteName: string) {
  if (!process.env.POLLEN_KEY) {
    throw new Error("POLLEN_KEY is not configured");
  }

  try {
    const prompt = `A beautifully designed image titled ${noteName}`;

    const res = await fetch(
      `https://gen.pollinations.ai/image/${prompt}?width=512&height=512&model=flux`,
      {
        headers: {
          Accept: "*/*",
          Authorization: `Bearer ${process.env.POLLEN_KEY}`,
        },
      },
    );

    if (!res.ok) {
      throw new Error(`Pollinations error: ${res.status}`);
    }

    const imageURL = res.url;
    console.log("res: ", res);
    return imageURL;
  } catch (error) {
    console.error("Image generation failed:", error);
    return null;
  }
}
