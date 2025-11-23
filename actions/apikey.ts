
import prisma from "@/prisma/prisma";
type paramaters={
    email:string
    apikey:string
}


export async function SetGroq({email, apikey }:paramaters ){
    if(!email) throw new Error("Email is required");
    try{
        const updateUser=await prisma.user.update({
        where:{email:email},
        data:{
            groqkey:apikey        }
    })
    return updateUser;
    }catch(err){
        console.log(err);
        throw new Error("Failed to set Groq key", {cause:err});
    }
}