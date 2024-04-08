"use client";

import type { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "~/shared/lib/trpc/react";
import { useZodForm } from "~/shared/lib/use-form";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { Input } from "~/shared/ui/input";
import { updateProductSchema } from "../../lib/product-schema";

type Props = {
  onSuccess?: () => void;
  product: Product;
};

export const UpdateProductForm = ({ onSuccess, product }: Props) => {
  const form = useZodForm(updateProductSchema, {
    values: {
      id: product.id,
      name: product.name,
    },
  });
  const router = useRouter();

  const { mutate: updateProduct } = api.product.update.useMutation({
    onSuccess: () => {
      onSuccess?.();
      router.refresh();
      toast.success("Успешно!");
    },
    onError: () => {
      toast.error("Ошибка!");
    },
  });

  const onSubmit = form.handleSubmit((data) => updateProduct(data));

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
