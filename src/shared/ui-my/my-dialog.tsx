import type { ComponentPropsWithoutRef, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "../lib/utils";

type Props = ComponentPropsWithoutRef<typeof Dialog> & {
  title: string;
  trigger?: ReactNode;
  description?: string;
  footer?: ReactNode;
  className?: string;
  classNameContent?: string;
  classNameFooter?: string;
  full?: boolean;
};

export const MyDialog = ({
  title,
  trigger,
  children,
  description,
  footer,
  className,
  classNameFooter,
  classNameContent,
  full,
  ...props
}: Props) => {
  return (
    <Dialog {...props}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent
        className={cn(full && "h-[90%] w-[90%] max-w-none", classNameContent)}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className={className}>{children}</div>
        {footer && (
          <DialogFooter className={classNameFooter}>{footer}</DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
