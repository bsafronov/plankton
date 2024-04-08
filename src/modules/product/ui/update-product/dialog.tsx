"use client";

import type { Product } from "@prisma/client";
import { Edit } from "lucide-react";
import { useBoolean } from "usehooks-ts";
import { MyDialog } from "~/shared/ui-my/my-dialog";
import { IconButton } from "~/shared/ui/icon-button";
import { UpdateProductForm } from "./form";

type Props = {
  product: Product;
};
export const UpdateProductDialog = ({ product }: Props) => {
  const { value, toggle } = useBoolean();
  return (
    <MyDialog
      open={value}
      onOpenChange={toggle}
      trigger={<IconButton icon={Edit} variant={"edit"} />}
      title="Редактирование изделия"
    >
      <UpdateProductForm onSuccess={toggle} product={product} />
    </MyDialog>
  );
};
