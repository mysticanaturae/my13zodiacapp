export default async function handler(req, res) {
  const key = process.env.OPENAI_KEY;

  if (!key) {
    return res.status(500).json({ error: "Missing OpenAI key" });
  }

  const { snapshot, premium } = req.body;

  const messages = [
    { role: "system", content: "You are a mystical 500k-copywriter." },
    { role: "user", content: JSON.stringify({ snapshot, premium }) }
  ];

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

  const json = await response.json();
  return res.status(200).json(json);
}
