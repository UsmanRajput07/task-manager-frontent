import {
  type FieldValues,
  type Path,
  type UseFormReturn,
} from "react-hook-form";

import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { cn } from "@/lib/utils";
import { format } from "date-fns";

type Props<T extends FieldValues> = {
  label?: string;
  name: Path<T>;
  form: UseFormReturn<T>;
  placeholder?: string;
};

// ---- Schema ----

export default function DatePicker<T extends FieldValues>({
  label,
  name,
  form,
}: Props<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-3 relative">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  type="button"
                  variant="outline"
                  className="relative w-full justify-center"
                >
                  <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-5 opacity-70" />
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date > new Date() || date < new Date("1900-01-01")
                }
                captionLayout="dropdown"
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
