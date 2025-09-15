'use client'
import {useSession, signOut} from "next-auth/react"
import { Button } from "@/components/ui/button";
export default function User(){
    const {data:session} = useSession();
    if(session){
        return(
            <div className="flex min-h-screen items-center justify-center ">
                <h1>Welcome, {session.user?.name}!</h1>
                <Button onClick={()=>signOut()} className="p-2 m-2 on hover:bg-amber-50 bg-white text-black">SignOut</Button>
           
        
    
            </div>
        )
    }
}