import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/shared/lib/utils";
import { type LucideIcon } from "lucide-react";

const iconButtonVariants = cva("", {
  variants: {
    variant: {
      default: "text-muted-foreground hover:text-muted-foreground/80",
      edit: "text-blue-600 hover:text-blue-500",
      delete: "text-destructive hover:text-destructive/80",
    },
    size: {
      default: "size-4",
      sm: "size-3",
      lg: "size-6",
      xl: "size-8",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

export interface IconButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    VariantProps<typeof iconButtonVariants> {
  asChild?: boolean;
  icon: LucideIcon;
}

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    { className, variant, size, icon: Icon, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(iconButtonVariants({ className }))}
        ref={ref}
        {...props}
      >
        <Icon className={cn(iconButtonVariants({ size, variant }))} />
      </Comp>
    );
  },
);
IconButton.displayName = "IconButton";

export { IconButton, iconButtonVariants };
