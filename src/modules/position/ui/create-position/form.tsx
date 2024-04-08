"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "~/shared/lib/trpc/react";
import { useZodForm } from "~/shared/lib/use-form";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { Input } from "~/shared/ui/input";
import { createPositionSchema } from "../../lib/schema";

type Props = {
  onSuccess?: () => void;
};

export const CreatePositionForm = ({ onSuccess }: Props) => {
  const form = useZodForm(createPositionSchema);
  const router = useRouter();

  const { mutate: createPosition } = api.position.create.useMutation({
    onSuccess: () => {
      onSuccess?.();
      router.refresh();
      toast.success("Успешно!");
    },
    onError: () => {
      toast.error("Ошибка!");
    },
  });

  const onSubmit = form.handleSubmit((data) => createPosition(data));

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
