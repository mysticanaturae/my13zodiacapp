export async function fetchZodiacForecast(zodiacSign) {
  const res = await fetch(`/api/generateForecast`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ snapshot: zodiacSign })
  });
  return res.json();
}
