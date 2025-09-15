"use client";

import { signIn } from "next-auth/react";
async function loginWithCredentials(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const res = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (res?.error) {
    throw new Error("Invalid credentials"); // next/form will handle this
  }

  // Redirect manually
  if (res?.ok) {
    // @ts-ignore
    window.location.href = "/dashboard"; // optional, next/form can't redirect automatically
  }
}

async function loginWithGoogle() {
  await signIn("google", { callbackUrl: "/dashboard" });
}
export { loginWithCredentials, loginWithGoogle };