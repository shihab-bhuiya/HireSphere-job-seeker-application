"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, Input, Button } from "@heroui/react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const form = e.target;

    const credentials = {
      email: form.email.value,
      password: form.password.value,
    };
    console.log("Submitting sign-in:", credentials);

    try {
      const { data, error } = await authClient.signIn.email({
        email: credentials.email,
        password: credentials.password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message);
        setErrorMsg(error.message || "Sign in failed");
        console.log("Error:", error);
        return;
      } else {
        toast.success("Signed in successfully!" || data.message);
        router.push("/");
      }
    } catch (err) {
      setErrorMsg("Something went wrong" );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-zinc-900 to-black px-4">
      <Card className="w-full max-w-md p-6 bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
        
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-300">
            Sign in to your account
          </p>
        </div>

        <div className="h-px bg-white/10 my-4" />

        {errorMsg && (
          <p className="text-red-400 text-sm mb-3 text-center">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 flex flex-col">
          <label htmlFor="email" className="text-sm font-medium text-white/80 ">
            Email Address
          </label>
          <Input
            name="email"
            label="Email"
            type="email"
            startContent={<Mail size={18} />}
            variant="bordered"
            classNames={{ input: "text-white" }}
            required
          />

          <label htmlFor="password" className="text-sm font-medium text-white/80 ">
            Password
          </label>
          <Input
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            startContent={<Lock size={18} />}
            endContent={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
            variant="bordered"
            classNames={{ input: "text-white" }}
            required
          />

          <Button
            type="submit"
            className="w-full font-semibold"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-5">
          {"Don't have an account?"}{" "}
          <Link href="/signup" className="text-white font-semibold hover:underline">
            Register
          </Link>
        </p>
      </Card>
    </div>
  );
}