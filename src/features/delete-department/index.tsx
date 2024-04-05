"use client";

import { Trash } from "lucide-react";
import { toast } from "sonner";
import { api } from "~/shared/lib/trpc/react";
import { MyAlertDialog } from "~/shared/ui-my/my-alert-dialog";
import { IconButton } from "~/shared/ui/icon-button";

export const DeleteDepartment = ({ departmentId }: { departmentId: ID }) => {
  const ctx = api.useUtils();

  const { mutate: deleteDepartment } = api.department.delete.useMutation({
    onSuccess: async () => {
      await ctx.department.findMany.invalidate();
      toast.success("Успешно");
    },
    onError: () => {
      toast.error("Ошибка!");
    },
  });

  return (
    <MyAlertDialog
      trigger={<IconButton icon={Trash} variant={"delete"} />}
      onSubmit={() => deleteDepartment(departmentId)}
    />
  );
};
