"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
type LoginFormValues = {
  email: string;
  password: string;
};

export default function CardDemo() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginFormValues>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: LoginFormValues) => {
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (!res?.error) {
      // force a full reload so the browser reads the new session cookie
      window.location.assign("/dashboard");
    } else {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/dashboard" });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>
            <div className="flex justify-between">
            <a>Login to your account</a>{" "}
            
            </div>
          </CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button
              onClick={() => (window.location.href = "/signup")}
            >
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="hello@example.com"
                className="bg-gray-100 text-black"
                {...register("email", { required: "Email is required" })}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                className="bg-gray-100 text-black"
                placeholder="qwerty"
                {...register("password", { required: "Password is required" })}
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex-col gap-2">
          <Button
            variant="outline"
            className="w-full"
            
            onClick={handleGoogleLogin}
          >
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
