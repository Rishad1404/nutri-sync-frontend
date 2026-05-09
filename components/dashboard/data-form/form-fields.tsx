/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import { useFormContext, Controller } from "react-hook-form";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface BaseFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  description?: string;
}

export function FormInput({
  name,
  label,
  placeholder,
  description,
  ...props
}: BaseFieldProps & React.InputHTMLAttributes<HTMLInputElement>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel className="mb-2 inline-flex items-center gap-2">{label}</FieldLabel>}
          <FieldContent>
            <Input
              placeholder={placeholder}
              {...field}
              {...props}
              value={field.value ?? ""}
              className="rounded-xl h-11"
            />
          </FieldContent>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function FormTextarea({
  name,
  label,
  placeholder,
  description,
  ...props
}: BaseFieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel className="mb-2 inline-flex items-center gap-2">{label}</FieldLabel>}
          <FieldContent>
            <Textarea
              placeholder={placeholder}
              {...field}
              {...props}
              value={field.value ?? ""}
              className="rounded-xl min-h-[100px]"
            />
          </FieldContent>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function FormSelect({
  name,
  label,
  placeholder,
  options,
  description,
}: BaseFieldProps & { options: { label: string; value: string }[] }) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          {label && <FieldLabel className="mb-2 inline-flex items-center gap-2">{label}</FieldLabel>}
          <FieldContent>
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className="rounded-xl h-11">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FieldContent>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

export function FormCheckbox({ name, label, description }: BaseFieldProps) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid} className="flex flex-row items-start space-x-3 space-y-0 rounded-xl border p-4 bg-card/50">
          <FieldContent>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FieldContent>
          <div className="space-y-1 leading-none">
            {label && <FieldLabel className="cursor-pointer select-none">{label}</FieldLabel>}
            {description && <FieldDescription>{description}</FieldDescription>}
          </div>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
