/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo } from "react";
import {
  useAdminUsersQuery,
  useUpdateUserStatusMutation,
  useUpdateUserRoleMutation,
  useDeleteUserMutation,
  AdminUser,
} from "../queries/admin.queries";
import { ColumnDef } from "@tanstack/react-table";
import {
  MoreVertical,
  Shield,
  ShieldAlert,
  Trash2,
  UserCheck,
  UserX,
  Mail,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DataTable } from "@/components/dashboard/data-table";

export default function UserManagementTable() {
  const { data: usersResponse, isLoading } = useAdminUsersQuery();
  const users = usersResponse || [];

  const statusMutation = useUpdateUserStatusMutation();
  const roleMutation = useUpdateUserRoleMutation();
  const deleteMutation = useDeleteUserMutation();

  const columns = useMemo<ColumnDef<AdminUser>[]>(
    () => [
      {
        accessorKey: "name",
        header: "User",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-black text-xs uppercase overflow-hidden ring-1 ring-slate-200 dark:ring-slate-700">
                {user.image ? (
                  <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{user.name}</p>
                <p className="text-[10px] font-medium text-slate-500 mt-0.5 flex items-center gap-1">
                  <Mail className="w-2.5 h-2.5 opacity-70" /> {user.email}
                </p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "role",
        header: "Access Level",
        cell: ({ row }) => {
          const role = row.getValue("role") as string;
          return (
            <Badge 
              className={cn(
                "rounded-lg text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 border-none",
                role === "ADMIN" 
                  ? "bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400" 
                  : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
              )}
            >
              {role}
            </Badge>
          );
        },
      },
      {
        accessorKey: "status",
        header: "Account Health",
        cell: ({ row }) => {
          const status = row.getValue("status") as string;
          return (
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-2 h-2 rounded-full",
                status === "ACTIVE" ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]" : 
                status === "BLOCKED" ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]" : "bg-slate-400"
              )} />
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">{status}</span>
            </div>
          );
        },
      },
      {
        accessorKey: "createdAt",
        header: "Member Since",
        cell: ({ row }) => (
          <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 opacity-50" />
            {format(new Date(row.getValue("createdAt")), "MMM dd, yyyy")}
          </span>
        ),
      },
      {
        id: "actions",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost" className="h-8 w-8 p-0 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800">
                  <MoreVertical className="h-4 w-4 text-slate-500" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl p-1.5 shadow-xl border-slate-200 dark:border-slate-800">
                <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-3 py-2">
                  Management Options
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                
                <DropdownMenuItem 
                  onClick={() => roleMutation.mutate({ userId: user.id, role: user.role === "ADMIN" ? "USER" : "ADMIN" })}
                  className="rounded-lg gap-2 cursor-pointer py-2 px-3 focus:bg-emerald-50 dark:focus:bg-emerald-900/20 focus:text-emerald-600 dark:focus:text-emerald-400"
                >
                  {user.role === "ADMIN" ? <Shield className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                  <span className="text-sm font-semibold">Change to {user.role === "ADMIN" ? "User" : "Admin"}</span>
                </DropdownMenuItem>

                <DropdownMenuItem 
                  onClick={() => statusMutation.mutate({ userId: user.id, status: user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE" })}
                  className="rounded-lg gap-2 cursor-pointer py-2 px-3 focus:bg-slate-50 dark:focus:bg-slate-800"
                >
                  {user.status === "ACTIVE" ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                  <span className="text-sm font-semibold">{user.status === "ACTIVE" ? "Revoke Access" : "Grant Access"}</span>
                </DropdownMenuItem>

                <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                
                <DropdownMenuItem 
                  onClick={() => deleteMutation.mutate(user.id)}
                  className="rounded-lg gap-2 cursor-pointer py-2 px-3 text-rose-500 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-900/20"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm font-semibold">Delete Permanently</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [statusMutation, roleMutation, deleteMutation]
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <DataTable 
        columns={columns} 
        data={users} 
        searchKey="name" 
        loading={isLoading}
      />
    </div>
  );
}
