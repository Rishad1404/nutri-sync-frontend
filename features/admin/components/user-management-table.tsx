/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";
import {
  useAdminUsersQuery,
  useUpdateUserStatusMutation,
  useUpdateUserRoleMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  AdminUser,
} from "../queries/admin.queries";
import { ColumnDef } from "@tanstack/react-table";
import {
  MoreVertical,
  Trash2,
  Mail,
  Calendar,
  Eye,
  Edit,
  UserCircle,
  ArrowUpDown,
  Activity,
  Scale,
  Ruler,
  Utensils,
  Target,
  Clock,
  Fingerprint,
  Shield,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogFooter } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DataTable } from "@/components/dashboard/data-table";
import { toast } from "sonner";

export default function UserManagementTable() {
  const { data: usersResponse, isLoading } = useAdminUsersQuery();
  const users = usersResponse || [];

  const statusMutation = useUpdateUserStatusMutation();
  const roleMutation = useUpdateUserRoleMutation();
  const updateMutation = useUpdateUserMutation();
  const deleteMutation = useDeleteUserMutation();

  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Edit fields state
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("");
  const [editCalories, setEditCalories] = useState<number>(2000);

  const handleEdit = (user: AdminUser) => {
    setSelectedUser(user);
    setEditName(user.name);
    setEditEmail(user.email);
    setEditRole(user.role);
    setEditStatus(user.status);
    setEditCalories(user.calorieTarget);
    setIsEditOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedUser) return;

    try {
      // 1. Update general info if changed
      if (
        editName !== selectedUser.name ||
        editEmail !== selectedUser.email ||
        editCalories !== selectedUser.calorieTarget
      ) {
        await updateMutation.mutateAsync({
          userId: selectedUser.id,
          data: {
            name: editName,
            email: editEmail,
            calorieTarget: editCalories,
          },
        });
      }

      // 2. Update role if changed
      if (editRole !== selectedUser.role) {
        await roleMutation.mutateAsync({
          userId: selectedUser.id,
          role: editRole as any,
        });
      }

      // 3. Update status if changed
      if (editStatus !== selectedUser.status) {
        await statusMutation.mutateAsync({
          userId: selectedUser.id,
          status: editStatus as any,
        });
      }

      setIsEditOpen(false);
    } catch (error) {
      // Errors handled by mutations
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await deleteMutation.mutateAsync(selectedUser.id);
      setIsDeleteOpen(false);
    } catch (error) {
      // Errors handled by mutation
    }
  };

  const columns = useMemo<ColumnDef<AdminUser>[]>(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() =>
                column.toggleSorting(column.getIsSorted() === "asc")
              }
              className="-ml-3 h-8 gap-1 font-bold text-slate-900 dark:text-white hover:bg-transparent p-0"
            >
              User
              <ArrowUpDown className="h-3 w-3 opacity-50" />
            </Button>
          );
        },
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 font-black text-xs uppercase overflow-hidden ring-1 ring-slate-200 dark:ring-slate-700">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  user.name.charAt(0)
                )}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  {user.name}
                </p>
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
                  : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
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
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  status === "ACTIVE"
                    ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                    : status === "BLOCKED"
                      ? "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"
                      : "bg-slate-400",
                )}
              />
              <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                {status}
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "emailVerified",
        header: "Verification",
        cell: ({ row }) => {
          const verified = row.original.emailVerified;
          return (
            <div className="flex items-center gap-2">
              {verified ? (
                <div className="flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider">
                  <CheckCircle2 className="w-3 h-3" /> Verified
                </div>
              ) : (
                <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider">
                  <XCircle className="w-3 h-3" /> Pending
                </div>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "calorieTarget",
        header: "Target",
        cell: ({ row }) => (
          <div className="flex items-center gap-1.5">
            <Target className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              {row.getValue("calorieTarget")} <span className="text-[10px] text-slate-400 font-normal">kcal</span>
            </span>
          </div>
        ),
      },
      {
        id: "metrics",
        header: "Stats",
        cell: ({ row }) => {
          const user = row.original;
          return (
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <Scale className="w-2.5 h-2.5 opacity-50" /> {user.weight || "--"} kg
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1">
                <Ruler className="w-2.5 h-2.5 opacity-50" /> {user.height || "--"} cm
              </span>
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
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <MoreVertical className="h-4 w-4 text-slate-500" />
                  </Button>
                }
              />
              <DropdownMenuContent
                align="end"
                className="w-52 rounded-xl p-1.5 shadow-xl border-slate-200 dark:border-slate-800"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-3 py-2">
                    Actions
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />

                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedUser(user);
                      setIsViewOpen(true);
                    }}
                    className="rounded-lg gap-2 cursor-pointer py-2 px-3 focus:bg-emerald-50 dark:focus:bg-emerald-900/20"
                  >
                    <Eye className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-semibold">View Details</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={() => handleEdit(user)}
                    className="rounded-lg gap-2 cursor-pointer py-2 px-3 focus:bg-blue-50 dark:focus:bg-blue-900/20"
                  >
                    <Edit className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-semibold">Edit Member</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />

                <DropdownMenuItem
                  onClick={() => {
                    if (user.role === "ADMIN") {
                      toast.error(
                        "Access Denied: You cannot delete another administrator.",
                      );
                      return;
                    }
                    setSelectedUser(user);
                    setIsDeleteOpen(true);
                  }}
                  disabled={user.role === "ADMIN"}
                  className={cn(
                    "rounded-lg gap-2 cursor-pointer py-2 px-3 text-rose-500 focus:text-rose-600 focus:bg-rose-50 dark:focus:bg-rose-900/20",
                    user.role === "ADMIN" && "opacity-50 cursor-not-allowed",
                  )}
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="text-sm font-semibold">Delete Account</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [],
  );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      <DataTable
        columns={columns}
        data={users}
        searchKey="name"
        loading={isLoading}
      />

      {/* View User Modal */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-2xl rounded-[2.5rem] border-none bg-white dark:bg-slate-900 shadow-2xl p-0 overflow-hidden">
          <div className="h-32 bg-emerald-600 w-full relative">
            <div className="absolute -bottom-12 left-10">
              <div className="w-24 h-24 rounded-[2rem] bg-white dark:bg-slate-800 p-1.5 shadow-xl">
                <div className="w-full h-full rounded-[1.6rem] bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-3xl font-black uppercase text-slate-400 overflow-hidden">
                  {selectedUser?.image ? (
                    <img
                      src={selectedUser.image}
                      alt={selectedUser.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    selectedUser?.name.charAt(0)
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="pt-16 pb-10 px-10">
            <div className="flex items-start justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-none mb-2">
                  {selectedUser?.name}
                </h2>
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-100 text-emerald-700 border-none px-3 font-bold">
                    {selectedUser?.role}
                  </Badge>
                  <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Member since{" "}
                    {selectedUser?.createdAt &&
                      format(new Date(selectedUser.createdAt), "MMMM yyyy")}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                  Email Verified
                </p>
                {selectedUser?.emailVerified ? (
                  <Badge className="bg-blue-100 text-blue-600 border-none font-black text-[10px]">
                    VERIFIED
                  </Badge>
                ) : (
                  <Badge className="bg-slate-100 text-slate-500 border-none font-black text-[10px]">
                    PENDING
                  </Badge>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Basic Info Group */}
              <div className="col-span-2 grid grid-cols-2 gap-4 mb-2">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <Mail className="w-4 h-4 text-emerald-600 mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Email
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {selectedUser?.email}
                  </p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <Activity className="w-4 h-4 text-blue-600 mb-2" />
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Account Status
                  </p>
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate uppercase">
                    {selectedUser?.status}
                  </p>
                </div>
              </div>

              {/* Health Metrics Group */}
              <div className="p-5 bg-emerald-50/30 dark:bg-emerald-900/10 rounded-[2rem] border border-emerald-100/50 dark:border-emerald-800/50 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
                    Health Profile
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Age
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {selectedUser?.age || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Gender
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white capitalize">
                      {selectedUser?.gender || "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                      <Scale className="w-3 h-3" /> Weight
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {selectedUser?.weight
                        ? `${selectedUser.weight}kg`
                        : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1">
                      <Ruler className="w-3 h-3" /> Height
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {selectedUser?.height
                        ? `${selectedUser.height}cm`
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Preferences Group */}
              <div className="p-5 bg-blue-50/30 dark:bg-blue-900/10 rounded-[2rem] border border-blue-100/50 dark:border-blue-800/50 space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Utensils className="w-4 h-4 text-blue-600" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-blue-800 dark:text-blue-400">
                    Nutritional DNA
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">
                      Dietary focus
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedUser?.dietaryPreferences.length ? (
                        selectedUser.dietaryPreferences.map((p) => (
                          <Badge
                            key={p}
                            variant="outline"
                            className="text-[9px] font-bold rounded-lg border-blue-200 dark:border-blue-800"
                          >
                            {p}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          None specified
                        </span>
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-rose-400 mb-2">
                      Allergies
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedUser?.allergies.length ? (
                        selectedUser.allergies.map((a) => (
                          <Badge
                            key={a}
                            variant="outline"
                            className="text-[9px] font-bold rounded-lg border-rose-200 dark:border-rose-800 text-rose-600"
                          >
                            {a}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400 italic">
                          None
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Goals & Targets */}
              <div className="col-span-2 p-5 bg-slate-50 dark:bg-slate-800/50 rounded-[2rem] border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700">
                    <Target className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                      Primary Goal
                    </p>
                    <p className="text-sm font-bold text-slate-900 dark:text-white capitalize">
                      {selectedUser?.goals || "Wellness Journey"}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Daily Calorie Target
                  </p>
                  <p className="text-xl font-black text-emerald-600">
                    {selectedUser?.calorieTarget}{" "}
                    <span className="text-xs font-bold text-slate-400">
                      kcal
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit User Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-xl rounded-[2.5rem] border-none bg-white dark:bg-slate-900 shadow-2xl p-0 overflow-hidden">
          <div className="p-8 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-[1.5rem]">
                <UserCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                  Profile Control
                </h2>
                <p className="text-sm font-medium text-slate-500">
                  Managing access and core profile metrics for{" "}
                  {selectedUser?.name}
                </p>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-2 gap-6">
              {/* Basic Identification */}
              <div className="col-span-2 space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                  <Fingerprint className="w-3 h-3" /> Basic Identification
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
                      Full Name
                    </label>
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 font-medium"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
                      Email Address
                    </label>
                    <Input
                      value={editEmail}
                      onChange={(e) => setEditEmail(e.target.value)}
                      className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Permissions & Status */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                  <Shield className="w-3 h-3" /> Access & Status
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
                      Access Level
                    </label>
                    <Select
                      value={editRole}
                      onValueChange={(val) => setEditRole(val || "")}
                    >
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 font-bold">
                        <SelectValue placeholder="Role" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="USER" className="font-bold">
                          Standard User
                        </SelectItem>
                        <SelectItem
                          value="ADMIN"
                          className="font-bold text-rose-600"
                        >
                          System Admin
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
                      Account State
                    </label>
                    <Select
                      value={editStatus}
                      onValueChange={(val) => setEditStatus(val || "")}
                    >
                      <SelectTrigger className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 font-bold">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectItem value="ACTIVE" className="font-bold">
                          Active
                        </SelectItem>
                        <SelectItem
                          value="BLOCKED"
                          className="font-bold text-amber-600"
                        >
                          Blocked
                        </SelectItem>
                        <SelectItem
                          value="DELETED"
                          className="font-bold text-rose-600"
                        >
                          Soft Deleted
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Nutritional Engine */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-2">
                  <Utensils className="w-3 h-3" /> Nutritional Engine
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300 ml-1">
                      Daily Calorie Target
                    </label>
                    <div className="relative">
                      <Input
                        type="number"
                        value={editCalories}
                        onChange={(e) =>
                          setEditCalories(Number(e.target.value))
                        }
                        className="h-12 rounded-xl bg-slate-50 dark:bg-slate-800/50 border-slate-100 dark:border-slate-800 font-black text-emerald-600 pl-4 pr-12"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase">
                        kcal
                      </span>
                    </div>
                  </div>
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl border border-emerald-100 dark:border-emerald-800/50">
                    <div className="flex items-start gap-3">
                      <Activity className="w-4 h-4 text-emerald-600 mt-0.5" />
                      <p className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 leading-normal">
                        Changes to nutritional targets will affect the user's
                        dashboard calculations immediately.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
            <DialogFooter className="gap-3 sm:gap-0">
              <Button
                variant="ghost"
                onClick={() => setIsEditOpen(false)}
                className="rounded-2xl font-bold h-14 flex-1 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Discard Changes
              </Button>
              <Button
                onClick={handleUpdate}
                disabled={
                  updateMutation.isPending ||
                  statusMutation.isPending ||
                  roleMutation.isPending
                }
                className="bg-[#065E32] hover:bg-[#044a27] text-white rounded-2xl font-black h-14 flex-1 shadow-2xl shadow-emerald-500/20"
              >
                {updateMutation.isPending ||
                statusMutation.isPending ||
                roleMutation.isPending ? (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 animate-spin" />
                    Saving...
                  </div>
                ) : (
                  "Save Profile Configuration"
                )}
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="max-w-md rounded-[2.5rem] border-none bg-white dark:bg-slate-900 shadow-2xl p-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="p-4 bg-rose-100 dark:bg-rose-900/30 rounded-full">
              <Trash2 className="w-10 h-10 text-rose-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                Terminate Account?
              </h3>
              <p className="text-slate-500 font-medium">
                This action is irreversible. All data associated with{" "}
                <span className="text-rose-600 font-bold">
                  {selectedUser?.name}
                </span>{" "}
                will be permanently purged from our systems.
              </p>
            </div>
            <div className="flex w-full gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setIsDeleteOpen(false)}
                className="flex-1 h-14 rounded-2xl font-bold border-slate-200"
              >
                Abort
              </Button>
              <Button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
                className="flex-1 h-14 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold shadow-xl shadow-rose-500/20"
              >
                {deleteMutation.isPending ? "Purging..." : "Confirm Deletion"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
