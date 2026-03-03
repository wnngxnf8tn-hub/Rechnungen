import * as React from "react";
import { cn } from "@/lib/utils/cn";

export type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      "flex h-11 w-full rounded-2xl border border-stone-300 bg-[#FBFAF6] px-4 py-2 text-sm text-stone-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#384E36]/40",
      className
    )}
    {...props}
  />
));

Select.displayName = "Select";
