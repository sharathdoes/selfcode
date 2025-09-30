"use client";
import { toast } from "sonner"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { submitFeedback } from "@/app/actions/feedback";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
type feedbackForm = {
  anonymous: boolean;
  rating: number;
  feedback: string;
};
export default function Feedback() {
  const { register, handleSubmit } = useForm<feedbackForm>();
  const [rating, setRating] = useState<number>(0);
  const ratings = [1, 2, 3, 4, 5];
  const submitF = async (data: feedbackForm) => {
    const res = await submitFeedback({
      userId: "cmfl9s2l50005l24gyacxm0u6",
      anonymous: data.anonymous,
      rating: rating,
      feedback: data.feedback,
    });
    if (res) toast.success("Feedback submitted successfully");
    else toast.error("Error submitting feedback");
  };
  return (
    <div className="flex flex-col bg-[#0a0a0a] justify-center items-center h-screen ">
        <div className="w-full max-w-lg items-center justify-center  flex flex-col py-12   rounded-lg shadow-2xl ">
        <div className="text-3xl mr-4">We value your feedback</div>
      <form  className="flex flex-col "onSubmit={handleSubmit(submitF)}>
        <div className="flex gap-4 items-center my-4">
         <p>Rating:</p>
          {ratings.map((r) => {
            return (
                 <Button
                key={r}
                type="button"
                onClick={() => setRating(r)}
                className={`rounded-full px-4 py-2 transition 
                  ${rating === r ? "border-2 border-blue-500 bg-blue-900/40" : "border border-gray-600"}
                `}
              >
                {r}
              </Button>
            )
            
          })}
        </div>
        <p>Feedback:</p>
        <div className="flex  rounded-lg">
            
        <Textarea
          className="size-90 focus-within:outline-2 focus-within:outline-gray-600 shadow-2xl  bg-[#151515] outline-none mt-4"
          placeholder="please share your thoughts"
          {...register("feedback")}
        ></Textarea></div>
        <div className="flex  my-2 items-center gap-2 text-md"> 
            <p>would you like to be anonymous?</p>
        <input type="checkbox" {...register("anonymous")}></input>
        </div>
        
        <Button type="submit" className="mt-4">Submit</Button>
      </form>
        </div>
      
    </div>
  );
}
