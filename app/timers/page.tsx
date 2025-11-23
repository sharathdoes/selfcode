"use client";

import { useEffect, useState } from "react";
import {Button} from "@/components/ui/button"

export default function Timer(){
    const EXAM=60;
    const [timeLeft, setTimeLeft]=useState(0); 
    const [isOver, setIsOver]=useState(false);
    const [isStarted, setIsStarted]=useState(false);
    const [message, setMessage]= useState<string | null>(null);
    const [isRestored, setIsRestored]=useState(false);
    useEffect(()=>{
        const timeStored=localStorage.getItem("exam_end_time");
        if (!timeStored) return;

        const remaining = Math.floor((+timeStored-Date.now())/1000);
        if(remaining<0){
            localStorage.removeItem("exam_end_time");
            setIsOver(true);
            setTimeLeft(0);
        } else {
            setIsStarted(true);
            setTimeLeft(remaining);
        }
        setIsRestored(true);
    }, []);

    useEffect(()=>{
        if (!isRestored || !isStarted || isOver) return;

        if(timeLeft<=0){
            setIsOver(true);
            setMessage("its over damn it");
            localStorage.removeItem("exam_end_time"); 
            return;
        }
        const interval=setInterval(()=>{
            setTimeLeft((prev) => {
            if (prev <= 1) {
                clearInterval(interval);
                setIsOver(true);
                localStorage.removeItem("exam_end_time");
                setMessage("It's over damn it");
                return 0;
            }
            return prev - 1;
    });
        },1000);

        return () => clearInterval(interval)
    }, [ isOver, isRestored, isStarted]);
    
    const resetExam=()=>{
        localStorage.removeItem("exam_end_time");
        setTimeLeft(0);
        setIsOver(false);
        setIsStarted(false);
    }

    const startExam=()=>{
        const endTime=Date.now()+EXAM*1000;
        localStorage.setItem("exam_end_time", endTime.toString());
        setIsStarted(true);
        setTimeLeft(EXAM)
        setMessage("Exam Began")
    }

    return (    
        <div className="justify-center min-h-screen flex flex-col gap-2 items-center">
            <h1 >Timer Page </h1>
                {timeLeft>0 &&<p>{timeLeft}</p>}
                {message}
                {!isStarted && <Button onClick={()=>{startExam()}}>Start Exam</Button>}
                <Button onClick={()=>{resetExam()}}>Reset exam</Button>
        </div>
    )
}