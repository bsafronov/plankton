import { forwardRef } from "react";
import { MySelect } from "~/shared/ui-my/my-select";
import { FormDescription } from "./description";
import { FormError } from "./error";
import { FormItem } from "./item";
import { FormLabel } from "./label";
import { type FormProps } from "./types";
import { useFormId } from "./use-form-id";

type FormSelectProps = React.ComponentPropsWithoutRef<typeof MySelect> &
  FormProps;

export const FormSelect = forwardRef<
  React.ElementRef<typeof MySelect>,
  FormSelectProps
>(({ label, description, error, id, ...props }, ref) => {
  const { descriptionId, errorId, itemDescribedBy, itemId } = useFormId({
    description,
    error,
    id,
    label,
  });

  return (
    <FormItem>
      <FormLabel htmlFor={itemId}>{label}</FormLabel>
      <MySelect
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

FormSelect.displayName = "FormSelect";
