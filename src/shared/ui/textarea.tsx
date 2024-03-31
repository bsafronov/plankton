import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from "react";
import TextareaAutosize from "react-textarea-autosize";
import { cn } from "../lib/utils";

export const Textarea = forwardRef<
  ElementRef<typeof TextareaAutosize>,
  ComponentPropsWithoutRef<typeof TextareaAutosize>
>(({ className, ...props }, ref) => {
  return (
    <TextareaAutosize
      ref={ref}
      className={cn(
        "flex w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault();

          const form = e.currentTarget.closest("form");
          if (form) {
            form.requestSubmit();
          }
          return e;
        }
        return props.onKeyDown?.(e);
      }}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";
