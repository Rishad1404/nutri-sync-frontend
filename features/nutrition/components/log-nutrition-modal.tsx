"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useLogNutritionMutation } from "../queries/nutrition.queries";
import { Loader2, Plus, Utensils } from "lucide-react";
import { useState } from "react";

const logSchema = z.object({
  foodName: z.string().min(2, "Food name is required"),
  calories: z.coerce.number().min(0),
  protein: z.coerce.number().min(0),
  carbs: z.coerce.number().min(0),
  fat: z.coerce.number().min(0),
  mealType: z.string().min(1, "Please select a meal type"),
});

type LogFormValues = z.infer<typeof logSchema>;

export default function LogNutritionModal({ children }: { children?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const mutation = useLogNutritionMutation();

  const form = useForm<LogFormValues>({
    resolver: zodResolver(logSchema),
    defaultValues: {
      foodName: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      mealType: "Breakfast",
    },
  });

  const onSubmit = async (values: LogFormValues) => {
    try {
      await mutation.mutateAsync(values);
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Failed to log nutrition:", error);
    }
  };

  const trigger = children || (
    <Button className="bg-[#065E32] hover:bg-[#044a27] text-white">
      <Plus className="w-4 h-4 mr-2" /> Log Nutrition
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={trigger as React.ReactElement} />
      <DialogContent className="sm:max-w-[450px] rounded-3xl p-8">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#065E32] flex items-center gap-2">
            <Utensils className="w-6 h-6" />
            Log Your Meal
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4">
          <div className="space-y-2">
            <Label htmlFor="foodName">Food Name</Label>
            <Input 
              id="foodName" 
              placeholder="e.g. Grilled Chicken Salad" 
              {...form.register("foodName")}
              className="rounded-xl border-slate-200 focus:ring-green-500"
            />
            {form.formState.errors.foodName && (
              <p className="text-xs text-red-500">{form.formState.errors.foodName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="mealType">Meal Type</Label>
              <Controller
                name="mealType"
                control={form.control}
                render={({ field }) => (
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value}
                  >
                    <SelectTrigger className="rounded-xl border-slate-200">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Breakfast">Breakfast</SelectItem>
                      <SelectItem value="Lunch">Lunch</SelectItem>
                      <SelectItem value="Dinner">Dinner</SelectItem>
                      <SelectItem value="Snack">Snack</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="calories">Calories (kcal)</Label>
              <Input 
                id="calories" 
                type="number" 
                {...form.register("calories")}
                className="rounded-xl border-slate-200"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="protein">Protein (g)</Label>
              <Input id="protein" type="number" {...form.register("protein")} className="rounded-xl border-slate-200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="carbs">Carbs (g)</Label>
              <Input id="carbs" type="number" {...form.register("carbs")} className="rounded-xl border-slate-200" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fat">Fat (g)</Label>
              <Input id="fat" type="number" {...form.register("fat")} className="rounded-xl border-slate-200" />
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={mutation.isPending}
            className="w-full bg-[#065E32] hover:bg-[#044a27] text-white h-12 rounded-xl text-lg font-bold shadow-lg shadow-green-600/20"
          >
            {mutation.isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              "Save Entry"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
