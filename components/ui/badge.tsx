import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex h-7 w-[8.5rem] items-center justify-center whitespace-nowrap rounded-full border px-3 text-[11px] font-semibold uppercase tracking-[0.08em]",
  {
    variants: {
      variant: {
        default: "border-stone-300 bg-stone-100 text-stone-700",
        success: "border-emerald-300 bg-emerald-100 text-emerald-900",
        warning: "border-[#D8B08E] bg-[#EBD4C3] text-[#54280F]",
        danger: "border-rose-300 bg-rose-100 text-rose-900",
        info: "border-[#DDB79A] bg-[#EDD8C8] text-[#5E3116]"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

export const Badge = ({ className, variant, ...props }: BadgeProps) => {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
};
