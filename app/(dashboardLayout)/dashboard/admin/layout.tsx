import { getUserInfo } from "@/features/auth/services/auth.service";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserInfo();

  // STICKY RULE: Only ADMINS can enter the /dashboard/admin routes
  if (!user || user.role !== "ADMIN") {
    console.log(`[Admin Layout] Access denied for user: ${user?.email}, Role: ${user?.role}`);
    redirect("/dashboard");
  }

  return <>{children}</>;
}
