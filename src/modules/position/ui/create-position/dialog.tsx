"use client";

import { MyDialog } from "~/shared/ui-my/my-dialog";
import { Button } from "~/shared/ui/button";
import { useBoolean } from "usehooks-ts";
import { CreatePositionForm } from "./form";

export const CreatePositionDialog = () => {
  const { value, toggle } = useBoolean();
  return (
    <MyDialog
      open={value}
      onOpenChange={toggle}
      trigger={<Button variant={"outline"}>Добавить должность</Button>}
      title="Новая должность"
    >
      <CreatePositionForm onSuccess={toggle} />
    </MyDialog>
  );
};
