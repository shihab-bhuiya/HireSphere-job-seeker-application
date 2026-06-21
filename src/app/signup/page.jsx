"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, Input, Button } from "@heroui/react";
import { Description, Label, Radio, RadioGroup } from "@heroui/react";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { router } from "better-auth/api";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/';


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const form = e.target;

    const userData = {
      name: form.name.value,
      email: form.email.value,
      role: form.role.value,
      password: form.password.value,
    };
    console.log("Submitting:", userData);
    const plan = userData.role === 'seeker' ? 'seeker_free' : 'recruiter_free';

    try {
      const { data, error } = await authClient.signUp.email({
        name: userData.name,
        email: userData.email,
        role: userData.role,
        plan: plan,
        password: userData.password,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message)
        setErrorMsg(error.message || "Signup failed");
        console.log("Error:", error);
        return;
      }
      else {
        toast.success(data.message);
        console.log(data.message);

        router.push(redirectTo);
      }
    } catch (err) {
      setErrorMsg("Something went wrong");
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
            Create Account
          </h1>
          <p className="text-sm text-gray-300">
            Register to continue
          </p>
        </div>

        <div className="h-px bg-white/10 my-4" />

        {errorMsg && (
          <p className="text-red-400 text-sm mb-3 text-center">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5 flex flex-col">
          <label htmlFor="name">Full Name</label>
          <Input
            name="name"
            label="Full Name"
            startContent={<User size={18} />}
            variant="bordered"
            classNames={{ input: "text-white" }}
            required
          />
          <label htmlFor="email">Email Address</label>

          <Input
            name="email"
            label="Email"
            startContent={<Mail size={18} />}
            variant="bordered"
            classNames={{ input: "text-white" }}
            required
          />

          <label htmlFor="password">Password</label>
          <Input
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            startContent={<Lock size={18} />}
            endContent={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
            variant="bordered"
            classNames={{ input: "text-white" }}
            required
          />
          {/* Role Selection */}
          <div className="flex flex-col gap-4">
            <Label>Subscription plan</Label>
            <RadioGroup defaultValue="seeker" name="role" orientation="horizontal">
              <Radio value="seeker">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Job Seeker</Label>

                </Radio.Content>
              </Radio>
              <Radio value="recruiter">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                <Radio.Content>
                  <Label>Recruiter</Label>

                </Radio.Content>
              </Radio>

            </RadioGroup>
          </div>



          <Button
            type="submit"
            className="w-full font-semibold"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Register"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-300 mt-5">
          Already have an account?{" "}
          <Link href={`/signin?redirect=${redirectTo}`} className="text-white font-semibold">
            SignIn
          </Link>
        </p>
      </Card>
    </div>
  );
}