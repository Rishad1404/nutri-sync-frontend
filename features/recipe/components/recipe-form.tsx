/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Plus,
  Trash2,
  Clock,
  Utensils,
  Flame,
  ChevronLeft,
  Camera,
  Image as ImageIcon,
} from "lucide-react";
import { createRecipeAction, updateRecipeAction } from "../actions/recipe.actions";
import Link from "next/link";
import { Recipe } from "../types/recipe.types";

const recipeFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  cookTime: z.coerce.number().min(1, "Cook time must be at least 1 minute"),
  prepTime: z.coerce.number().min(0, "Prep time cannot be negative"),
  servings: z.coerce.number().min(1, "Servings must be at least 1"),
  difficulty: z.enum(["easy", "medium", "hard"]),
  cuisine: z.string().min(1, "Cuisine is required"),
  category: z.enum(["breakfast", "lunch", "dinner", "snack"]),
  imageUrl: z.string().optional(),
  isPublished: z.boolean().default(true),
  ingredients: z
    .array(
      z.object({
        name: z.string().min(1, "Name is required"),
        quantity: z.coerce.number().min(0.01, "Quantity must be > 0"),
        unit: z.string().min(1, "Unit is required"),
        caloriesPerUnit: z.coerce.number().min(0),
      }),
    )
    .min(1, "At least one ingredient is required"),
  steps: z
    .array(
      z.object({
        stepNumber: z.number(),
        instruction: z.string().min(10, "Step must be at least 10 characters"),
      }),
    )
    .min(1, "At least one step is required"),
  nutrition: z
    .object({
      calories: z.coerce.number().min(0),
      protein: z.coerce.number().min(0),
      carbs: z.coerce.number().min(0),
      fat: z.coerce.number().min(0),
      fiber: z.coerce.number().min(0),
    })
    .optional(),
});

type RecipeFormValues = z.infer<typeof recipeFormSchema>;

interface RecipeFormProps {
  initialData?: Recipe;
  recipeId?: string;
  onSuccess?: () => void;
}

export function RecipeForm({ initialData, recipeId, onSuccess }: RecipeFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<RecipeFormValues>({
    resolver: zodResolver(recipeFormSchema),
    defaultValues: initialData
      ? {
          title: initialData.title,
          description: initialData.description,
          cookTime: initialData.cookTime,
          prepTime: initialData.prepTime,
          servings: initialData.servings,
          difficulty: initialData.difficulty as any,
          cuisine: initialData.cuisine,
          category: initialData.category as any,
          imageUrl: initialData.imageUrl || "",
          isPublished: initialData.isPublished,
          ingredients: initialData.ingredients as any,
          steps: initialData.steps as any,
          nutrition: initialData.nutrition as any,
        }
      : {
          title: "",
          description: "",
          cookTime: 30,
          prepTime: 15,
          servings: 2,
          difficulty: "medium",
          cuisine: "",
          category: "lunch",
          imageUrl: "",
          isPublished: true,
          ingredients: [{ name: "", quantity: 1, unit: "pcs", caloriesPerUnit: 0 }],
          steps: [{ stepNumber: 1, instruction: "" }],
          nutrition: {
            calories: 0,
            protein: 0,
            carbs: 0,
            fat: 0,
            fiber: 0,
          },
        },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      form.setValue("imageUrl", reader.result as string);
      toast.success("Image uploaded successfully!");
    };
    reader.readAsDataURL(file);
  };

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });

  const {
    fields: stepFields,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    name: "steps",
    control: form.control,
  });

  async function onSubmit(data: RecipeFormValues) {
    setLoading(true);
    try {
      let response;
      if (recipeId) {
        response = await updateRecipeAction(recipeId, data);
      } else {
        response = await createRecipeAction(data);
      }

      if (response.success) {
        toast.success(
          recipeId ? "Recipe updated successfully!" : "Recipe created successfully!",
        );
        if (onSuccess) {
          onSuccess();
        } else {
          router.push("/dashboard/my-recipes");
        }
        router.refresh();
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error) {
      toast.error("Failed to save recipe");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 pb-10">
        {/* Simple Header for Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border shadow-sm">
          <div className="flex items-center gap-6">
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      className="h-5 w-5 rounded-md border-primary text-primary focus-visible:ring-primary"
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-semibold cursor-pointer">
                      Publish Publicly
                    </FormLabel>
                    <p className="text-[10px] text-muted-foreground">
                      Make this recipe visible to everyone
                    </p>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard/my-recipes">
              <Button
                type="button"
                variant="ghost"
                className="rounded-2xl px-6"
              >
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              className="bg-[#065E32] hover:bg-[#044a27] text-white rounded-2xl px-8 shadow-lg shadow-green-600/20"
              disabled={loading}
            >
              {loading ? "Saving..." : recipeId ? "Update Recipe" : "Save Recipe"}
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* General Info Card */}
            <Card className="border-border/40 shadow-md rounded-[2rem] overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-green-50 dark:bg-green-950/30 rounded-2xl text-green-600">
                    <Utensils className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                      Recipe Essentials
                    </h3>
                    <p className="text-sm text-slate-500">
                      The basic details of your dish
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            Recipe Title
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Spicy Grilled Chicken Bowl"
                              {...field}
                              className="h-12 rounded-2xl border-slate-200 focus:border-[#065E32] focus:ring-[#065E32]/20"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="imageUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            Recipe Cover Image
                          </FormLabel>
                          <FormControl>
                            <div className="relative group">
                              <div className="h-32 w-full rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 flex items-center justify-center overflow-hidden transition-all group-hover:border-[#065E32]/50 group-hover:bg-green-50/30">
                                {field.value ? (
                                  <img
                                    src={field.value}
                                    alt="Preview"
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex flex-col items-center gap-2 text-slate-400 group-hover:text-[#065E32]">
                                    <ImageIcon className="h-8 w-8" />
                                    <span className="text-xs font-medium">Click to upload image</span>
                                  </div>
                                )}
                                <label
                                  htmlFor="recipe-image"
                                  className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Camera className="h-8 w-8 text-white" />
                                  <input
                                    id="recipe-image"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageUpload}
                                  />
                                </label>
                              </div>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-700 dark:text-slate-300">
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Briefly describe the dish and its unique flavors. e.g. A high-protein, spicy grilled chicken bowl perfect for meal prep."
                            className="min-h-[120px] rounded-2xl border-slate-200 resize-none focus:border-[#065E32] focus:ring-[#065E32]/20"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="cuisine"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            Cuisine Type
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Mexican, Thai, Italian"
                              {...field}
                              className="h-12 rounded-2xl border-slate-200"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-700 dark:text-slate-300">
                            Meal Category
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 rounded-2xl border-slate-200">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-2xl border-slate-200 shadow-xl">
                              <SelectItem value="breakfast">
                                Breakfast
                              </SelectItem>
                              <SelectItem value="lunch">Lunch</SelectItem>
                              <SelectItem value="dinner">Dinner</SelectItem>
                              <SelectItem value="snack">Snack</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Ingredients Card */}
            <Card className="border-border/40 shadow-md rounded-[2rem] overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-green-50 dark:bg-green-950/30 rounded-2xl text-green-600">
                      <Plus className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Ingredients List
                      </h3>
                      <p className="text-sm text-slate-500">
                        Break down the components of your dish
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendIngredient({
                        name: "",
                        quantity: 1,
                        unit: "",
                        caloriesPerUnit: 0,
                      })
                    }
                    className="rounded-2xl border-[#065E32] text-[#065E32] hover:bg-green-50"
                  >
                    Add Component
                  </Button>
                </div>

                <div className="space-y-4">
                  {ingredientFields.map((field, index) => (
                    <div
                      key={field.id}
                      className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 rounded-3xl bg-slate-50 dark:bg-slate-800/40 relative group"
                    >
                      <div className="md:col-span-5">
                        <FormField
                          control={form.control}
                          name={`ingredients.${index}.name`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Ingredient Name (e.g. Chicken Breast)"
                                  {...field}
                                  className="h-11 rounded-xl bg-white dark:bg-slate-900 border-none shadow-sm"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name={`ingredients.${index}.quantity`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="any"
                                  placeholder="Qty (e.g. 200)"
                                  {...field}
                                  className="h-11 rounded-xl bg-white dark:bg-slate-900 border-none shadow-sm"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name={`ingredients.${index}.unit`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  placeholder="Unit (e.g. grams)"
                                  {...field}
                                  className="h-11 rounded-xl bg-white dark:bg-slate-900 border-none shadow-sm"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name={`ingredients.${index}.caloriesPerUnit`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  type="number"
                                  step="any"
                                  placeholder="Cal/Unit (e.g. 1.65)"
                                  {...field}
                                  className="h-11 rounded-xl bg-white dark:bg-slate-900 border-none shadow-sm"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="md:col-span-1 flex items-center justify-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeIngredient(index)}
                          disabled={ingredientFields.length === 1}
                          className="h-11 w-11 text-slate-400 hover:text-red-500 rounded-xl transition-colors"
                        >
                          <Trash2 className="h-5 w-5" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Preparation Card */}
            <Card className="border-border/40 shadow-md rounded-[2rem] overflow-hidden">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-green-50 dark:bg-green-950/30 rounded-2xl text-green-600">
                      <Clock className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Instructions
                      </h3>
                      <p className="text-sm text-slate-500">
                        Step-by-step cooking guide
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      appendStep({
                        stepNumber: stepFields.length + 1,
                        instruction: "",
                      })
                    }
                    className="rounded-2xl border-[#065E32] text-[#065E32] hover:bg-green-50"
                  >
                    Add Step
                  </Button>
                </div>

                <div className="space-y-6">
                  {stepFields.map((field, index) => (
                    <div key={field.id} className="flex gap-6 p-1 group">
                      <div className="flex-none flex flex-col items-center gap-2">
                        <div className="h-10 w-10 rounded-2xl bg-green-600 text-white flex items-center justify-center font-bold text-base shadow-lg shadow-green-600/20">
                          {index + 1}
                        </div>
                        {index < stepFields.length - 1 && (
                          <div className="w-0.5 flex-1 bg-slate-100 dark:bg-slate-800 rounded-full" />
                        )}
                      </div>
                      <div className="flex-1 space-y-2 pt-1">
                        <FormField
                          control={form.control}
                          name={`steps.${index}.instruction`}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Textarea
                                  placeholder={`e.g. Marinate the chicken in spices for at least 10 minutes.`}
                                  className="rounded-[1.5rem] min-h-[100px] border-slate-100 bg-slate-50/50 dark:bg-slate-800/30 resize-none focus:bg-white dark:focus:bg-slate-900 transition-all"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeStep(index)}
                        disabled={stepFields.length === 1}
                        className="text-slate-300 hover:text-red-500 rounded-xl transition-all h-10 w-10 mt-1"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Info Column */}
          <div className="space-y-8">
            {/* Timing & Logistics Card */}
            <Card className="border-border/40 shadow-md rounded-[2rem] overflow-hidden bg-slate-900 text-white">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-green-600 rounded-2xl text-white">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Logistics</h3>
                    <p className="text-sm text-slate-400 text-xs">
                      Timing and servings
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="prepTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300 text-xs uppercase tracking-wider font-bold">
                          Prep (m)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 15"
                            {...field}
                            className="h-12 rounded-2xl bg-white/10 border-white/10 text-white focus:bg-white/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cookTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300 text-xs uppercase tracking-wider font-bold">
                          Cook (m)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 20"
                            {...field}
                            className="h-12 rounded-2xl bg-white/10 border-white/10 text-white focus:bg-white/20"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="servings"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300 text-xs uppercase tracking-wider font-bold">
                        Servings
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="e.g. 2"
                          {...field}
                          className="h-12 rounded-2xl bg-white/10 border-white/10 text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300 text-xs uppercase tracking-wider font-bold">
                        Complexity
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 rounded-2xl bg-white/10 border-white/10 text-white">
                            <SelectValue placeholder="Difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="rounded-2xl shadow-2xl">
                          <SelectItem value="easy">Easy</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Nutrition Card */}
            <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#065E32] to-[#044a27] text-white">
              <CardContent className="p-8 space-y-8">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-white/10 rounded-2xl text-white">
                    <Flame className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Nutritional Profile
                    </h3>
                    <p className="text-xs text-green-200">Per single serving</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                  <FormField
                    control={form.control}
                    name="nutrition.calories"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase font-black text-green-300">
                          Calories
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 450"
                            {...field}
                            className="h-12 rounded-2xl bg-black/20 border-white/10 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nutrition.protein"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase font-black text-green-300">
                          Protein (g)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 45"
                            {...field}
                            className="h-12 rounded-2xl bg-black/20 border-white/10 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nutrition.carbs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase font-black text-green-300">
                          Carbs (g)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 35"
                            {...field}
                            className="h-12 rounded-2xl bg-black/20 border-white/10 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="nutrition.fat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[10px] uppercase font-black text-green-300">
                          Fat (g)
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="e.g. 12"
                            {...field}
                            className="h-12 rounded-2xl bg-black/20 border-white/10 text-white"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="nutrition.fiber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-[10px] uppercase font-black text-green-300">
                            Dietary Fiber (g)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g. 6"
                              {...field}
                              className="h-12 rounded-2xl bg-black/20 border-white/10 text-white"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              type="button"
              variant="outline"
              className="w-full rounded-[1.5rem] h-12 border-slate-200"
              onClick={() => router.back()}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Go Back
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
