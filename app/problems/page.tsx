'use client'
import {useState, useEffect } from 'react'
import { useRouter} from "next/navigation"
import {ProblemDescription} from '@/utils/types'
import {getAllProblems} from "@/actions/pnc"
export default function ProblemsPage (){
    const [problems, setProblems]=useState<ProblemDescription[]>([]);
    useEffect(()=>{
        const handleGetAllProblems=async()=>{
            const problems=await getAllProblems();
            setProblems(problems);
        }
        handleGetAllProblems();
    }, [])
    return (
        <div className="flex justify-center items-center min-h-screen">
            {
                problems.map((p)=>{
                    return (
                        <div>{p.difficulty}</div>
                    )
                })
            }
        </div>
    )
}