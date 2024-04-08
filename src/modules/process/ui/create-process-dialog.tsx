"use client";

import { MyDialog } from "~/shared/ui-my/my-dialog";
import { Button } from "~/shared/ui/button";
import { CreateProcessForm } from "./create-process-form";
import { useBoolean } from "usehooks-ts";

export const CreateProcessDialog = () => {
  const { value, toggle } = useBoolean();
  return (
    <MyDialog
      open={value}
      onOpenChange={toggle}
      title="Создание процесса"
      trigger={<Button>Создать процесс</Button>}
    >
      <CreateProcessForm onSuccess={toggle} />
    </MyDialog>
  );
};
