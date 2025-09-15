'use client';
import {useRouter} from 'next/navigation';
import { Button } from "@/components/ui/button";

export default function Home() {
    const router = useRouter();
  return (
    <div className="flex min-h-screen items-center justify-center ">
      <h1>hi wanna <Button onClick={()=>{router.push('/signin')}} className="p-2 m-2 on hover:bg-amber-50 bg-white text-black">SignIn</Button>? </h1>
    </div>
  );
}
