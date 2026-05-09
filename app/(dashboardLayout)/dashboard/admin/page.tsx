import AdminDashboard from "@/features/dashboard/components/admin/admin-dashboard";
import { getUserInfo } from "@/features/auth/services/auth.service";
import { redirect } from "next/navigation";

export default async function AdminDashboardPage() {
  const user = await getUserInfo();

  if (!user || user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return <AdminDashboard />;
}
