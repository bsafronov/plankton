import { zodResolver } from "@hookform/resolvers/zod";
import { type FieldValues, useForm } from "react-hook-form";
import type { z } from "zod";

type ZodFormProps<TSchema extends FieldValues = FieldValues> = Parameters<
  typeof useForm<TSchema>
>["0"];

type Props<TSchema extends FieldValues = FieldValues> = Omit<
  NonNullable<ZodFormProps<TSchema>>,
  "resolver"
>;

export const useZodForm = <TSchema extends FieldValues = FieldValues>(
  schema: z.Schema<TSchema>,
  props?: Props<TSchema>,
) => {
  return useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    ...props,
  });
};
