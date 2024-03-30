import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type {
  ControllerRenderProps,
  FieldPath,
  FieldValues,
} from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "../lib/utils";

type MyFormFieldPlacement = "checkbox";
type MyFormFieldProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Pick<
  ComponentPropsWithoutRef<typeof FormField<TFieldValues, TName>>,
  "control" | "name"
> & {
  label?: string | null;
  description?: string | null;
  className?: string;
  placement?: MyFormFieldPlacement;
  required?: boolean;
  render: (props: ControllerRenderProps<TFieldValues, TName>) => ReactNode;
};
type MyFormFieldPlacementProps = Pick<
  MyFormFieldProps,
  "className" | "description" | "label" | "placement" | "required"
> & {
  children?: ReactNode;
};
type MyFormFieldPlacementItemProps = Omit<
  MyFormFieldPlacementProps,
  "placement"
>;
type MyFormFieldPlacementList = Partial<
  Record<
    MyFormFieldPlacement,
    (props: MyFormFieldPlacementItemProps) => JSX.Element
  >
> & {
  DEFAULT: (props: MyFormFieldPlacementItemProps) => JSX.Element;
};

export const MyFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  name,
  control,
  render,
  ...props
}: MyFormFieldProps<TFieldValues, TName>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FieldPlacement {...props}>{render(field)}</FieldPlacement>
      )}
    />
  );
};

const placementList: MyFormFieldPlacementList = {
  DEFAULT: ({ children, className, description, label, required }) => (
    <FormItem className={className}>
      {label && <FormLabel required={required}>{label}</FormLabel>}
      <FormControl>{children}</FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  ),
  checkbox: ({ children, className, description, label, required }) => (
    <FormItem className={cn("flex gap-2", className)}>
      <FormControl>{children}</FormControl>
      <div className="flex flex-col">
        {label && <FormLabel required={required}>{label}</FormLabel>}
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </div>
    </FormItem>
  ),
};

const FieldPlacement = ({ placement, ...props }: MyFormFieldPlacementProps) => {
  if (!placement || !placementList[placement]?.(props)) {
    return placementList.DEFAULT(props);
  }
  return placementList[placement]?.(props);
};
