"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-black hover:bg-primary-600",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        delete:
          "bg-white border border-black text-black hover:text-danger hover:border-danger",
        generate:
          "bg-white border border-secondary text-secondary hover:bg-blue-50 hover:border-secondary",
        save: "bg-secondary border-none text-white hover:bg-blue-800",
        elmark: "bg-warning border border-warning text-white hover:text-black",
        excel: "bg-warning border border-warning text-white hover:text-black",
        elfile: "bg-white border border-warning text-warning hover:bg-blue-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 px-3 text-sm",
        lg: "h-11 px-8",
        icon: "h-10 w-10",
      },
      fullWidth: {
        true: "w-full",
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
  fullWidth?: boolean;
  isActive?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isActive = true,
      children,
      ...props
    },
    ref
  ) => {
    if (!isActive) return null;

    return (
      <button
        className={cn(buttonVariants({ variant, size, fullWidth }), className)}
        ref={ref}
        {...props}
        aria-label={props["aria-label"] || "button"}
        tabIndex={0}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
