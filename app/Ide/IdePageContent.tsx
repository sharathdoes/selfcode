// app/Ide/IdePageContent.tsx
"use client";

import Ide from "./compiler";
import Desc from "./description";
import { useSearchParams } from "next/navigation";
import { Description } from "@/utils/types";
import Header from "@/components/Header";
import { Suspense } from "react";

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
      decoded = data;
    }

    problem = JSON.parse(decoded);
    console.log(problem);
  } catch (err) {
    console.error("Failed to parse problem:", err);
    return <p>Error parsing problem.</p>;
  }

  if (!problem) {
    return (
      <p className="text-center mt-20 text-gray-400">Invalid problem data.</p>
    );
  }

  return (
    <div className="flex flex-col">
      <Header />
      <div className="flex">
        <div className="w-[50%] h-screen">
          <Suspense fallback={<p>Loading description...</p>}>
            <Desc problem={problem} />
          </Suspense>
        </div>
        <div className="w-[50%] h-screen">
          <Suspense fallback={<a>Loading editor...</a>}>
            <Ide />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
