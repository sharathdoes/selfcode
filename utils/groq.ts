const GROQ_API_KEY = process.env.GROQ_API_KEY;

type message = {
  role: string;
  content: string;
};

export async function Groq(req: message[]) {
  if (!req || req.length === 0) throw new Error("No details provided");

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama3-70b-8192",
      messages: req,
      temperature: 0.4,
    }),
  });

  if (!res) throw new Error("Failed to fetch from groq");
  const data = await res.json();
  return data.choices[0].message.content;
}
