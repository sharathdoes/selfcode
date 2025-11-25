"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { createAndSaveProblem } from "@/actions/pnc";
import { useSession } from "next-auth/react";
type Problem = {
  query: string;
};

//selfcode is about creating an ability so that people can create their problems and create their own friendly or real coding contests online, this helps developers who wants to learn dsa well and for anyone who want to create contests, say a teacher who wants to create a contest for his/her class or a group of friends who want to have a contest on a sunday, or a small quiz between participants of any event. selfcode helps them create. solve your problems by creating problems.
export default function CreateProblem() {
  const { register, handleSubmit } = useForm<Problem>();

  const { data: session, status } = useSession();
  // console.log(session?.user)
  const submitThis = async (data: Problem) => {
    try {
        if(session?.user.id){
            const response = await createAndSaveProblem({
                prompt: data.query,
                userId: session?.user.id,
            });
            if (response) {
                console.log(response);
            } else {
                console.error("Error generating problem:", response);
            }
        } 
      
    } catch (error) {
      console.error("Request failed:", error);
    }
  };
  return (
    <div className="flex min-h-screen  justify-center items-center">
      <form  className="w-2xl flex  flex-col gap-4 justify-center items-center " onSubmit={handleSubmit(submitThis)}>
        <Textarea className="max-w-2xl " {...register("query")}></Textarea>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
