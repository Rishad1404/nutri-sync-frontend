"use client";

import InputField from "@/components/global/form-field/input-field";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/features/auth/queries/auth.mutations";
import type { ILoginPayload } from "@/features/auth/validators/login.validator";
import { loginZodSchema } from "@/features/auth/validators/login.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { FormProvider, useForm } from "react-hook-form";
import SocialLoginButtons from "./social-login-buttons";

export default function LoginForm({
  searchParams,
}: {
  searchParams?: { redirect?: string };
}) {
  const mutation = useLoginMutation();
  const redirectPath = searchParams?.redirect || "";

  const form = useForm<ILoginPayload & { redirectPath?: string }>({
    mode: "onTouched",
    resolver: zodResolver(loginZodSchema),
    defaultValues: { email: "", password: "", redirectPath },
  });

  async function onSubmit(values: ILoginPayload & { redirectPath?: string }) {
    try {
      const data = await mutation.mutateAsync({
        email: values.email,
        password: values.password,
        redirectPath: values.redirectPath,
      });
      console.log("Login successful", data);
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
          Welcome back
        </h1>
        <p className="text-muted-foreground text-sm">
          Sign in to your NutriSync account to continue your health journey.
        </p>
      </div>

      {/* Form */}
      <form
        id="login-form"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-5"
      >
        <FormProvider {...form}>
          <InputField
            className="grid gap-1.5"
            name="email"
            label="Email address"
            placeholder="you@example.com"
            type="email"
          />
          <div className="grid gap-1.5">
            <InputField
              className="grid gap-1.5"
              name="password"
              label="Password"
              type="password"
            />
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-xs text-[#065E32] hover:text-[#44B74C] transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            form="login-form"
            disabled={form.formState.isSubmitting}
            className="w-full h-12 bg-[#065E32] hover:bg-[#044a27] text-white font-semibold rounded-xl shadow-lg shadow-[#065E32]/25 transition-all hover:shadow-xl hover:scale-[1.01] mt-2"
          >
            {form.formState.isSubmitting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>

          {/* Divider */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[#065E32]/10" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <SocialLoginButtons />

          {/* Footer */}
          <p className="text-center text-sm text-muted-foreground pt-2">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#065E32] hover:text-[#44B74C] font-semibold transition-colors"
            >
              Create one free
            </Link>
          </p>
        </FormProvider>
      </form>
    </div>
  );
}
