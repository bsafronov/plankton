"use client";

import { MyDialog } from "~/shared/ui-my/my-dialog";
import { Button } from "~/shared/ui/button";
import { CreateEnumForm } from "./form";
import { useBoolean } from "usehooks-ts";

export const CreateEnumDialog = () => {
  const { value, toggle } = useBoolean();
  return (
    <MyDialog
      open={value}
      onOpenChange={toggle}
      trigger={<Button variant={"outline"}>Добавить перечисление</Button>}
      title="Новое перечисление"
    >
      <CreateEnumForm onSuccess={toggle} />
    </MyDialog>
  );
};
