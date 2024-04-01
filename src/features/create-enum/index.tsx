"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useBoolean } from "usehooks-ts";
import {
  type CreateEnumSchema,
  createEnumSchema,
} from "~/entities/enum/lib/schema";
import { api } from "~/shared/lib/trpc/react";
import { MyDialog } from "~/shared/ui-my/my-dialog";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";

export const CreateEnum = () => {
  const { value: open, toggle } = useBoolean();

  const form = useForm<CreateEnumSchema>({
    resolver: zodResolver(createEnumSchema),
    defaultValues: {
      name: "",
    },
  });
  const ctx = api.useUtils();
  const { mutate, isPending } = api.enum.create.useMutation({
    onSuccess: () => {
      void ctx.enum.findMany.invalidate({});
      toast.success("Успешно!");
      form.reset();
      toggle();
    },
    onError: () => {
      toast.error("Ошибка!");
    },
  });

  const onSubmit = form.handleSubmit((data) => mutate({ ...data }));

  return (
    <MyDialog
      open={open}
      onOpenChange={toggle}
      title="Создание перечисления"
      trigger={<Button variant={"outline"}>Создать перечисление</Button>}
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
