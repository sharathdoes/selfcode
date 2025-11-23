'use server'
const GROQ_API_KEY = process.env.GROQ_API_KEY;

type Message = {
  role: string;
  content: string;
};

export async function Groq(req: Message[]) {
  if (!req || req.length === 0) throw new Error("No details provided");
  if (!GROQ_API_KEY) throw new Error("No GROQ API key provided");

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GROQ_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: req,
      temperature: 0.4,
    }),
  });

  const data = await res.json();

  if (!res.ok) {
    return { error: data.error?.message || "Groq API failed" };
  }

  return { reply: data.choices?.[0]?.message?.content || "" };
}
