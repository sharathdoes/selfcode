'use server'
import prisma from "@/prisma/prisma";

export const submitFeedback=async({userId, anonymous,rating,feedback}:{userId:string, anonymous:boolean, rating:number, feedback:string})=>{
    if(!userId||!anonymous||!rating||!feedback) throw new Error("More Details is required");
    const feedbaresck =await prisma.feedback.create({
        data:{
            userId, anonymous, rating, feedback
        }
    })
    return feedbaresck;
}