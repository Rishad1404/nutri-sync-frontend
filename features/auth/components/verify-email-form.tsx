/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  ArrowLeft,
  RefreshCw,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InputField from "@/components/global/form-field/input-field";
import {
  useResendOTPMutation,
  useVerifyEmailMutation,
} from "@/features/auth/queries/auth.mutations";
import {
  verifyZodSchema,
  IVerifyPayload,
} from "@/features/auth/validators/verify.validator";

export default function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "";

  const [resendTimer, setResendTimer] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const verifyMutation = useVerifyEmailMutation();
  const resendMutation = useResendOTPMutation();

  const form = useForm<IVerifyPayload>({
    resolver: zodResolver(verifyZodSchema),
    defaultValues: {
      email: email,
      otp: "",
    },
  });

  // Handle resend timer
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendTimer]);

  const onSubmit = async (data: IVerifyPayload) => {
    try {
      await verifyMutation.mutateAsync(data);
      setIsSuccess(true);
    } catch (error) {
      // Error handled by mutation toast
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;

    try {
      await resendMutation.mutateAsync({ email });
      setResendTimer(60); // 60 seconds cooldown
    } catch (error) {
      // Error handled by mutation toast
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center px-4 py-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md"
        >
          <Card className="border-none shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl">
            <CardContent className="pt-12 pb-12 text-center flex flex-col items-center">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl mb-2">Email Verified!</CardTitle>
              <CardDescription className="text-base mb-8 text-slate-600 dark:text-slate-400">
                Your account has been successfully verified. Redirecting you to
                the login page...
              </CardDescription>
              <div className="w-full max-w-[200px] h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-green-500"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-8 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-none shadow-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl overflow-hidden relative">
          {/* Top Decorative bar */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-600 to-lime-400" />

          <CardHeader className="pt-8 text-center">
            <div className="mx-auto w-14 h-14 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center mb-4 rotate-3 group hover:rotate-0 transition-transform duration-300">
              <ShieldCheck className="w-7 h-7 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl font-bold tracking-tight">
              Verify Identity
            </CardTitle>
            <CardDescription className="text-slate-500 dark:text-slate-400">
              We've sent a 6-digit verification code to
              <span className="block font-semibold text-slate-900 dark:text-slate-100 mt-1">
                {email || "your email address"}
              </span>
            </CardDescription>
          </CardHeader>

          <CardContent className="pb-8">
            <FormProvider {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {!email && (
                  <InputField
                    name="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    type="email"
                    icon={Mail}
                  />
                )}

                <div className="space-y-4">
                  <InputField
                    name="otp"
                    label="Verification Code"
                    placeholder="000000"
                    className="text-center text-2xl tracking-[0.5em] font-mono"
                    maxLength={6}
                  />

                  <div className="flex items-center justify-center text-sm">
                    <p className="text-slate-500 dark:text-slate-400">
                      Didn't receive the code?{" "}
                    </p>
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={resendTimer > 0 || resendMutation.isPending}
                      className="ml-2 font-semibold text-green-600 hover:text-green-700 dark:text-green-400 disabled:text-slate-400 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
                    >
                      {resendMutation.isPending ? (
                        <RefreshCw className="w-3 h-3 animate-spin" />
                      ) : null}
                      {resendTimer > 0
                        ? `Resend in ${resendTimer}s`
                        : "Resend Now"}
                    </button>
                  </div>
                </div>

                <div className="pt-2 space-y-4">
                  <Button
                    type="submit"
                    disabled={verifyMutation.isPending}
                    className="w-full h-12 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 text-white rounded-xl font-bold shadow-lg shadow-green-600/20 transition-all active:scale-[0.98]"
                  >
                    {verifyMutation.isPending ? (
                      <div className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Verifying...</span>
                      </div>
                    ) : (
                      "Verify Account"
                    )}
                  </Button>

                  <Button
                    variant="ghost"
                    asChild
                    className="w-full text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
                  >
                    <Link
                      href="/login"
                      className="flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Sign In</span>
                    </Link>
                  </Button>
                </div>
              </form>
            </FormProvider>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
