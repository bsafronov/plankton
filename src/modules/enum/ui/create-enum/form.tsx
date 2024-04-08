"use client";

import { useZodForm } from "~/shared/lib/use-form";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { Input } from "~/shared/ui/input";
import { api } from "~/shared/lib/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createEnumSchema } from "../../lib/schema";

type Props = {
  onSuccess?: () => void;
};

export const CreateEnumForm = ({ onSuccess }: Props) => {
  const form = useZodForm(createEnumSchema);
  const router = useRouter();

  const { mutate: createEnum } = api.enum.create.useMutation({
    onSuccess: () => {
      onSuccess?.();
      router.refresh();
      toast.success("Успешно!");
    },
    onError: () => {
      toast.error("Ошибка!");
    },
  });

  const onSubmit = form.handleSubmit((data) => createEnum(data));

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
