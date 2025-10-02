import {Description, TestCase} from '../utils/types'
import {  GenerateProblem,TestcasesPrompt } from "../utils/prompts";
import { Groq } from "../utils/groq";

export async function generateProblem(prompt: string): Promise<Description> {
  const result = await Groq([
    { role: "system", content: GenerateProblem },
    { role: "user", content: `Generate a problem based on this idea: ${prompt}` },
  ]);

    if ("error" in result) {
      console.error(result.error);
    } 
    return result.reply; 
}

export async function generateTestcases(description: Description): Promise<TestCase[]> {
  
  const raw = await Groq([
    { role: "system", content: TestcasesPrompt },
    {
      role: "user",
      content: `Problem: ${description.problemName}\nExamples: ${JSON.stringify(description.examples)}`,
    },
  ]);

  return raw.reply;
}