// app/signup/SignupForm.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

type SignupFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Props = {
  signupAction: (data: { name: string; email: string; password: string }) => Promise<any>;
};

export default function SignupForm({ signupAction }: Props) {
  const { register, handleSubmit } = useForm<SignupFormValues>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: SignupFormValues) => {
    setLoading(true);
    setError(null);

    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await signupAction({ name: data.name, email: data.email, password: data.password });
      router.push("/signin");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input {...register("name", { required: true })} />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" {...register("email", { required: true })} />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="password" {...register("password", { required: true })} />
        </div>
        <div>
          <Label>Confirm Password</Label>
          <Input type="password" {...register("confirmPassword", { required: true })} />
        </div>

        {error && <p className="text-red-500">{error}</p>}

        <Button type="submit" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </Button>
      </form>
    </div>
  );
}
