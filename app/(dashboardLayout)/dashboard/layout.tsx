export const dynamic = "force-dynamic";

import DashboardHeader from "@/components/dashboard/dashboard-header";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { getUserInfo } from "@/features/auth/services/auth.service";
import { sidebar } from "@/lib/constant/dashboard";
import { redirect } from "next/navigation";

type Role = keyof typeof sidebar;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUserInfo();

  if (!user) {
    console.log("[Dashboard Layout] No user session, redirecting to login");
    redirect("/login");
  }

  // FIX: Force the role to UPPERCASE so it matches the sidebar object
  const rawRole = user?.role || "USER";
  const role = String(rawRole).toUpperCase() as Role;

  if (!sidebar[role]) {
    console.log(`[Dashboard Layout] Invalid role: ${role}`);
    redirect("/login");
  }

  console.log(`[Dashboard Layout] User: ${user?.email}, Role: ${role}`);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50/50 dark:bg-slate-950/50 transition-colors duration-500">
        <DashboardSidebar menu={sidebar[role]} user={user} />
        <div className="flex flex-col flex-1">
          <DashboardHeader role={role} />
          <main className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 lg:px-8">
              <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
