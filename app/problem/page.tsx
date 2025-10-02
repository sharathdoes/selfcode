"use client";
import { useSearchParams } from "next/navigation";
import { Description } from "@/utils/types";
import React from "react";
export default function ProblemPage() {
  const searchParams = useSearchParams();
  const data = searchParams.get("data");

  if (!data) {
    return <p className="text-center mt-20 text-gray-400">No problem provided.</p>;
  }

  let problem: Description | null = null;
  try {
    problem = JSON.parse(decodeURIComponent(data));
  } catch (err) {
    console.error("Failed to parse problem:", err);
    return <p>Error parsing problem.</p>;
  }

  if (!problem) {
    return <p className="text-center mt-20 text-gray-400">Invalid problem data.</p>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-[#151515] rounded-xl p-8 shadow-2xl border border-gray-800">
          <h2 className="text-3xl font-bold mb-3">{problem.problemName}</h2>

          <div className="flex flex-wrap gap-2 mb-3">
            {problem.topics.map((topic, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-blue-600 rounded-full text-sm"
              >
                {topic}
              </span>
            ))}
          </div>

          {/* Difficulty */}
          <span
            className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
              problem.difficult === "Easy"
                ? "bg-green-600"
                : problem.difficult === "Medium"
                ? "bg-yellow-600"
                : "bg-red-600"
            }`}
          >
            {problem.difficult}
          </span>

          {/* Description */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-300">{problem.description}</p>
            <p className="text-gray-400 mt-2">
              <strong>Return Format:</strong> {problem.returnformat}
            </p>
          </div>

          {/* Examples */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Examples</h3>
            {problem.examples.map((example, idx) => (
              <div key={idx} className="bg-[#0d0d0d] rounded-lg p-4 mb-3">
                <p className="font-semibold text-blue-400 mb-2">
                  Example {idx + 1}
                </p>
                <div className="space-y-1 text-sm">
                  <p>
                    <strong className="text-gray-400">Input:</strong>{" "}
                    <code className="bg-black px-2 py-1 rounded">
                      {example.input}
                    </code>
                  </p>
                  <p>
                    <strong className="text-gray-400">Output:</strong>{" "}
                    <code className="bg-black px-2 py-1 rounded">
                      {example.output}
                    </code>
                  </p>
                  <p className="text-gray-300">
                    <strong className="text-gray-400">Explanation:</strong>{" "}
                    {example.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Constraints */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-2">Constraints</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">
              {problem.constraints.map((constraint, idx) => (
                <li key={idx}>{constraint}</li>
              ))}
            </ul>
          </div>

          {/* Comments / Hints */}
          {problem.Comments && problem.Comments.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-2">Hints</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-300">
                {problem.Comments.map((comment, idx) => (
                  <li key={idx}>{comment}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Solutions */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Solutions</h3>
            {problem.Solutions.map((solution, idx) => (
              <div key={idx} className="mb-4">
                <p className="font-semibold text-green-400 mb-2">
                  {solution.language}
                </p>
                <pre className="bg-[#0d0d0d] rounded-lg p-4 overflow-x-auto">
                  <code className="text-sm text-gray-300">{solution.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
