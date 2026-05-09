"use client";

import {
  useProfileQuery,
  useUpdateProfileMutation,
  useChangePasswordMutation,
} from "../queries/user.queries";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  User,
  Lock,
  Mail,
  ShieldCheck,
  Camera,
  Loader2,
  Target,
  Utensils,
  AlertCircle,
  Save,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  dietaryPreferences: z.string().optional(),
  allergies: z.string().optional(),
  goals: z.string().optional(),
  calorieTarget: z.coerce.number().min(0).optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "New password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export function UserProfile() {
  const { data: profile, isLoading } = useProfileQuery();
  const updateMutation = useUpdateProfileMutation();
  const passwordMutation = useChangePasswordMutation();

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: {
      name: profile?.data?.name || "",
      dietaryPreferences: profile?.data?.dietaryPreferences || "",
      allergies: profile?.data?.allergies || "",
      goals: profile?.data?.goals || "",
      calorieTarget: profile?.data?.calorieTarget || 0,
    },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onProfileSubmit = (values: ProfileFormValues) => {
    updateMutation.mutate(values);
  };

  const onPasswordSubmit = (values: PasswordFormValues) => {
    passwordMutation.mutate(
      {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      },
      {
        onSuccess: () => passwordForm.reset(),
      },
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-8 p-4">
        <div className="flex items-center gap-6">
          <Skeleton className="w-24 h-24 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-48 rounded-lg" />
            <Skeleton className="h-4 w-64 rounded-lg" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Skeleton className="h-[400px] rounded-3xl" />
          <Skeleton className="h-[400px] rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Profile Header */}
      <div className="relative h-48 rounded-[2.5rem] bg-gradient-to-r from-[#065E32] to-[#044a27] overflow-hidden shadow-2xl shadow-green-900/20">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="absolute -bottom-12 left-10 flex items-end gap-6">
          <div className="relative group">
            <Avatar className="w-32 h-32 border-4 border-white dark:border-slate-900 shadow-2xl">
              <AvatarImage src={profile?.data?.image} />
              <AvatarFallback className="text-3xl font-black bg-slate-100 text-[#065E32]">
                {profile?.data?.name?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <Camera className="text-white w-8 h-8" />
            </div>
          </div>
          <div className="mb-14">
            <h1 className="text-3xl font-black text-white flex items-center gap-2">
              {profile?.data?.name}
              {profile?.data?.emailVerified && (
                <CheckCircle2 className="w-6 h-6 text-green-400 fill-green-400/20" />
              )}
            </h1>
            <p className="text-green-100/80 font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" /> {profile?.data?.email}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-16 pt-4">
        <Tabs defaultValue="general" className="space-y-8">
          <TabsList className="bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl h-14 w-full md:w-auto flex">
            <TabsTrigger
              value="general"
              className="flex-1 md:px-8 rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:text-[#065E32] transition-all"
            >
              <User className="w-4 h-4 mr-2" /> General
            </TabsTrigger>
            <TabsTrigger
              value="nutritional"
              className="flex-1 md:px-8 rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:text-[#065E32] transition-all"
            >
              <Utensils className="w-4 h-4 mr-2" /> Nutritional
            </TabsTrigger>
            <TabsTrigger
              value="security"
              className="flex-1 md:px-8 rounded-xl font-bold data-[state=active]:bg-white data-[state=active]:text-[#065E32] transition-all"
            >
              <ShieldCheck className="w-4 h-4 mr-2" /> Security
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-2xl font-black flex items-center gap-3">
                    <User className="text-[#065E32]" />
                    Personal Information
                  </CardTitle>
                  <CardDescription className="font-medium">
                    Update your name and profile details.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-4 space-y-6">
                  <form
                    onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="name"
                          className="text-xs font-bold uppercase tracking-wider text-slate-400"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="name"
                          {...profileForm.register("name")}
                          className="rounded-2xl h-12 border-slate-100 bg-slate-50 focus:bg-white transition-all font-medium"
                        />
                        {profileForm.formState.errors.name && (
                          <p className="text-xs text-red-500 font-bold">
                            {profileForm.formState.errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2 opacity-60">
                        <Label className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Email Address (Read-only)
                        </Label>
                        <Input
                          value={profile?.data?.email}
                          disabled
                          className="rounded-2xl h-12 border-slate-100 bg-slate-50 cursor-not-allowed font-medium"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={updateMutation.isPending}
                        className="rounded-2xl h-14 px-10 bg-[#065E32] hover:bg-[#044a27] text-white font-bold shadow-xl shadow-green-900/20"
                      >
                        {updateMutation.isPending ? (
                          <Loader2 className="animate-spin mr-2" />
                        ) : (
                          <Save className="w-5 h-5 mr-2" />
                        )}
                        Save Changes
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="nutritional">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-2xl font-black flex items-center gap-3">
                    <Target className="text-[#065E32]" />
                    Nutritional Profile
                  </CardTitle>
                  <CardDescription className="font-medium">
                    Customize your dietary goals and targets.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-4 space-y-6">
                  <form
                    onSubmit={profileForm.handleSubmit(onProfileSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="calorieTarget"
                          className="text-xs font-bold uppercase tracking-wider text-slate-400"
                        >
                          Daily Calorie Target (kcal)
                        </Label>
                        <Input
                          id="calorieTarget"
                          type="number"
                          {...profileForm.register("calorieTarget")}
                          className="rounded-2xl h-12 border-slate-100 bg-slate-50 focus:bg-white transition-all font-black text-lg text-[#065E32]"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label
                          htmlFor="dietaryPreferences"
                          className="text-xs font-bold uppercase tracking-wider text-slate-400"
                        >
                          Dietary Preferences
                        </Label>
                        <Input
                          id="dietaryPreferences"
                          placeholder="e.g. Keto, Vegan, Paleo"
                          {...profileForm.register("dietaryPreferences")}
                          className="rounded-2xl h-12 border-slate-100 bg-slate-50 focus:bg-white transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="allergies"
                        className="text-xs font-bold uppercase tracking-wider text-slate-400"
                      >
                        Allergies
                      </Label>
                      <Textarea
                        id="allergies"
                        placeholder="List any food allergies here..."
                        {...profileForm.register("allergies")}
                        className="rounded-2xl min-h-[100px] border-slate-100 bg-slate-50 focus:bg-white transition-all font-medium"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="goals"
                        className="text-xs font-bold uppercase tracking-wider text-slate-400"
                      >
                        Health & Fitness Goals
                      </Label>
                      <Textarea
                        id="goals"
                        placeholder="What are you working towards?"
                        {...profileForm.register("goals")}
                        className="rounded-2xl min-h-[100px] border-slate-100 bg-slate-50 focus:bg-white transition-all font-medium"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button
                        type="submit"
                        disabled={updateMutation.isPending}
                        className="rounded-2xl h-14 px-10 bg-[#065E32] hover:bg-[#044a27] text-white font-bold shadow-xl shadow-green-900/20"
                      >
                        {updateMutation.isPending ? (
                          <Loader2 className="animate-spin mr-2" />
                        ) : (
                          <Save className="w-5 h-5 mr-2" />
                        )}
                        Update Profile
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>

          <TabsContent value="security">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-4">
                  <div className="p-8 rounded-[2rem] bg-orange-50 dark:bg-orange-900/10 border-2 border-dashed border-orange-200 dark:border-orange-800">
                    <AlertCircle className="w-10 h-10 text-orange-500 mb-4" />
                    <h3 className="font-black text-lg text-orange-900 dark:text-orange-400">
                      Password Requirements
                    </h3>
                    <ul className="mt-4 space-y-2 text-sm text-orange-800/70 dark:text-orange-500 font-medium">
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-orange-400" />{" "}
                        At least 6 characters
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-orange-400" />{" "}
                        Must match confirmation
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-orange-400" />{" "}
                        Use a mix of symbols
                      </li>
                    </ul>
                  </div>
                </div>

                <Card className="md:col-span-2 rounded-[2.5rem] border-none shadow-2xl shadow-slate-200/50 dark:shadow-none bg-white dark:bg-slate-900">
                  <CardHeader className="p-8 pb-4">
                    <CardTitle className="text-2xl font-black flex items-center gap-3">
                      <Lock className="text-[#065E32]" />
                      Change Password
                    </CardTitle>
                    <CardDescription className="font-medium">
                      Secure your account with a strong password.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-4">
                    <form
                      onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <Label
                          htmlFor="currentPassword"
                          className="text-xs font-bold uppercase tracking-wider text-slate-400"
                        >
                          Current Password
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          {...passwordForm.register("currentPassword")}
                          className="rounded-2xl h-12 border-slate-100 bg-slate-50 focus:bg-white transition-all"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="newPassword"
                            className="text-xs font-bold uppercase tracking-wider text-slate-400"
                          >
                            New Password
                          </Label>
                          <Input
                            id="newPassword"
                            type="password"
                            {...passwordForm.register("newPassword")}
                            className="rounded-2xl h-12 border-slate-100 bg-slate-50 focus:bg-white transition-all"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label
                            htmlFor="confirmPassword"
                            className="text-xs font-bold uppercase tracking-wider text-slate-400"
                          >
                            Confirm Password
                          </Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            {...passwordForm.register("confirmPassword")}
                            className="rounded-2xl h-12 border-slate-100 bg-slate-50 focus:bg-white transition-all"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end pt-4">
                        <Button
                          type="submit"
                          disabled={passwordMutation.isPending}
                          className="rounded-2xl h-14 px-10 bg-slate-900 hover:bg-slate-800 text-white font-bold shadow-xl shadow-slate-900/20"
                        >
                          {passwordMutation.isPending ? (
                            <Loader2 className="animate-spin mr-2" />
                          ) : (
                            <Lock className="w-5 h-5 mr-2" />
                          )}
                          Update Password
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
