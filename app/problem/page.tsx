"use client";

import { useEffect, useState } from "react";
import {Button} from "@/components/ui/button"
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {createAndSaveProblem} from "@/actions/pnc"
type Problem ={
    query:string
}
export default function CreateProblem(){
    const { register, handleSubmit }=useForm<Problem>();


    const submitThis= async(data : Problem)=>{
        try{
            const response= await createAndSaveProblem(data.query);
                if (response) {
                    console.log(response)
                } else {
                console.error("Error generating problem:", response);
            } 
        }
        catch (error) {
            console.error("Request failed:", error);
        }
        
    }
    return(
        <div className='flex min-h-screen justify-center items-center'>
            <form onSubmit={handleSubmit(submitThis)}>
            <Textarea {...register("query")} ></Textarea>
            <Button type="submit">Submit</Button>
            </form>
        </div>
    )
}