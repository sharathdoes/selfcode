"use client";
import React, { useState } from "react";
import Execute from "@/app/utils/piston";
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
    <div className="flex h-screen flex-col">
      <h1>Code Editor</h1>
      <div> <CodeMirror
        value={code}
        height="400px"
        theme={vscodeDark}
        onChange={(value) => setCode(value ?? "")}
      />
      <Button  className=""onClick={handleRun}>Run</Button></div>
      
    </div>
  );
}
