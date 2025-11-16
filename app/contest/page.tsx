"use client";
import { useFieldArray, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Contest } from "@/utils/types";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

function Header({ step }: { step: number }) {
  return <div className="flex items-center justify-center">Step {step}</div>;
}

export default function CreateContest() {
  const [step, setStep] = useState(1);

  const topics = [
    "Array",
    "String",
    "Hash Table",
    "Math",
    "Dynamic Programming",
    "Sorting",
    "Greedy",
    "Depth-First Search",
    "Binary Search",
    "Matrix",
    "Tree",
    "Breadth-First Search",
    "Two Pointers",
    "Prefix Sum",
    "Heap ",
    "Graph",
    "Binary Tree",
    "Stack",
    "Sliding Window",
    "Linked List",
    "Segment Tree",
    "Monotonic Stack",
    "Trie",
    "Divide and Conquer",
    "Queue",
    "Recursion",
    "Memoization",
    "Hash Function",
    "Binary Search Tree",
    "Shortest Path",
    "String Matching",
    "Topological Sort",
  ];

  const { register, control, handleSubmit, watch, setValue } = useForm<Contest>(
    {
      defaultValues: {
        isPublic: "yes",
        emails: [],
        problemPrompts: [{ text: "" }],
      },
    }
  );

  const formData = watch();
  const emails = formData.emails || [];
  const isPublic = formData.isPublic || "yes";
  const selectedTopics = watch("topics") || [];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "problemPrompts",
  });

  const submitContest = (data: Contest) => {
    console.log("Contest Data: ", data);
  };

  const toggleTopic = (topic: string) => {
    if (selectedTopics.includes(topic)) {
      setValue(
        "topics",
        selectedTopics.filter((t: string) => t !== topic)
      );
    } else {
      setValue("topics", [...selectedTopics, topic]);
    }
  };

  const [emailInput, setEmailInput] = useState("");

  return (
    <div className="flex min-h-screen justify-center items-center p-2 ">
      <div className="w-full max-w-lg p-6 border shadow-lg rounded-md">
        <Header step={step} />

        <form onSubmit={handleSubmit(submitContest)}>
          {step === 1 && (
            <div className="space-y-4 mt-4">
              <div>Enter Contest Name : </div>
              <Input {...register("title")} />

              <div>Enter Contest Description : </div>
              <Textarea {...register("description")} />

              <div className="flex gap-2 items-center">
                <p>Difficulty :</p>
                <Select
                  onValueChange={(value) =>
                    setValue("difficulty", value as any)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-2 mt-4 gap-1 flex flex-wrap flex-row">
              {topics.map((topic) => {
                const isSelected = selectedTopics.includes(topic);

                return (
                  <Button
                    key={topic}
                    onClick={() => toggleTopic(topic)}
                    className={
                      isSelected
                        ? "bg-yellow-400 text-black border-b"
                        : "bg-gray-200 text-black"
                    }
                  >
                    {topic}{" "}
                  </Button>
                );
              })}{" "}
            </div>
          )}

          {step === 3 && (
            <div className="grid grid-cols-1 gap-4 mt-4">
              <div>
                <label className="text-sm font-medium">Start Time</label>
                <Input type="datetime-local" {...register("startTime")} />
              </div>

              <div>
                <label className="text-sm font-medium">End Time</label>
                <Input type="datetime-local" {...register("endTime")} />
              </div>

              <div>
                <label className="text-sm font-medium">Duration (mins)</label>
                <Input {...register("durationMinutes")} />
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="flex flex-col gap-2">
              <p>Problem Prompts</p>

              {fields.map((p, index) => (
                <div key={p.id} className="flex items-center gap-2">
                  <Textarea
                    placeholder={`Problem ${index + 1}`}
                    {...register(`problemPrompts.${index}.text`)}
                  />
                  <Trash onClick={() => remove(index)} />
                </div>
              ))}

              <div className="flex justify-center mt-2">
                <Plus onClick={() => append({ text: "" })} />
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              {" "}
              <p className="font-semibold mb-3">Review your details</p>{" "}
              <pre className="p-3 rounded text-sm whitespace-pre-wrap">
                {" "}
                {JSON.stringify(formData, null, 2)}
              </pre>{" "}
            </div>
          )}

          {step === 6 && (
            <div className="flex flex-col gap-4 mt-4">
              <p>Is your test public?</p>

              <RadioGroup
                value={isPublic}
                onValueChange={(v) => setValue("isPublic", v)}
                className="flex gap-6"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="yes" id="r1" />
                  <Label htmlFor="r1">Yes</Label>
                </div>

                <div className="flex items-center gap-3">
                  <RadioGroupItem value="no" id="r2" />
                  <Label htmlFor="r2">No</Label>
                </div>
              </RadioGroup>

              {/* Public */}
              {isPublic === "yes" && (
                <div className="p-3 border rounded">
                  <p className="font-semibold">Share Link</p>
                  <p className="mt-2">https://yourapp.com/contest/123</p>
                </div>
              )}

              {/* Private */}
              {isPublic === "no" && (
                <div className="flex flex-col gap-3">
                  <p className="font-semibold">Invite via Email</p>

                  <Input
                    placeholder="Enter email and press Enter"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        if (!emailInput.trim()) return;

                        setValue("emails", [...emails, emailInput.trim()]);
                        setEmailInput("");
                      }
                    }}
                  />

                  <div className="flex flex-wrap gap-2">
                    {emails.map((email, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 rounded-full flex items-center gap-2"
                      >
                        {email}
                        <Trash
                          size={16}
                          onClick={() => {
                            const arr = [...emails];
                            arr.splice(index, 1);
                            setValue("emails", arr);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Button type="submit" className="mt-4">
                Create Contest
              </Button>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button onClick={() => setStep(step - 1)} type="button">
              Prev
            </Button>
            <Button onClick={() => setStep(step + 1)} type="button">
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
