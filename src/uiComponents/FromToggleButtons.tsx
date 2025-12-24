import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { cn } from "@/lib/utils";
import React from "react";
import type { Control, FieldValues, Path } from "react-hook-form";

interface Option {
  label: string;
  value: string;
  icon?: React.ElementType;
  color?: string | undefined;
}

interface FormToggleGroupProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  options: Option[];
  type?: "single" | "multiple";
  className?: string;
  size?: "sm" | "lg" | "default";
  spacing?: number;
}

// const colorMap = {
//   blue: "data-[state=on]:bg-blue-100 data-[state=on]:text-blue-700",
//   red: "data-[state=on]:bg-red-100 data-[state=on]:text-red-700",
//   yellow: "data-[state=on]:bg-yellow-100 data-[state=on]:text-yellow-700",
// };

export default function FormToggleButtons<T extends FieldValues>({
  control,
  name,
  label,
  options,
  type = "single",
  className,
  size = "sm",
  spacing = 1,
}: FormToggleGroupProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl className={cn(`${className} flex flex-wrap`)}>
            <ToggleGroup
              type={type}
              value={field.value || undefined}
              onValueChange={field.onChange}
              variant="outline"
              size={size}
              className="flex flex-wrap items-center"
              spacing={spacing}
            >
              {options.map((opt) => {
                const Icon = opt.icon;
                return (
                  <ToggleGroupItem
                    key={opt.value}
                    value={opt.value}
                    aria-label={`Toggle ${opt.label}`}
                    className={`flex items-center gap-2 transition-all rounded-md md:text-lg text-sm font-medium py-2 px-4 md:px-6
    ${`data-[state=on]:bg-${opt.color || "muted"}-100 data-[state=on]:text-${
      opt.color || "muted"
    }-700`}
  `}
                  >
                    {Icon && <Icon className="md:size-6 size-8" />}
                    {opt.label}
                  </ToggleGroupItem>
                );
              })}
            </ToggleGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
