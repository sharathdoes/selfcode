'use client'
import {useState} from "react"
import {ProblemDescription} from "@/utils/types"
import { Badge } from "@/components/ui/badge"
export function One(data : ProblemDescription) {
    const [page, setPage]=useState(1);
  return (
    <div className="flex flex-col h-full items-center p-6">
      <header className="flex w-full justify-around my-8 gap-4 ">
        <p onClick={()=>setPage(0)}>Description</p>
        <p onClick={()=>setPage(1)}>Solution</p>
        <p onClick={()=>setPage(2)}>Submissions</p>
        <p onClick={()=>setPage(3)}> Comments</p>
      </header>

       <section>
        {page==0&&(
            <div className="flex flex-col gap-3">
                <h1>{data.problemName}</h1>
                <div className="flex gap-2">
                  <Badge variant="default">{data.difficulty}</Badge>
                  <Badge variant="secondary">Topics</Badge>
                </div>
                <div>{data.description}</div>
                <div>return type {data.returnformat}</div>
                {
                    data.examples.map((p, index)=>{
                        return (
                            <div className="flex flex-col">
                                <p>Example {index+1}</p>
                                <blockquote className="mt-6 border-l-2 pl-6 italic">
                                   <div className="flex flex-col gap-1">
                                        <p>Input : {p.input}</p>
                                        <p>output : {p.output}</p>
                                        <p>Explanation : {p.explanation}</p>
                                   </div>
                                    </blockquote>
                            </div>
                        )
                    })
                }
                


            </div>
        )}
        {page==1&&(
            <div>on page 2</div>
        )}
        {page==2&&(
            <div>on page 3</div>
        )}
        {page==3&&(
            <div>on page 4</div>
        )}
        </section> 
    </div>
  );
}