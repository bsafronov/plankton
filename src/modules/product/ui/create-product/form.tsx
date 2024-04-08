"use client";

import { useZodForm } from "~/shared/lib/use-form";
import { createProductSchema } from "../../lib/product-schema";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { Input } from "~/shared/ui/input";
import { api } from "~/shared/lib/trpc/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = {
  onSuccess?: () => void;
};

export const CreateProductForm = ({ onSuccess }: Props) => {
  const form = useZodForm(createProductSchema);
  const router = useRouter();

  const { mutate: createProduct } = api.product.create.useMutation({
    onSuccess: () => {
      onSuccess?.();
      router.refresh();
      toast.success("Успешно!");
    },
    onError: () => {
      toast.error("Ошибка!");
    },
  });

  const onSubmit = form.handleSubmit((data) => createProduct(data));

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
