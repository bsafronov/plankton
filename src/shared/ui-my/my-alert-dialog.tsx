"use client";

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

type Props = Omit<ComponentPropsWithoutRef<typeof AlertDialog>, "children"> & {
  title?: string;
  trigger?: ReactNode;
  description?: string;
  cancelText?: string;
  submitText?: string;
  onSubmit: () => void;
  onCancel?: () => void;
};

export const MyAlertDialog = ({
  onSubmit,
  onCancel,
  trigger,
  cancelText = "Отмена",
  submitText = "Подтвердить",
  title = "Вы уверены?",
  description = "Это действие нельзя будет отменить.",

  ...props
}: Props) => {
  return (
    <AlertDialog {...props}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {
            <AlertDialogCancel asChild onClick={onCancel}>
              <Button variant={"outline"}>{cancelText}</Button>
            </AlertDialogCancel>
          }
          <AlertDialogAction asChild onClick={onSubmit}>
            <Button>{submitText}</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
