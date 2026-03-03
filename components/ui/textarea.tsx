import * as React from "react";
import { cn } from "@/lib/utils/cn";

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "min-h-[110px] w-full rounded-2xl border border-stone-300 bg-[#FBFAF6] px-4 py-3 text-sm text-stone-800 ring-offset-background placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#384E36]/40 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
