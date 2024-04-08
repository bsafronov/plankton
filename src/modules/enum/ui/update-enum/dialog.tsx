"use client";

import type { Enum } from "@prisma/client";
import { Edit } from "lucide-react";
import { useBoolean } from "usehooks-ts";
import { MyDialog } from "~/shared/ui-my/my-dialog";
import { IconButton } from "~/shared/ui/icon-button";
import { UpdateEnumForm } from "./form";

type Props = {
  item: Enum;
};
export const UpdateEnumDialog = ({ item }: Props) => {
  const { value, toggle } = useBoolean();
  return (
    <MyDialog
      open={value}
      onOpenChange={toggle}
      trigger={<IconButton icon={Edit} variant={"edit"} />}
      title="Редактирование изделия"
    >
      <UpdateEnumForm onSuccess={toggle} item={item} />
    </MyDialog>
  );
};
