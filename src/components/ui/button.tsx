import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "f4f-inline-flex f4f-items-center f4f-justify-center f4f-gap-2 f4f-whitespace-nowrap f4f-text-sm f4f-font-medium f4f-ring-offset-background f4f-transition-colors focus-visible:f4f-outline-none focus-visible:f4f-ring-2 focus-visible:f4f-ring-ring focus-visible:f4f-ring-offset-2 disabled:f4f-pointer-events-none disabled:f4f-opacity-50 [&_svg]:f4f-pointer-events-none [&_svg]:f4f-size-4 [&_svg]:f4f-shrink-0",
  {
    variants: {
      variant: {
        default:
          "f4f-bg-primary f4f-text-primary-foreground hover:f4f-bg-primary/90",
        destructive:
          "f4f-bg-destructive f4f-text-destructive-foreground hover:f4f-bg-destructive/90",
        outline:
          "f4f-border f4f-border-input f4f-bg-background hover:f4f-bg-accent hover:f4f-text-accent-foreground",
        secondary:
          "f4f-bg-secondary f4f-text-secondary-foreground hover:f4f-bg-secondary/80",
        ghost: "hover:f4f-bg-accent hover:f4f-text-accent-foreground",
        link: "f4f-text-primary f4f-underline-offset-4 hover:f4f-underline",
      },
      size: {
        default: "f4f-h-10 f4f-px-4 f4f-py-2",
        sm: "f4f-h-9 f4f-px-3",
        lg: "f4f-h-11 f4f-px-8",
        icon: "f4f-h-10 f4f-w-10",
      },
      rounded: {
        md: "f4f-rounded-md",
        full: "f4f-rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, rounded, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, rounded, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
