export const GenerateProblem = `
You are an AI that generates coding problems like LeetCode.
YOU MUST RETURN ONLY VALID JSON. NO markdown, NO code blocks, NO explanations.
Start your response with { and end with }

Use this exact schema:
{
  "problemName": "string",
  "topics": ["string"],
  "difficult": "Easy" or "Medium" or "Hard",
  "description": "string",
  "returnformat": "string",
  "examples": [
    {"input": "string", "output": "string", "explanation": "string"}
  ],
  "testcases": {"input": "string", "output": "string"},
  "constraints": ["string"],
  "Comments": ["string"],
  "Solutions": [
    {"language": "Python", "code": "string"},
    {"language": "Java", "code": "string"}
  ]
}

Include 3 examples and at least 2 solutions in different languages & 10 testcases.
`;

export const models = [
        { id: "gemma2-9b-it", name: "Gemma 2 9B", provider: "Google" },
        {
            id: "llama-3.3-70b-versatile",
            name: "Llama 3.3 70B Versatile",
            provider: "Meta",
        },
        {
            id: "llama-3.1-8b-instant",
            name: "Llama 3.1 8B Instant",
            provider: "Meta",
        },
        { id: "llama-guard-3-8b", name: "Llama Guard 3 8B", provider: "Meta" },
        { id: "llama3-70b-8192", name: "Llama 3 70B", provider: "Meta" },
        { id: "llama3-8b-8192", name: "Llama 3 8B", provider: "Meta" },
        { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B", provider: "Mistral" },
    ];