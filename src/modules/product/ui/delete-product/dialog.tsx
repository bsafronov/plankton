"use client";

import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "~/shared/lib/trpc/react";
import { MyAlertDialog } from "~/shared/ui-my/my-alert-dialog";
import { IconButton } from "~/shared/ui/icon-button";

type Props = {
  productId: ID;
};
export const DeleteProductDialog = ({ productId }: Props) => {
  const router = useRouter();
  const { mutate: deleteProduct } = api.product.delete.useMutation({
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
      onSubmit={() => deleteProduct(productId)}
    />
  );
};
