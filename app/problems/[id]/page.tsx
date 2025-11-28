"use client";
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
export default function ProblemById({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = use(params);
  const [langIndex, setLangIndex] = useState(0);

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
  function formatValue(value: any): string {
    if (Array.isArray(value)) {
      return `[${value.map(formatValue).join(", ")}]`;
    }
    if (typeof value === "object" && value !== null) {
      return `{ ${Object.entries(value)
        .map(([k, v]) => `${k}: ${formatValue(v)}`)
        .join(", ")} }`;
    }
    return String(value);
  }

  useEffect(() => {
    const getsProblemById = async () => {
      const problemById = await getProblemById(id);
      setProblem(problemById);
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
                {/* Language Toggle */}
                <div className="flex gap-2 mb-2">
                  <button
                    onClick={() => setLangIndex(0)}
                    className={`px-3 py-1 rounded text-xs ${
                      langIndex === 0
                        ? "bg-blue-700"
                        : "bg-yellow-500 text-black"
                    }`}
                  >
                    Python
                  </button>

                  <button
                    onClick={() => setLangIndex(1)}
                    className={`px-3 py-1 rounded text-xs ${
                      langIndex === 1
                        ? "bg-blue-700"
                        : "bg-yellow-500 text-black"
                    }`}
                  >
                    Java
                  </button>
                </div>
                <pre className="bg-[#1e1e1e] text-gray-200 p-4 rounded-lg overflow-x-auto text-sm">
                  <code>{code[langIndex].code.replace(/\\n/g, "\n")}</code>
                </pre>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Hints</AccordionTrigger>

            <AccordionContent className="flex flex-col gap-4 text-balance">
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
            <Badge variant="default">{problem.difficulty}</Badge>
            <Badge variant="default">Companies</Badge>
            <Badge variant="default">Topics</Badge>
          </div>
        </div>
        <div className="flex flex-col  text-sm gap-2 p-6 border shadow-md">
          <p> Description : {problem.description}</p>
          <div className="flex flex-col gap-4">
            {problem.examples.map((ex, index) => (
              <div key={index}>
                <div>
                  <div>Example {index + 1}</div>
                </div>
                <div>
                  <blockquote className=" border-l-2 pl-4 gap-1 flex flex-col">
                    <div className="flex">
                      <span className="font-semibold">Input: </span>
                      <div className="ml-2 flex flex-wrap gap-2">
                        {Object.entries(ex.input).map(([key, value]) => (
                          <span key={key}>
                            {key}: {formatValue(value)}
                          </span>
                        ))}
                      </div>
                    </div>

                    <p> Output : {JSON.stringify(ex.output, null, 2)}</p>
                    <p> Explanation : {ex.explanation}</p>
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
          <Accordion
            type="multiple"
            className="w-full p-4  border shadow-md text-sm "
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="font-semibold">
                Topics
              </AccordionTrigger>
              <AccordionContent className="flex  gap-2 text-balance">
                {problem.topics.map((p) => {
                  return <Badge variant="default">{p}</Badge>;
                })}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex flex-col  border shadow-md gap-3 p-4">
            <h1 className="font-semibold">Submit Solution</h1>
            <div className="flex justify-center items-center">
              {" "}
              <button className="bg-yellow-400 py-1 px-2 text-black rounded-md">
                Submit
              </button>
            </div>
          </div>
          <div className="flex flex-col border shadow-md gap-3 p-4">
            <p className="font-semibold">Comment Here</p>
            <Textarea></Textarea>
            <button className="bg-yellow-400 py-1 px-2 text-black  rounded-md">
              Post
            </button>
          </div>
          <div className="flex flex-col border shadow-md gap-1 p-4">
            <span className="font-semibold"> Created By : </span>
            <div>
              {" "}
              <span className="font-semibold"> Name : </span>{" "}
              {problem.createdBy.name}
            </div>
            <p>
              {" "}
              <span className="font-semibold"> Email : </span> :{" "}
              {problem.createdBy.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
