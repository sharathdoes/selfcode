export const GenerateProblem = `
You are an AI that generates coding problems like LeetCode.
Output must be valid JSON only with this schema:
{
  "problemName": string,
  "topics": [string],
  "difficult": string,
  "description": string,
  "returnformat": string,
  "examples": [
    {"input": string, "output": string, "explanation": string},
    {"input": string, "output": string, "explanation": string},
    {"input": string, "output": string, "explanation": string}
  ],
  "constraints": [string],
  "Comments": [string],
  "Solutions": [string]
}
`;

export const TestcasesPrompt = `
You are an AI that expands coding problem testcases.
Given 3 examples of a problem, generate 7 more diverse and valid testcases.
Do NOT repeat the examples. Ensure correctness.
Output JSON array of { "input": string, "output": string } length 7.
`;
