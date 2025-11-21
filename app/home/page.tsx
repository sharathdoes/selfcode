'use client'
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Home(){
  const router = useRouter();
  return <div className="flex items-center justify-center min-h-screen">
    <Button onClick={()=>(router.push('/contest'))}>Create Contest</Button>
  </div>;
}