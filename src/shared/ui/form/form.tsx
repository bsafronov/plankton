"use client";

import { Loader2 } from "lucide-react";
import { cn } from "~/shared/lib/utils";
import { Button } from "../button";

type Props = {
  onSubmit?: () => void;
  onCancel?: () => void;
  children?: React.ReactNode;
  className?: string;
  cancelText?: string;
  submitText?: string;
  isLoading?: boolean;
  hasCancel?: boolean;
};

export const Form = ({
  onSubmit,
  onCancel,
  children,
  className,
  submitText = "Отправить",
  cancelText = "Отмена",
  hasCancel,
  isLoading,
}: Props) => {
  const handleCancel = () => onCancel?.();

  return (
    <form onSubmit={onSubmit}>
      <div className={cn("space-y-4", className)}>{children}</div>
      <div className="mt-4 flex justify-end gap-4">
        {hasCancel && (
          <Button variant={"outline"} onClick={handleCancel}>
            {cancelText}
          </Button>
        )}

        <Button disabled={isLoading} className="gap-2" type="submit">
          {isLoading && (
            <Loader2 className="animate-spin text-primary-foreground" />
          )}
          {submitText}
        </Button>
      </div>
    </form>
  );
};
