"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { api } from "~/shared/lib/trpc/react";
import { MyAlertDialog } from "~/shared/ui-my/my-alert-dialog";
import { IconButton } from "~/shared/ui/icon-button";

type Props = {
  processId: ID;
};
export const DeleteProcessDialog = ({ processId }: Props) => {
  const router = useRouter();
  const { mutate: deleteProcess } = api.process.delete.useMutation({
    onSuccess: () => {
      router.push("/admin/processes");
      router.refresh();
    },
  });

  return (
    <MyAlertDialog
      trigger={<IconButton icon={Trash} variant={"delete"} />}
      onSubmit={() => deleteProcess(processId)}
    />
  );
};
