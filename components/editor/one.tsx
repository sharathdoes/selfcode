"use client";

import { useState } from "react";
import { ProblemDescription } from "@/utils/types";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export function One(problem: ProblemDescription) {
  const [page, setPage] = useState(0);

  return (
    <div className="flex flex-col h-full w-full p-6">
      {/* Header tabs */}
      <header className="flex w-full justify-around my-6 gap-4 text-sm font-medium">
        <p
          className={`cursor-pointer ${page === 0 ? "font-semibold" : "opacity-60"}`}
          onClick={() => setPage(0)}
        >
          Description
        </p>
        <p
          className={`cursor-pointer ${page === 1 ? "font-semibold" : "opacity-60"}`}
          onClick={() => setPage(1)}
        >
          Solutions
        </p>
        <p
          className={`cursor-pointer ${page === 2 ? "font-semibold" : "opacity-60"}`}
          onClick={() => setPage(2)}
        >
          Submissions
        </p>
        <p
          className={`cursor-pointer ${page === 3 ? "font-semibold" : "opacity-60"}`}
          onClick={() => setPage(3)}
        >
          Comments
        </p>
      </header>

      {/* Main content */}
      <section className="flex-1 overflow-y-auto">
        {/* ================================
                DESCRIPTION PAGE
        ================================= */}
        {page === 0 && (
          <ScrollArea className="h-full pr-4">
            <div className="flex flex-col gap-5">

              <h1 className="text-2xl font-semibold">{problem.problemName}</h1>

              <div className="flex gap-2 items-center">
                <Badge variant="default">{problem.difficulty}</Badge>

                {/* Topics */}
                <Popover>
                  <PopoverTrigger>
                    <Badge variant="secondary">Topics</Badge>
                  </PopoverTrigger>
                  <PopoverContent>
                    <div className="flex gap-2 flex-wrap">
                      {problem.topics.map((topic, i) => (
                        <Badge key={i} variant="outline">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>

              <p className="text-muted-foreground">{problem.description}</p>

              <p className="font-medium">
                Return Type: <span className="font-normal">{problem.returnformat}</span>
              </p>

              {/* Examples */}
              <div className="flex flex-col gap-4">
                {problem.examples.map((ex, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>Example {index + 1}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <blockquote className="border-l-2 pl-4 italic gap-1 flex flex-col">
                        <p><strong>Input:</strong> {ex.input}</p>
                        <p><strong>Output:</strong> {ex.output}</p>
                        <p><strong>Explanation:</strong> {ex.explanation}</p>
                      </blockquote>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Constraints */}
              <div>
                <h2 className="font-semibold mb-2">Constraints</h2>
                <ul className="list-disc ml-6 text-sm">
                  {problem.constraints.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>

              {/* Comments */}
              <div>
                <h2 className="font-semibold mb-2">Notes</h2>
                <ul className="list-disc ml-6 text-sm">
                  {problem.comments.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollArea>
        )}

        {/* ================================
                SOLUTIONS PAGE
        ================================= */}
        {page === 1 && (
          <ScrollArea className="h-full pr-4">
            <div className="flex flex-col gap-4">
              {problem.solutions.map((sol, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{sol.language} Solution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <pre className="bg-muted p-4 rounded-lg overflow-auto text-sm">
                      {sol.code}
                    </pre>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}

        {/* ================================
                SUBMISSIONS PAGE
                (you can later connect APIs)
        ================================= */}
        {page === 2 && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            No submissions yet.
          </div>
        )}

        {/* ================================
                COMMENTS PAGE
                (you can later add real comments)
        ================================= */}
        {page === 3 && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Comments coming soon…
          </div>
        )}
      </section>
    </div>
  );
}
