"use client";

import type { Position } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "~/shared/lib/trpc/react";
import { useZodForm } from "~/shared/lib/use-form";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { Input } from "~/shared/ui/input";
import { updatePositionSchema } from "../../lib/schema";

type Props = {
  onSuccess?: () => void;
  item: Position;
};

export const UpdatePositionForm = ({ onSuccess, item }: Props) => {
  const form = useZodForm(updatePositionSchema, {
    values: {
      id: item.id,
      name: item.name,
    },
  });
  const router = useRouter();

  const { mutate: updatePosition } = api.position.update.useMutation({
    onSuccess: () => {
      onSuccess?.();
      router.refresh();
      toast.success("Успешно!");
    },
    onError: () => {
      toast.error("Ошибка!");
    },
  });

  const onSubmit = form.handleSubmit((data) => updatePosition(data));

  return (
    <MyForm form={form} onSubmit={onSubmit} submitText="Создать">
      <MyFormField
        control={form.control}
        name="name"
        required
        label="Название"
        render={(props) => <Input {...props} />}
      />
    </MyForm>
  );
};
