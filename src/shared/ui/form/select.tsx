import { type ForwardedRef, type Ref, forwardRef } from "react";
import { MySelect } from "~/shared/ui-my/my-select";
import type {
  SelectBy,
  SelectByDefault,
  SelectOptions,
  SelectProps,
} from "~/shared/ui-my/my-select/types";
import { FormDescription } from "./description";
import { FormError } from "./error";
import { FormItem } from "./item";
import { FormLabel } from "./label";
import { type FormProps } from "./types";
import { useFormId } from "./use-form-id";

type FormSelectProps = React.ComponentPropsWithoutRef<typeof MySelect> &
  FormProps;

export const FormSelectWithoutRef = (
  { label, description, error, id, ...props }: FormSelectProps,
  ref: ForwardedRef<HTMLButtonElement>,
) => {
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
};

// @eslint-ignore-next-line
// @ts-expect-error Type instantiation is excessively deep and possibly infinite.
export const FormSelect = forwardRef(FormSelectWithoutRef) as <
  Options extends SelectOptions,
  By extends SelectBy<Options> = SelectByDefault<Options>,
  Multi extends boolean = false,
>(
  props: SelectProps<Options, By, Multi> & {
    ref?: Ref<HTMLButtonElement>;
  } & FormProps,
) => JSX.Element;
