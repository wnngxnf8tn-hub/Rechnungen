import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 disabled:pointer-events-none disabled:opacity-60 active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-[#384E36] text-[#F8F7F2] shadow-soft hover:bg-[#2f422d] hover:shadow-[0_10px_26px_-18px_rgba(56,78,54,0.45)]",
        secondary:
          "border border-stone-300 bg-stone-100 text-stone-800 hover:bg-stone-200",
        outline: "border border-stone-300 bg-[#F8F7F2] text-stone-800 hover:bg-stone-100",
        ghost: "text-stone-700 hover:bg-stone-100 hover:text-stone-900"
      },
      size: {
        default: "h-11 px-5 py-2",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10 rounded-full"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return <button className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
