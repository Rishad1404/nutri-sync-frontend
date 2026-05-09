/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  Calendar,
  Weight,
  Ruler,
  Target,
  CheckCircle2,
  Loader2,
  Utensils,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { useUpdateHealthProfileMutation } from "@/features/user/queries/user.queries";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

const healthSchema = z.object({
  age: z.coerce.number().min(1, "Valid age required").optional(),
  gender: z.string().optional(),
  weight: z.coerce.number().min(1, "Valid weight required").optional(),
  height: z.coerce.number().min(1, "Valid height required").optional(),
  activityLevel: z.string().optional(),
  calorieTarget: z.coerce.number().min(500, "Minimum 500 kcal").optional(),
  goals: z.string().optional(),
  dietaryPreferences: z.string().optional(),
  allergies: z.string().optional(),
});

type HealthFormValues = z.infer<typeof healthSchema>;

export default function HealthProfileForm({ 
  user, 
  onSuccess 
}: { 
  user: any; 
  onSuccess?: () => void; 
}) {
  const mutation = useUpdateHealthProfileMutation();

  const form = useForm<HealthFormValues>({
    resolver: zodResolver(healthSchema),
    values: {
      age: user.age || 0,
      gender: user.gender || "",
      weight: user.weight || 0,
      height: user.height || 0,
      activityLevel: user.activityLevel || "",
      calorieTarget: user.calorieTarget || 2000,
      goals: user.goals || "",
      dietaryPreferences: Array.isArray(user.dietaryPreferences)
        ? user.dietaryPreferences.join(", ")
        : "",
      allergies: Array.isArray(user.allergies) ? user.allergies.join(", ") : "",
    },
  });

  const onSubmit = (values: HealthFormValues) => {
    // Convert comma-separated strings to arrays for the backend
    const payload = {
      ...values,
      dietaryPreferences: values.dietaryPreferences
        ? values.dietaryPreferences
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s !== "")
        : [],
      allergies: values.allergies
        ? values.allergies
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s !== "")
        : [],
    };

    mutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Health profile synchronized successfully!");
        if (onSuccess) onSuccess();
      },
    });
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 rounded-lg border bg-card p-6"
    >
      <div>
        <h2 className="mb-2 text-xl font-semibold">
          Health & Nutrition Assessment
        </h2>
        <p className="text-sm text-muted-foreground">
          Provide your physical metrics and dietary requirements for a
          personalized experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Age (Years)</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
            <Input type="number" {...form.register("age")} className="pl-10" />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Biological Gender</Label>
          <Controller
            control={form.control}
            name="gender"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Activity Level</Label>
          <Controller
            control={form.control}
            name="activityLevel"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">
                    Sedentary (Office Job)
                  </SelectItem>
                  <SelectItem value="lightly-active">Lightly Active</SelectItem>
                  <SelectItem value="moderately-active">
                    Moderately Active
                  </SelectItem>
                  <SelectItem value="very-active">Very Active</SelectItem>
                  <SelectItem value="extra-active">Athlete</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium">Weight (kg)</Label>
          <div className="relative">
            <Weight className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
            <Input
              type="number"
              step="0.1"
              {...form.register("weight")}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Height (cm)</Label>
          <div className="relative">
            <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/50" />
            <Input
              type="number"
              {...form.register("height")}
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Daily Calorie Target (kcal)
          </Label>
          <div className="relative">
            <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
            <Input
              type="number"
              {...form.register("calorieTarget")}
              className="pl-10 font-bold text-emerald-600"
            />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-sm font-medium flex items-center gap-2">
            <Target className="w-4 h-4 text-primary" /> Health Goals
          </Label>
          <Textarea
            placeholder="e.g. Lose 5kg in 2 months, build muscle mass, improve cardiovascular health..."
            {...form.register("goals")}
            className="min-h-[80px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <Utensils className="w-4 h-4 text-primary" /> Dietary Preferences
            </Label>
            <Textarea
              placeholder="e.g. Vegan, Keto, Paleo (separate with commas)"
              {...form.register("dietaryPreferences")}
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive" /> Allergies
            </Label>
            <Textarea
              placeholder="e.g. Peanuts, Shellfish, Gluten (separate with commas)"
              {...form.register("allergies")}
            />
          </div>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Target className="h-5 w-5 text-primary" />
        </div>
        <p className="text-xs text-muted-foreground flex-1">
          <span className="font-bold text-foreground">AI Integration:</span>{" "}
          Updating your health metrics will automatically recalculate your
          recommended daily calorie and macro intake.
        </p>
      </div>

      <div className="flex items-center justify-end gap-3 border-t pt-6">
        <Button
          type="button"
          variant="outline"
          disabled={mutation.isPending}
          onClick={() => form.reset()}
        >
          Reset
        </Button>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle2 className="mr-2 h-4 w-4" />
          )}
          Update Health Profile
        </Button>
      </div>
    </form>
  );
}
