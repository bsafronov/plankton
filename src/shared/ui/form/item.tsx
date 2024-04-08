import { forwardRef } from "react";

export const FormItem = forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div">
>(({ ...props }, ref) => {
  return (
    <div ref={ref} className="flex flex-col items-start gap-1" {...props} />
  );
});

FormItem.displayName = "FormItem";
