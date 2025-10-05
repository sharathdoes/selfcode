'use client';
import {useRouter} from 'next/navigation';
import { Button } from "@/components/ui/button";
import {useSession} from 'next-auth/react'
import { useEffect } from 'react';
export default function Home() {
  const {data :session, status}=useSession();
  const router = useRouter();

  useEffect(()=>{
    if(status==="authenticated"){
        router.push('/home');
    }
  },[status]);
        if(status==="loading"){
        return( <div>Loading...</div>)
      }

  return (
    <div className="flex min-h-screen items-center justify-center ">
      <h1>hi wanna <Button onClick={()=>{router.push('/signin')}} className="p-2 m-2 on hover:bg-amber-50 bg-white text-black">SignIn</Button>? </h1>
    </div>
  );
}
