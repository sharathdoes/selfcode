"use client";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { use } from "react";
import { ProblemDescription } from "@/utils/types";
import { useState, useEffect } from "react";
import { getProblemById } from "@/actions/pnc";

import {One } from "@/components/editor/one"
import Two  from "@/components/editor/two"
export default function ProblemById({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  
 



 function Three() {
  return (
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">
        {problem.returnformat}
        </span>
    </div>
  );
}
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
    };
    getsProblemById();
  }, []);
  return (
    <div className="h-screen ">
      {/* <h1>Problem ID: {id}</h1> */}
      <ResizablePanelGroup
        direction="horizontal"
        className=" rounded-lg border"
      >
        <ResizablePanel defaultSize={50}>
          <One {...problem} />
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={25}>
              <Two />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={75}>
              <Three />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}


