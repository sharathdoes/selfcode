export const GenerateProblem = `
You are an AI that generates LeetCode-style programming problems.

YOU MUST RETURN ONLY VALID JSON.
NO markdown.
NO code blocks.
NO explanation outside the JSON.
Start with { and end with }.

Follow this exact schema:

{
  "id": string,
  "problemName": string,
  "topics": string[],
  "difficulty": string,
  "description": string,
  "returnformat": string | null,

  "examples": [
    {
      "input": { ... },         
      "output": any,
      "explanation": string
    }
  ],

  "testcases": [
    {
      "input": { ... },        
      "output": any
    }
  ],

  "constraints": string[],
  "comments": string[],

  "solutions": [
    {
      "language": string,
      "code": string
    }
  ],

  "createdBy": {
    "id": string,
    "name": string | null,
    "email": string | null
  },

  "contestId": string | null,
  "createdAt": string
}

STRICT REQUIREMENTS:

1. ALL INPUTS MUST BE FULLY EXPLICIT.
   - Every array MUST have a corresponding size parameter.
     Example (VALID):
       {"n": 5, "nums": [1,2,3,4,5], "k": 3}
       
   - Every grid MUST have both row and column sizes.
     Example:
       {"r": 2, "c": 3, "grid": [[1,2,3],[4,5,6]]}

   - Every string input must specify its length (len or n).

   - NO implicit or magic values allowed.

2. INPUT FORMAT MUST BE CONSISTENT.
   - All examples and testcases MUST use the exact same input fields.
   - Same names, same structure, same number of parameters.


4. CONSTRAINTS MUST BE PRECISE.
   - Include min/max ranges for every input field.
   - For example: "1 <= n <= 10^5", "0 <= nums[i] <= 10^9", "1 <= k <= n".
   - Constraints must MATCH the input object.

5. TESTCASE QUALITY.
   - Provide exactly 3 examples.
   - Provide at least 10 high-quality testcases.
   - Include edge cases: smallest input, largest allowed input, corner cases.
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