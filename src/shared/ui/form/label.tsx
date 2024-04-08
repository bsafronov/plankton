import { forwardRef } from "react";
import { Label } from "../label";

type FormLabelProps = React.ComponentPropsWithoutRef<typeof Label> & {
  required?: boolean;
};

export const FormLabel = forwardRef<
  React.ElementRef<typeof Label>,
  FormLabelProps
>(({ children, required, ...props }, ref) => {
  if (!children) return null;

  return (
    <Label ref={ref} {...props}>
      {children}&nbsp;
      {required ? <span className="text-red-500">*</span> : null}
    </Label>
  );
});

FormLabel.displayName = "FormLabel";
