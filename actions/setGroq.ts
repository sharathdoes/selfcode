
import prisma from "@/prisma/prisma";

export async function SetGroq({email, apikey , model}: {email:string, apikey:string, model:string}){
    if(!email) throw new Error("Email is required");
    try{
        const updateUser=await prisma.user.update({
        where:{email:email},
        data:{
            groqkey:apikey,
            selectedModel:model
        }
    })
    return updateUser;
    }catch(err){
        console.log(err);
        throw new Error("Failed to set Groq key", {cause:err});
    }
}