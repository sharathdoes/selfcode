"use client";

import { ProblemDescription } from "@/utils/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Three({ testcases }: ProblemDescription) {
  return (
    <div className="h-full w-full p-6">
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Test Cases</CardTitle>
        </CardHeader>

        <CardContent className="h-[80%]">
          <ScrollArea className="h-full">
            <div className="flex flex-col gap-4">
              {testcases.map((t, idx) => (
                <Card key={idx} className="border p-4">
                  <h3 className="font-medium">Testcase {idx + 1}</h3>
                  <div className="mt-2 text-sm flex flex-col gap-1">
                    <p>
                      <span className="font-semibold">Input:</span> {t.input}
                    </p>
                    <p>
                      <span className="font-semibold">Output:</span> {t.output}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
