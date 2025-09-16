'use client'
import {useRouter} from 'next/navigation';
import {useSession} from 'next-auth/react'
import {useEffect} from 'react'
import {signOut} from 'next-auth/react'
import { Button } from '@/components/ui/button';
type props={
  username:string | null | undefined;
}
function Welcome(data : props){
  return(
    <div>Welcome {data.username}</div>
  )
}

export default function User(){
  const router=useRouter();
  const {data : session, status}=useSession();

 useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }
    return (
      <div>
        <Welcome username={session?.user?.name} />
        <Button onClick={()=>{signOut()}}>SignOut</Button>
      </div>
    )
  
}