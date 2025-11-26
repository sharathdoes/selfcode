"use client";
import React, { useState } from "react";
import Execute from "@/utils/piston";
import CodeMirror from "@uiw/react-codemirror";
import { vscodeDark } from "@uiw/codemirror-theme-vscode";

export default function Two() {
  const [code, setCode] = useState<string>("");

  const handleRun = async () => {
    const res = await Execute({
      code: code,
      language: "cpp",
      version: "10.2.0",
    });
    console.log(res);
  };

  return (
    <div className=" bg-[#1e1e1e] h-full w-full">   {/* FULL SPACE */}
      <CodeMirror
        value={code}
        height="00%"     // <-- IMPORTANT
        width="100%"      // <-- IMPORTANT
        theme={vscodeDark}
        className="rounded-xl "  // optional
        onChange={(value) => setCode(value ?? "")}
      />
    </div>
  );
}
