"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { api } from "~/shared/lib/trpc/react";
import { useZodForm } from "~/shared/lib/use-form";
import { Form } from "~/shared/ui/form/form";
import { FormInput } from "~/shared/ui/form/input";
import { createProductSchema } from "../../lib/product-schema";

type Props = {
  onSuccess?: () => void;
};

export const CreateProductForm = ({ onSuccess }: Props) => {
  const { register, handleSubmit } = useZodForm(createProductSchema);
  const router = useRouter();

  const { mutate: createProduct, isPending } = api.product.create.useMutation({
    onSuccess: () => {
      onSuccess?.();
      router.refresh();
      toast.success("Успешно!");
    },
    onError: () => {
      toast.error("Ошибка!");
    },
  });

  const onSubmit = handleSubmit((data) => createProduct(data));

  return (
    <Form onSubmit={onSubmit} submitText="Создать" isLoading={isPending}>
      <FormInput {...register("name")} label="Название" required />
    </Form>
  );
};
