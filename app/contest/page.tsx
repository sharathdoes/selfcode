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
import {generateContest} from '../../actions/pnc';
function Header({ step }: { step: number }) {
  return <div className="flex items-center justify-center">Step {step} of 6</div>;
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

  const { register, control, handleSubmit, watch, setValue, trigger,   formState: { errors } } = useForm<Contest>(
    {
      defaultValues: {
        isPublic: "no",
        emails: [""],
        problemPrompts: [{ text: "" }],
      },
    }
  );


  const validate = async (step: number) => {
    if (step === 1) {
      return await trigger(["title", "description", "difficulty"]);
    }

    if (step === 2) {
      const selectedTopics = watch("topics") || [];
      return selectedTopics.length > 0;
    }

    if (step === 3) {
      return await trigger(["startTime", "endTime", "durationMinutes"]);
    }

    if (step === 4) {
      const prompts = watch("problemPrompts") || [];
      return prompts.every((p) => p.text.trim() !== "");
    }

    if (step === 6) {
      const isPublic = watch("isPublic");
      if (isPublic === "no") {
        const emails = watch("emails") || [];
        return emails.length > 0;
      }
      return true;
    }

    return true;
  };

  async function NextStep(step:number){
    const ok =await validate(step);

    if(!ok){
      if(step === 4) { alert("Please ensure all problem prompts are filled out."); }
    return;}
    setStep(step + 1);
  }
  const [prob, setProb] = useState<any>([]);
  const formData = watch();
  const emails = formData.emails || [];
  const isPublic = formData.isPublic || "yes";
  const selectedTopics = watch("topics") || [];

  const { fields, append, remove } = useFieldArray({
    control,
    name: "problemPrompts",
  });

const submitContest = async (data: Contest) => {
  console.log("Contest Data: ", data);

  try {
    // CALL your Groq AI problem generator (await is IMPORTANT)
    const generated = await generateContest(
      data.problemPrompts.map((p) => p.text)
    );
    const parsed = generated.map((p) => (typeof p === "string" ? JSON.parse(p) : p));

    setProb(parsed); // UPDATE UI
    console.log("Generated Problems: ", parsed);
  } catch (err) {
    console.error("Error generating contest problems:", err);
  }
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

<form onSubmit={handleSubmit(() => step === 6 && submitContest(formData))}>
          {step === 1 && (
            <div className="space-y-4 mt-4">
              <div>Enter Contest Name : </div>
              <Input {...register("title", {required:"we need a title"})} />
              { errors.title && <p className="text-red-500">Title is required</p>}

              <div>Enter Contest Description : </div>
              <Textarea {...register("description", {required:"We need a Description"})} />
              { errors.description && <p className="text-red-500">Description is required</p>}
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
              { errors.difficulty && <p className="text-red-500">Difficulty is required</p>}
            </div>

          )
          
        }

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
                        ? "bg-yellow-400  rounded-2xl text-black border-b"
                        : "bg-gray-200 rounded-2xl text-black"
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
                <Input type="datetime-local" {...register("startTime", {required : "please enter start time"})} />
                {errors.startTime && <p className="text-red-500">Start Time is required</p>}
              </div>

              <div>
                <label className="text-sm font-medium">End Time</label>
                <Input type="datetime-local" {...register("endTime", {required : "please enter end time"})} />
                {errors.endTime && <p className="text-red-500">End Time is required</p>}
              </div>

              <div>
                <label className="text-sm font-medium">Duration (mins)</label>
                <Input {...register("durationMinutes", {required : "please enter duration"})} />
                {errors.durationMinutes && <p className="text-red-500">Duration is required</p>}
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
                    {...register(`problemPrompts.${index}.text`, {required: "Problem prompt cannot be empty"})}
                  />
                  
                  <Trash onClick={() => remove(index)} />
                </div>
              ))}

              <div className="flex justify-center mt-2">
                <Plus onClick={() => append({ text: "" })} />
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              {" "}
              <p className="font-semibold mb-3">Review your details</p>{" "}
              <pre className="p-3 rounded text-sm whitespace-pre-wrap">
                {" "}
                {JSON.stringify(formData, null, 2)}
              </pre>{" "}
              <div className="flex justify-end">
                <Button type="submit" className="  mt-4">
                Create Contest
              </Button>
              </div>
              
            </div>
          )}

          {step === 5 && (
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

              
            </div>
          )}

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={() => setStep(step - 1)} disabled={step === 1} >
              Prev
            </Button>
            <Button onClick={()=>{NextStep(step)}} disabled={step === 6} >
              Next
            </Button>
          </div>
        </form>
        
      {prob && <div className="mt-4 p-4 border rounded">
          <h2 className="text-lg font-semibold mb-2">Generated Problems:</h2>
          <pre className="whitespace-pre-wrap">{JSON.stringify(prob, null, 2)}</pre>
        </div>}
      </div>
    </div>
  );
}
