'use client'
import {useEffect , useState} from "react"
import { useSession } from "next-auth/react";
import {ProblemDescription} from "@/utils/types"
import { getMyProblems} from "@/actions/userprofile"
export default function Profile(){
    const { data: session, status } = useSession();
    const [problems, setProblems]=useState<ProblemDescription[]>([]);
    useEffect(()=>{

        if (!session?.user?.id) return; 
            
        const getProblems=async()=>{
            console.log('hey')
            const problems= await getMyProblems({id :session?.user.id});
            setProblems(problems);
        }
        getProblems();
    },  [session?.user?.id]) 
    return (
        <div>
            <p>{session?.user.name}</p>
            {
                problems.map((p)=>{
                    return(
                        <div>{p.difficulty}</div>
                    )
                })
            }
        </div>
    )
}