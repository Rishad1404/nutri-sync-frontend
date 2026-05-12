"use client";

import InputField from "@/components/global/form-field/input-field";
import { Button } from "@/components/ui/button";
import { useRegisterMutation } from "@/features/auth/queries/auth.mutations";
import { registerZodSchema } from "@/features/auth/validators/register.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import SocialLoginButtons from "./social-login-buttons";

type RegisterFormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export default function RegisterForm() {
  const mutation = useRegisterMutation();

  const form = useForm<RegisterFormValues>({
    mode: "onTouched",
    resolver: zodResolver(registerZodSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  async function onSubmit(values: RegisterFormValues) {
    try {
      await mutation.mutateAsync({
        name: values.name,
        email: values.email,
        password: values.password,
      });
    } catch {
      // Error handling is done in the mutation's onError callback
    }
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-3xl font-bold text-[#065E32] mb-2"
          style={{ fontFamily: "'Outfit', 'Poppins', sans-serif" }}
        >
          Create your account
        </h1>
        <p className="text-muted-foreground text-sm">
          Start your personalized nutrition journey with NutriSync today — it&apos;s free.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3.5">
        <FormProvider {...form}>
          <InputField
            className="grid gap-1"
            name="name"
            label="Full name"
            placeholder="Your full name"
          />
          <InputField
            className="grid gap-1"
            name="email"
            label="Email address"
            placeholder="you@example.com"
            type="email"
          />
          <InputField
            className="grid gap-1"
            name="password"
            label="Password"
            type="password"
          />

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting}
            className="w-full h-11 bg-[#065E32] hover:bg-[#044a27] text-white font-semibold rounded-xl shadow-lg shadow-[#065E32]/25 transition-all hover:shadow-xl hover:scale-[1.01]"
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Creating account...
              </span>
            ) : (
              "Get Started Free"
            )}
          </Button>

          {/* Divider */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-tighter font-black">
              <span className="bg-white dark:bg-slate-950 px-2 text-slate-300">
                Alternative Sign Up
              </span>
            </div>
          </div>

          <SocialLoginButtons />

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground pt-1">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#065E32] hover:text-[#44B74C] font-black transition-colors"
            >
              Sign in here
            </Link>
          </p>
        </FormProvider>
      </form>
    </div>
  );
}
