import { forwardRef } from "react";
import { Input } from "../input";
import { FormDescription } from "./description";
import { FormError } from "./error";
import { FormItem } from "./item";
import { FormLabel } from "./label";
import { type FormProps } from "./types";
import { useFormId } from "./use-form-id";

type FormInputProps = React.ComponentPropsWithoutRef<typeof Input> & FormProps;
export const FormInput = forwardRef<
  React.ElementRef<typeof Input>,
  FormInputProps
>(({ label, description, error, id, required, ...props }, ref) => {
  const { descriptionId, errorId, itemDescribedBy, itemId } = useFormId({
    description,
    error,
    id,
    label,
  });

  return (
    <FormItem>
      <FormLabel htmlFor={itemId} required={required}>
        {label}
      </FormLabel>
      <Input
        ref={ref}
        id={itemId}
        aria-describedby={itemDescribedBy}
        {...props}
      />
      <FormDescription id={descriptionId}>{description}</FormDescription>
      <FormError id={errorId}>{error}</FormError>
    </FormItem>
  );
});

FormInput.displayName = "FormInput";
