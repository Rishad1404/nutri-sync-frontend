import ChangePasswordForm from "@/features/auth/components/change-password-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Change Password | NutriSync",
  description: "Update your account security settings.",
};

export default function ChangePasswordPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="mb-8 flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Security Center</h1>
        <p className="text-muted-foreground">
          Manage your password and protect your NutriSync account.
        </p>
      </div>
      
      <div className="mt-6">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
