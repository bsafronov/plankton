"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "~/shared/lib/trpc/react";
import { MyAlertDialog } from "~/shared/ui-my/my-alert-dialog";
import { IconButton } from "~/shared/ui/icon-button";

type Props = {
  itemId: ID;
};
export const DeleteEnumDialog = ({ itemId }: Props) => {
  const router = useRouter();
  const { mutate: deleteEnum } = api.enum.delete.useMutation({
    onSuccess: () => {
      router.refresh();
    },
    onError: () => {
      toast.error("Ошибка!");
    },
  });

  return (
    <MyAlertDialog
      trigger={<IconButton icon={Trash} variant={"delete"} />}
      onSubmit={() => deleteEnum(itemId)}
    />
  );
};
