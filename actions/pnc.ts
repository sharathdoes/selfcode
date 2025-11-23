'use server'
import {ProblemDescription} from '../utils/types'
import { GenerateProblem } from "../utils/prompts";
import { Groq } from "./groq";
import Prisma from "@/prisma/prisma"
 export async function generateProblem(prompt: string): Promise<ProblemDescription> {
  const result = await Groq([
    { role: "system", content: GenerateProblem },
    { role: "user", content: `Generate a problem based on this idea: ${prompt} ` },
  ]);

    if ("error" in result) {
      console.error(result.error);
    } 
      const parsed = typeof result.reply === "string" 
      ? JSON.parse(result.reply) 
      : result.reply;
    
    return parsed as ProblemDescription;
}


/* 
  "problemName": "Rotate Array",
  "topics": ["Array", "Algorithm"],
  "difficulty": "Easy",
  "description": "Given an array, rotate the array to the right by a specified number of steps.",
  "returnformat": "int[]",
  "examples": [
    {
      "input": "[1,2,3,4,5,6,7]", 
      "output": "[7,1,2,3,4,5,6]", 
      "explanation": "Rotate the array to the right by 1 step."
    },
    {
      "input": "[1,2,3,4,5,6,7]", 
      "output": "[6,7,1,2,3,4,5]", 
      "explanation": "Rotate the array to the right by 2 steps."
    },
    {
      "input": "[1,2,3,4,5,6,7]", 
      "output": "[5,6,7,1,2,3,4]", 
      "explanation": "Rotate the array to the right by 3 steps."
    }
  ],
  "testcases": [
    {
      "input": "[1,2,3,4,5]", 
      "output": "[4,5,1,2,3]"
    },
    {
      "input": "[1,2,3,4,5,6]", 
      "output": "[5,6,1,2,3,4]"
    },
    {
      "input": "[1,2,3,4,5,6,7,8]", 
      "output": "[6,7,8,1,2,3,4,5]"
    },
    {
      "input": "[1,2,3,4,5,6,7,8,9]", 
      "output": "[7,8,9,1,2,3,4,5,6]"
    },
    {
      "input": "[1,2,3,4,5,6,7,8,9,10]", 
      "output": "[8,9,10,1,2,3,4,5,6,7]"
    },
    {
      "input": "[1,2,3,4,5,6,7,8,9,10,11]", 
      "output": "[9,10,11,1,2,3,4,5,6,7,8]"
    },
    {
      "input": "[1,2,3,4,5,6,7,8,9,10,11,12]", 
      "output": "[10,11,12,1,2,3,4,5,6,7,8,9]"
    },
    {
      "input": "[1,2,3,4,5,6,7,8,9,10,11,12,13]", 
      "output": "[11,12,13,1,2,3,4,5,6,7,8,9,10]"
    },
    {
      "input": "[1,2,3,4,5,6,7,8,9,10,11,12,13,14]", 
      "output": "[12,13,14,1,2,3,4,5,6,7,8,9,10,11]"
    },
    {
      "input": "[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]", 
      "output": "[13,14,15,1,2,3,4,5,6,7,8,9,10,11,12]"
    }
  ],
  "constraints": [
    "1 <= nums.length <= 5 * 10^4",
    "1 <= k <= 10^5",
    "nums[i] is a 32-bit integer"
  ],
  "comments": [
    "The array will not be empty",
    "The array will not contain duplicate elements"
  ],
  "solutions": [
    {
      "language": "Python",
      "code": "def rotate(nums, k):\n    k = k % len(nums)\n    nums[:] = nums[-k:] + nums[:-k]\n    return nums"
    },
    {
      "language": "Java",
      "code": "public int[] rotate(int[] nums, int k) {\n    k = k % nums.length;\n    int[] res = new int[nums.length];\n    System.arraycopy(nums, nums.length - k, res, 0, k);\n    System.arraycopy(nums, 0, res, k, nums.length - k);\n    return res;\n}"
    }
  ]
*/
export async function createAndSaveProblem(prompt:string){
  try{
      const problem = await generateProblem(prompt);
      const savedProblem = await SaveProblem(problem);
      return savedProblem;
  }
  catch(err){
     console.error("Failed to create problem:", err);
    throw err;
  }
}
export async function SaveProblem(data: ProblemDescription) {
  try {
    console.log("here",data)
    const problem = await Prisma.problem.create({
      data: {
        problemName: data.problemName,
        topics: data.topics,
        difficulty: data.difficulty,
        description: data.description,
        returnformat: data.returnformat,
        examples: data.examples,
        testcases: data.testcases,
        constraints: data.constraints,
        comments: data.comments,
        solutions: data.solutions,
      },
    });
    return problem;
  } catch (error) {
    console.error("Failed to create problem:", error);
    throw error;
  }
}

export async function generateContest(prompts:string[]):Promise<ProblemDescription[]>{
  if(prompts.length===0){
    return [];
  }
  const problems = await Promise.all(prompts.map(p => generateProblem(p)));
  return problems;
}