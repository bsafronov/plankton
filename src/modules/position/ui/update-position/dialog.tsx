"use client";

import type { Position } from "@prisma/client";
import { Edit } from "lucide-react";
import { useBoolean } from "usehooks-ts";
import { MyDialog } from "~/shared/ui-my/my-dialog";
import { IconButton } from "~/shared/ui/icon-button";
import { UpdatePositionForm } from "./form";

type Props = {
  item: Position;
};
export const UpdatePositionDialog = ({ item }: Props) => {
  const { value, toggle } = useBoolean();
  return (
    <MyDialog
      open={value}
      onOpenChange={toggle}
      trigger={<IconButton icon={Edit} variant={"edit"} />}
      title="Редактирование изделия"
    >
      <UpdatePositionForm onSuccess={toggle} item={item} />
    </MyDialog>
  );
};
