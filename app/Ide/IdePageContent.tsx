"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Ide from "./compiler";
import Desc from "./description";
import Header from "@/components/Header";
import { Description } from "@/utils/types";

export default function IdePageContent() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  let problem: Description | null = null;

  try {
    if (!data) throw new Error("No data provided");

    let decoded = data;
    try {
      decoded = decodeURIComponent(data);
    } catch {
      // fallback in case already decoded
    }

    problem = JSON.parse(decoded);
    console.log("Decoded problem:", problem);
  } catch (err) {
    console.error("Failed to parse problem:", err);
    return <p className="text-center mt-20 text-red-400">Error parsing problem.</p>;
  }

  if (!problem) {
    return <p className="text-center mt-20 text-gray-400">Invalid problem data.</p>;
  }

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex">
        <div className="w-[50%] h-screen overflow-auto border-r border-gray-200">
          <Suspense fallback={<p className="text-center mt-20">Loading description...</p>}>
            <Desc problem={problem} />
          </Suspense>
        </div>
        <div className="w-[50%] h-screen overflow-auto">
          <Suspense fallback={<p className="text-center mt-20">Loading editor...</p>}>
            <Ide />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
