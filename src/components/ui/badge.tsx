import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors duration-150 select-none",
  {
    variants: {
      variant: {
        default:
          "bg-blue-50 text-blue-700 border border-blue-200/80",
        blue:
          "bg-blue-50 text-blue-700 border border-blue-200/80",
        emerald:
          "bg-emerald-50 text-emerald-700 border border-emerald-200/80",
        amber:
          "bg-amber-50 text-amber-700 border border-amber-200/80",
        purple:
          "bg-purple-50 text-purple-700 border border-purple-200/80",
        neutral:
          "bg-slate-100 text-slate-700 border border-slate-200",
        outline:
          "border border-slate-300 text-slate-700 bg-white",
        dark:
          "bg-slate-900 text-white border border-slate-800",
      },
      size: {
        default: "px-3 py-1 text-xs",
        sm: "px-2.5 py-0.5 text-[11px]",
        lg: "px-3.5 py-1.5 text-xs tracking-wide",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, size, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
