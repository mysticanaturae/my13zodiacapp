export default async function handler(req, res) {
  try {
    // Only allow POST
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Read OpenAI key from GitHub secrets
    const key = process.env.OPENAI_KEY;
    if (!key) {
      return res.status(500).json({ error: "Missing OPENAI_KEY" });
    }

    // Read the data from frontend
    const { snapshot, premium } = req.body || {};

    if (!snapshot) {
      return res.status(400).json({ error: "Missing snapshot data" });
    }

    // Build messages for OpenAI
    const messages = [
      {
        role: "system",
        content:
          "You are a mystical, poetic, 500k-copywriter astrologer specializing in the 13-zodiac Berg system and the House of Ophiuchus."
      },
      {
        role: "user",
        content: JSON.stringify({
          snapshot,
          premium
        })
      }
    ];

    // Call OpenAI
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.85
      })
    });

    // Parse JSON
    const data = await response.json();

    if (!data) {
      return res.status(500).json({ error: "Empty response from OpenAI" });
    }

    // Return OpenAI response to frontend
    return res.status(200).json(data);

  } catch (err) {
    console.error("Error in generateforecast.js:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
