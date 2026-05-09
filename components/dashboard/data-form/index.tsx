/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  useForm,
  FormProvider,
  UseFormReturn,
  DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, ChevronRight, ChevronLeft, Check } from "lucide-react";

export interface FormStep {
  title: string;
  description?: string;
  fields: React.ReactNode;
  validationSchema?: z.ZodObject<any>;
}

interface DataFormProps<T extends z.ZodType<any, any>> {
  schema: T;
  onSubmit: (values: z.infer<T>) => Promise<void>;
  defaultValues?: DefaultValues<z.infer<T>>;
  steps?: FormStep[];
  children?: (form: UseFormReturn<z.infer<T>>) => React.ReactNode;
  className?: string;
  submitLabel?: string;
}

export function DataForm<T extends z.ZodType<any, any>>({
  schema,
  onSubmit,
  defaultValues,
  steps,
  children,
  className,
  submitLabel = "Submit",
}: DataFormProps<T>) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const isMultiStep = steps && steps.length > 0;

  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<z.infer<T>>,
    mode: "onTouched",
  });

  const {
    handleSubmit,
    trigger,
    formState: { isSubmitting },
  } = form;

  const nextStep = async () => {
    if (!steps) return;
    const currentStepFields = steps[currentStep].validationSchema
      ? Object.keys(steps[currentStep].validationSchema!.shape)
      : [];

    // Validate only the fields in the current step
    const isValid = await trigger(currentStepFields as any);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const onFinalSubmit = async (values: z.infer<T>) => {
    await onSubmit(values);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onFinalSubmit)}
        className={cn("space-y-6 w-full max-w-4xl mx-auto", className)}
      >
        {isMultiStep ? (
          <div className="space-y-8">
            {/* Stepper UI */}
            <div className="relative flex justify-between items-center px-2">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 z-0" />
              {steps.map((step, idx) => {
                const isActive = idx === currentStep;
                const isCompleted = idx < currentStep;
                return (
                  <div
                    key={step.title}
                    className="relative z-10 flex flex-col items-center gap-2"
                  >
                    <div
                      className={cn(
                        "h-10 w-10 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                        isActive
                          ? "bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/20 scale-110"
                          : isCompleted
                            ? "bg-primary border-primary text-primary-foreground"
                            : "bg-background border-muted text-muted-foreground",
                      )}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <span>{idx + 1}</span>
                      )}
                    </div>
                    <span
                      className={cn(
                        "text-[10px] font-bold uppercase tracking-wider hidden sm:block",
                        isActive ? "text-primary" : "text-muted-foreground",
                      )}
                    >
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Step Content */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 sm:p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground">
                  {steps[currentStep].title}
                </h3>
                {steps[currentStep].description && (
                  <p className="text-sm text-muted-foreground">
                    {steps[currentStep].description}
                  </p>
                )}
              </div>
              {steps[currentStep].fields}
            </div>

            {/* Step Navigation */}
            <div className="flex justify-between items-center pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={prevStep}
                disabled={currentStep === 0 || isSubmitting}
                className="rounded-xl h-11 px-6"
              >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous
              </Button>
              {currentStep === steps.length - 1 ? (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#065E32] hover:bg-[#044a27] text-white font-semibold rounded-xl px-8 h-11 shadow-lg shadow-[#065E32]/20"
                >
                  {isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  {submitLabel}
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl px-8 h-11"
                >
                  Next Step <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {children ? children(form) : null}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#065E32] hover:bg-[#044a27] text-white font-semibold rounded-xl h-12 shadow-lg shadow-[#065E32]/20 transition-all hover:scale-[1.01]"
            >
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              {submitLabel}
            </Button>
          </div>
        )}
      </form>
    </FormProvider>
  );
}
