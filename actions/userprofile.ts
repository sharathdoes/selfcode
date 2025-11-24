"use server";
import prisma from "@/prisma/prisma"
export const getMyProblems=async({ id }: { id: string})=>{
    try{
        if (!id) return [];
        return await prisma.problem.findMany({
            where: { createdById: id },
            include: {
            createdBy: {
                select: {
                id: true,
                name: true,
                email: true,
                }
            }
    }
  });
    }
    catch(err){
        console.log(err);
        throw err;
    }
}