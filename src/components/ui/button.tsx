import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-150 outline-none select-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:pointer-events-none disabled:opacity-50 cursor-pointer active:scale-[0.98]",
  {
    variants: {
      variant: {
        default:
          "bg-blue-600 text-white shadow-sm shadow-blue-500/25 hover:bg-blue-500 hover:shadow-md hover:shadow-blue-500/30",
        outline:
          "border border-slate-200 bg-white text-slate-800 shadow-xs hover:border-slate-300 hover:bg-slate-50 hover:text-slate-950",
        secondary:
          "bg-slate-100 text-slate-800 hover:bg-slate-200 hover:text-slate-950",
        ghost:
          "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
        link:
          "text-blue-600 underline-offset-4 hover:underline",
        pill:
          "rounded-full bg-blue-600 text-white shadow-sm shadow-blue-600/25 hover:bg-blue-500 hover:shadow-md hover:shadow-blue-600/30",
        "pill-outline":
          "rounded-full border border-slate-200 bg-white/80 text-slate-700 backdrop-blur-xs hover:border-slate-300 hover:bg-white hover:text-slate-950",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
