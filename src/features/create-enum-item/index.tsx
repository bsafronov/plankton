"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useBoolean } from "usehooks-ts";
import {
  type CreateEnumItemInputSchema,
  createEnumItemInputSchema,
} from "~/entities/enum/lib/schema";
import { api } from "~/shared/lib/trpc/react";
import { MyDialog } from "~/shared/ui-my/my-dialog";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";

type Props = {
  enumId: ID;
};
export const CreateEnumItem = ({ enumId }: Props) => {
  const { value: open, toggle } = useBoolean();

  const form = useForm<CreateEnumItemInputSchema>({
    resolver: zodResolver(createEnumItemInputSchema),
    defaultValues: {
      name: "",
    },
  });
  const ctx = api.useUtils();
  const { mutate, isPending } = api.enumItem.create.useMutation({
    onSuccess: () => {
      void ctx.enumItem.findMany.invalidate({ enumId });
      toast.success("Успешно!");
      form.reset();
      toggle();
    },
    onError: () => {
      toast.error("Ошибка!");
    },
  });

  const onSubmit = form.handleSubmit(({ name }) => mutate({ name, enumId }));

  return (
    <MyDialog
      open={open}
      onOpenChange={toggle}
      title="Создание элемента перечисления"
      trigger={<Button variant={"outline"}>Добавить элемент</Button>}
    >
      <MyForm
        form={form}
        onSubmit={onSubmit}
        submitText="Создать"
        isLoading={isPending}
      >
        <MyFormField
          control={form.control}
          name="name"
          label="Название"
          required
          render={(props) => <Input {...props} />}
        />
      </MyForm>
    </MyDialog>
  );
};
