"use client";

import InputField from "@/components/global/form-field/input-field";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/features/auth/queries/auth.mutations";
import type { ILoginPayload } from "@/features/auth/validators/login.validator";
import { loginZodSchema } from "@/features/auth/validators/login.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import SocialLoginButtons from "./social-login-buttons";

export default function LoginForm({
  searchParams,
}: {
  searchParams?: { redirect?: string; demo?: string };
}) {
  const mutation = useLoginMutation();

  // Decode the redirect parameter
  const redirectPath = searchParams?.redirect
    ? decodeURIComponent(searchParams.redirect)
    : undefined;

  const form = useForm<ILoginPayload>({
    mode: "onTouched",
    resolver: zodResolver(loginZodSchema),
    defaultValues: { email: "", password: "" },
  });

  // Handle demo login from URL
  useEffect(() => {
    const demo = searchParams?.demo;
    if (demo === "user") {
      form.setValue("email", "test@example.com");
      form.setValue("password", "12345678");
      form.handleSubmit(onSubmit)();
    } else if (demo === "admin") {
      form.setValue("email", "admin@nutrisync.com");
      form.setValue("password", "admin123@");
      form.handleSubmit(onSubmit)();
    }
  }, [searchParams]);

  async function onSubmit(values: ILoginPayload) {
    mutation.mutate({
      email: values.email,
      password: values.password,
      redirectPath,
    });
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
        className="space-y-3.5"
      >
        <FormProvider {...form}>
          <InputField
            className="grid gap-1"
            name="email"
            label="Email address"
            placeholder="you@example.com"
            type="email"
          />
          <div className="grid gap-1">
            <InputField
              className="grid gap-1"
              name="password"
              label="Password"
              type="password"
            />
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-[11px] text-[#065E32] hover:text-[#44B74C] transition-colors font-bold"
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
            disabled={form.formState.isSubmitting || mutation.isPending}
            className="w-full h-11 bg-[#065E32] hover:bg-[#044a27] text-white font-semibold rounded-xl shadow-lg shadow-[#065E32]/25 transition-all hover:shadow-xl hover:scale-[1.01]"
          >
            {form.formState.isSubmitting || mutation.isPending ? (
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Signing in...
              </span>
            ) : (
              "Sign In"
            )}
          </Button>

          {/* Demo Accounts */}
          <div className="pt-2">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 text-center">
              Quick Demo Access
            </p>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.setValue("email", "test@example.com");
                  form.setValue("password", "12345678");
                  form.handleSubmit(onSubmit)();
                }}
                className="h-9 rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50 text-[10px] font-black uppercase tracking-wider"
              >
                User Account
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.setValue("email", "admin@nutrisync.com");
                  form.setValue("password", "admin123@");
                  form.handleSubmit(onSubmit)();
                }}
                className="h-9 rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50 text-[10px] font-black uppercase tracking-wider"
              >
                Admin Account
              </Button>
            </div>
          </div>

          {/* Divider */}
          <div className="relative my-2">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-100 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-[9px] uppercase tracking-tighter font-black">
              <span className="bg-white dark:bg-slate-950 px-2 text-slate-300">
                Alternative Login
              </span>
            </div>
          </div>

          <SocialLoginButtons />

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground pt-1">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-[#065E32] hover:text-[#44B74C] font-black transition-colors"
            >
              Join NutriSync
            </Link>
          </p>
        </FormProvider>
      </form>
    </div>
  );
}
