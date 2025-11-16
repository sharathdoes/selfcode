"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Home() {
  const [step, setStep] = useState(0);

  const steps = [
    <StepOne key="1" />,
    <StepTwo key="2" />,
    <StepThree key="3" />,
  ];

  const next = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prev = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className=" rounded-2xl shadow-xl p-6 w-full max-w-md">
        
        {/* progress */}
        <header className="mb-4 text-center font-semibold">
          Step {step + 1} of {steps.length}
        </header>

        {/* actual step */}
        <div className="mb-6">{steps[step]}</div>

        {/* buttons */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prev} disabled={step === 0}>
            Previous
          </Button>
          <Button onClick={next} disabled={step === steps.length - 1}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

function StepOne() {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">Name</label>
      <Input placeholder="Your name" />
    </div>
  );
}

function StepTwo() {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">About you</label>
      <Textarea placeholder="Write something..." />
    </div>
  );
}

function StepThree() {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium">Email</label>
      <Input placeholder="Your email" />
    </div>
  );
}
