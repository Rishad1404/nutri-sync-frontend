"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ShieldCheck,
  KeyRound,
  Lock,
  CheckCircle2,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import InputField from "@/components/global/form-field/input-field";
import { useChangePasswordMutation } from "@/features/auth/queries/auth.mutations";
import {
  changePasswordZodSchema,
  type IChangePasswordPayload,
} from "@/features/auth/validators/change-password.validator";

export default function ChangePasswordForm() {
  const mutation = useChangePasswordMutation();
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<IChangePasswordPayload>({
    resolver: zodResolver(changePasswordZodSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onTouched",
  });

  const onSubmit = async (values: IChangePasswordPayload) => {
    try {
      await mutation.mutateAsync({
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      });
      setIsSuccess(true);
      form.reset();
    } catch (error) {
      // Error is handled by the mutation's toast
      console.error("Change password error:", error);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center space-y-6 rounded-xl border bg-card p-12 text-center shadow-sm">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <CheckCircle2 className="h-10 w-10" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Password Updated Successfully</h2>
          <p className="text-muted-foreground">
            Your security has been updated. You can now use your new password
            for all future logins.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => setIsSuccess(false)}
          className="mt-4"
        >
          Back to Change Password
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8 rounded-xl border bg-card p-8 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShieldCheck className="h-6 w-6 text-primary" />
            Security Settings
          </h2>
          <p className="text-sm text-muted-foreground">
            Update your password to keep your account secure.
          </p>
        </div>
      </div>

      <Separator />

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <InputField
              name="currentPassword"
              label="Current Password"
              type="password"
              placeholder="••••••••"
              icon={Lock}
              requiredMark
              disabled={mutation.isPending}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <InputField
                name="newPassword"
                label="New Password"
                type="password"
                placeholder="••••••••"
                icon={KeyRound}
                requiredMark
                disabled={mutation.isPending}
                hint="Minimum 8 characters"
              />
              <InputField
                name="confirmPassword"
                label="Confirm New Password"
                type="password"
                placeholder="••••••••"
                icon={KeyRound}
                requiredMark
                disabled={mutation.isPending}
              />
            </div>
          </div>

          <div className="rounded-lg bg-muted/50 p-4 flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div className="text-xs space-y-1">
              <p className="font-bold text-foreground">
                Password Requirements:
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-0.5">
                <li>At least 8 characters long</li>
                <li>Cannot be the same as your current password</li>
                <li>Make it strong by using symbols and numbers</li>
              </ul>
            </div>
          </div>

          <div className="flex items-center justify-end gap-4 border-t pt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => form.reset()}
              disabled={mutation.isPending}
            >
              Reset Fields
            </Button>
            <Button
              type="submit"
              className="px-8"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Password"
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
