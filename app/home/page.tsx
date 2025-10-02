"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { generateProblem } from "@/actions/groq";
import { Description } from "@/utils/types";
import { useRouter } from "next/navigation";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const Groqcalls = async (data: any) => {
    setLoading(true);
    try {
      const res = await generateProblem(data.prompt);
      const parsedProblem: Description = typeof res === "string" ? JSON.parse(res) : res;
      const encoded = encodeURIComponent(JSON.stringify(parsedProblem));
      router.push(`/problem?data=${encoded}`);
    } catch (error) {
      console.error("Error generating problem:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Problem Generator</h1>
        <div className="flex flex-col gap-8">
          <div className="flex items-center justify-center">
            <div className="flex flex-col gap-4 w-full max-w-2xl">
              <Textarea
                placeholder="Enter your problem idea..."
                className="w-full rounded-xl h-32 bg-[#151515] border shadow-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register("prompt")}
              />
              <Button
                onClick={handleSubmit(Groqcalls)}
                className="rounded-lg p-2 bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate Problem"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
