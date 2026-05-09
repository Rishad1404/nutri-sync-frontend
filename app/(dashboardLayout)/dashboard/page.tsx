import UserDashboard from "@/features/dashboard/components/user/user-dashboard";
import { getUserInfo } from "@/features/auth/services/auth.service";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getUserInfo();

  if (!user) {
    redirect("/login");
  }

  if (user.role === "ADMIN") {
    redirect("/dashboard/admin");
  }

  return <UserDashboard />;
}
