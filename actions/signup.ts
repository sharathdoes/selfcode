import prisma from "@/prisma/prisma";
import bcrypt from "bcryptjs";

export async function signup({ name, email, password }: { name: string; email: string; password: string }) {
   "use server";
   if (!name || !email || !password) {
    throw new Error("Missing fields");
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: { name, email, password: hashedPassword },
  });

  return user;
}
