"use client";
import React, { useState } from "react";
import Execute from "@/utils/piston";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";
import { Button } from "@/components/ui/button";

export default function Cod() {
  const [code, setCode] = useState<string>("");
  const handleRun = async () => {
    const res = await Execute({ code:code, language: "cpp", version: "10.2.0" });
    console.log(res);
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
  <div className="w-[600px] flex flex-col items-center gap-4 p-6 rounded-5xl shadow-lg">
    <h1 className="text-xl font-semibold">Code Editor</h1>
      <CodeMirror
        value={code}
        height="500px"
        width="700px"
        className="rounded-xl"
        theme={vscodeDark}
        onChange={(value) => setCode(value ?? "")}
      />

    <Button className="p-4" onClick={handleRun}>Run</Button>
  </div>
</div>

  );
}
