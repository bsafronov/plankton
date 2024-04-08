import { useId } from "react";
import type { FormProps } from "./types";
import { cn } from "~/shared/lib/utils";

type Props = {
  id?: string;
} & FormProps;

export const useFormId = ({ id, description, error }: Props) => {
  const itemGeneratedId = useId();
  const descriptionId = useId();
  const errorId = useId();
  const itemId = id ?? itemGeneratedId;
  const itemDescribedBy = cn(description && descriptionId, error && errorId);

  return {
    itemId,
    descriptionId,
    errorId,
    itemDescribedBy,
  };
};
