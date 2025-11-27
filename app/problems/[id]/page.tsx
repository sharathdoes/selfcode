"use client";
"@/components/ui/resizable";

import { use } from "react";
import { ProblemDescription } from "@/utils/types";
import { useState, useEffect } from "react";
import { getProblemById } from "@/actions/pnc";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Textarea } from "@/components/ui/textarea";

import type { BundledLanguage } from "@/components/ui/shadcn-io/code-block";
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockCopyButton,
  CodeBlockFilename,
  CodeBlockFiles,
  CodeBlockHeader,
  CodeBlockItem,
  CodeBlockSelect,
  CodeBlockSelectContent,
  CodeBlockSelectItem,
  CodeBlockSelectTrigger,
  CodeBlockSelectValue,
} from "@/components/ui/shadcn-io/code-block";
import { Button } from "@/components/ui/button";

export default function ProblemById({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = use(params);
  const [problem, setProblem] = useState<ProblemDescription>({
    id: "",
    problemName: "",
    topics: [],
    difficulty: "",
    description: "",
    returnformat: "",
    examples: [],
    testcases: [],
    constraints: [],
    comments: [],
    solutions: [],
    createdBy: {
      id: "",
      name: "",
      email: "",
    },
    createdAt: new Date(),
  });

  useEffect(() => {
    const getsProblemById = async () => {
      const problemById = await getProblemById(id);
      setProblem(problemById);
      console.log("hey", problemById.solutions);
    };
    getsProblemById();
  }, []);

  const code = [
    {
      language: "python",
      code: problem.solutions[0]?.code ?? "",
    },
    {
      language: "java",
      code: problem.solutions[1]?.code ?? "",
    },
  ];
  return (
    <div className=" flex  gap-2 p-2 w-full  justify-center min-h-screen ">
      <div className="w-[30%]">
        <Accordion type="multiple" className="w-full  p-4 text-sm  ">
          <AccordionItem className="w-full max-w-md" value="item-1">
            <AccordionTrigger>Solution</AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 text-balance">
             <div className="relative w-full">
    <button
      className="absolute right-2 top-2 text-xs bg-gray-800 text-white px-2 py-1 rounded"
      onClick={() => navigator.clipboard.writeText(code[0].code)}
    >
      Copy
    </button>

    <pre className="bg-[#1e1e1e] text-gray-200 p-4 rounded-lg overflow-x-auto text-sm">
      <code>{code[0].code}</code>
    </pre>
  </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Discussions</AccordionTrigger>

            <AccordionContent className="flex flex-col gap-4 text-balance">
              <Textarea></Textarea>
              <div className="flex flex-col gap-4">
                {problem.comments.map((ex, index) => (
                  <div key={index}>
                    <div>
                      <blockquote className=" border-l-2 pl-4 gap-1 flex flex-col">
                        <p> {ex}</p>
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex flex-col w-[40%]  gap-4  ">
        {/* problem info - title and tags  */}
        <div className="flex flex-col  gap-2 p-6 border shadow-md">
          <h1 className="font-bold text-xl">{problem.problemName}</h1>
          <div className="flex gap-3">
            <Badge variant="outline">{problem.difficulty}</Badge>
            <Badge variant="outline">Companies</Badge>
            <Badge variant="outline">Topics</Badge>
          </div>
        </div>
        <div className="flex flex-col  text-sm gap-2 p-6 border shadow-md">
          <p>{problem.description}</p>
          <div className="flex flex-col gap-4">
            {problem.examples.map((ex, index) => (
              <div key={index}>
                <div>
                  <div>Example {index + 1}</div>
                </div>
                <div>
                  <blockquote className=" border-l-2 pl-4 gap-1 flex flex-col">
                    <p>Input: {ex.input}</p>
                    <p>Output: {ex.output}</p>
                    <p>Explanation: {ex.explanation}</p>
                  </blockquote>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col  text-sm gap-2 p-6 border shadow-md">
          {/* <p>Return Format : {problem.returnformat}</p> */}
          <p>Constraints</p>
          <ul className="list-disc ml-6 text-sm">
            {problem.constraints.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className=" flex flex-col w-[30%]">
        <div className="flex flex-col gap-2">
          <Accordion type="multiple" className="w-full p-4  border shadow-md text-sm ">
          <AccordionItem value="item-1">
            <AccordionTrigger>Topics</AccordionTrigger>
            <AccordionContent className="flex  gap-2 text-balance">
              {
                problem.topics.map((p)=>{
                  return (
                    <Badge variant="default">{p}</Badge>
                  )
                })
              }
            </AccordionContent>
          </AccordionItem>
          
        </Accordion>
              
        <div className="flex flex-col  border shadow-md gap-3 p-4">
              <h1>Submit Solution</h1>
              <div className="flex justify-center items-center">               <button className="bg-yellow-400 py-1 px-2 text-black rounded-md">Submit</button>
</div>

        </div>
        <div className="flex flex-col  border shadow-md gap-3 p-4">
  Input format
</div>
        </div>
      </div>
    </div>
  );
}
