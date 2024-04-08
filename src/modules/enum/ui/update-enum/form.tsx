"use client";

import type { Enum } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "~/shared/lib/trpc/react";
import { useZodForm } from "~/shared/lib/use-form";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { Input } from "~/shared/ui/input";
import { updateEnumSchema } from "../../lib/schema";

type Props = {
  onSuccess?: () => void;
  item: Enum;
};

export const UpdateEnumForm = ({ item, onSuccess }: Props) => {
  const form = useZodForm(updateEnumSchema, {
    values: {
      id: item.id,
      name: item.name,
    },
  });
  const router = useRouter();

  const { mutate: updateEnum } = api.enum.update.useMutation({
    onSuccess: () => {
      onSuccess?.();
      router.refresh();
      toast.success("Успешно!");
    },
    onError: () => {
      toast.error("Ошибка!");
    },
  });

  const onSubmit = form.handleSubmit((data) => updateEnum(data));

  return (
    <MyForm form={form} onSubmit={onSubmit} submitText="Создать">
      <MyFormField
        control={form.control}
        name="name"
        required
        label="Название"
        description="Как называется изделие?"
        render={(props) => <Input {...props} />}
      />
    </MyForm>
  );
};
