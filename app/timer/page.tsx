"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function Timer() {
  const EXAM = 60; 
  const [timeLeft, setTimeLeft] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isRestored, setIsRestored] = useState(false); 

  useEffect(() => {
    const stored = localStorage.getItem("exam_end_time");

    if (stored) {
      const remaining = Math.floor((+stored - Date.now()) / 1000);

      if (remaining > 0) {
        setIsStarted(true);
        setTimeLeft(remaining);
      } else {
        localStorage.removeItem("exam_end_time");
        setIsOver(true);
        setTimeLeft(0);
      }
    }

    setIsRestored(true); 
  }, []);

  useEffect(() => {
    if (!isRestored) return;

        if (!isStarted) return;

    if (timeLeft <= 0) {
      setIsOver(true);
      setMessage("its over damn it");
      localStorage.removeItem("exam_end_time");
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, isStarted, isRestored]);

  const startExam = () => {
    const end = Date.now() + EXAM * 1000;
    localStorage.setItem("exam_end_time", end.toString());
    setIsStarted(true);
    setIsOver(false);
    setMessage("Exam started");
    setTimeLeft(EXAM);
  };

  const resetExam = () => {
    localStorage.removeItem("exam_end_time");
    setTimeLeft(0);
    setIsStarted(false);
    setIsOver(false);
    setMessage(null);
  };

  return (
    <div className="justify-center min-h-screen flex flex-col items-center">
      <h1>Timer Page</h1>

      {isStarted && !isOver && <p>{timeLeft}</p>}

      {message && <p>{message}</p>}

      {!isStarted && !isOver && (
        <Button onClick={startExam}>Start Exam</Button>
      )}

      <Button onClick={resetExam}>Reset Exam</Button>

      {isOver && <p className="text-red-500">Exam Over</p>}
    </div>
  );
}
