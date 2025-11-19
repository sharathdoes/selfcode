import {ProblemDescription} from '../utils/types'
import {  GenerateProblem } from "../utils/prompts";
import { Groq } from "./groq";


 export async function generateProblem(prompt: string): Promise<ProblemDescription> {
  const result = await Groq([
    { role: "system", content: GenerateProblem },
    { role: "user", content: `Generate a problem based on this idea: ${prompt} ` },
  ]);

    if ("error" in result) {
      console.error(result.error);
    } 
    return result.reply; 
}

export async function generateContest(prompts:string[]):Promise<ProblemDescription[]>{
  if(prompts.length===0){
    return [];
  }
  let problems=[];
  for(const prompt of prompts){
    const problem=await generateProblem(prompt);
    problems.push(problem);
  }
  return problems;
}