"use client";

import { MyDialog } from "~/shared/ui-my/my-dialog";
import { Button } from "~/shared/ui/button";
import { CreateProductForm } from "./form";
import { useBoolean } from "usehooks-ts";

export const CreateProductDialog = () => {
  const { value, toggle } = useBoolean();
  return (
    <MyDialog
      open={value}
      onOpenChange={toggle}
      trigger={<Button variant={"outline"}>Добавить изделие</Button>}
      title="Новое изделие"
    >
      <CreateProductForm onSuccess={toggle} />
    </MyDialog>
  );
};
