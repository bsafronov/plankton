"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useBoolean } from "usehooks-ts";
import { fieldTypes } from "~/entities/process-template/lib/consts";
import {
  createProcessTemplateFieldSchema,
  type CreateProcessTemplateFieldSchema,
} from "~/entities/process-template/lib/schema";
import { api } from "~/shared/lib/trpc/react";
import { MyDialog } from "~/shared/ui-my/my-dialog";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { MySelect } from "~/shared/ui-my/my-select";
import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";

type Props = {
  templateId: ID;
};

export const CreateProcessTemplateField = ({ templateId }: Props) => {
  const { value: open, toggle } = useBoolean();

  const form = useForm<CreateProcessTemplateFieldSchema>({
    resolver: zodResolver(createProcessTemplateFieldSchema),
    defaultValues: {
      name: "",
      type: "STRING",
      templateId,
      enumId: null,
    },
  });
  const fieldType = form.watch("type");
  const ctx = api.useUtils();
  const { data: enums } = api.enum.findMany.useQuery({});
  const { mutate, isPending } = api.processTemplateField.create.useMutation({
    onSuccess: () => {
      void ctx.processTemplateField.findMany.invalidate({});
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
      title="Создание поля шаблона"
      trigger={<Button variant={"outline"}>Добавить поле</Button>}
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
        <MyFormField
          control={form.control}
          name="type"
          label="Тип поля"
          render={({ onChange, ...props }) => (
            <MySelect
              options={fieldTypes}
              by="value"
              label="label"
              onChange={(v) => {
                form.setValue("enumId", null);
                onChange(v);
              }}
              {...props}
            />
          )}
        />
        {fieldType === "ENUM" && (
          <MyFormField
            control={form.control}
            name="enumId"
            label="Тип поля"
            render={(props) => <MySelect options={enums} by="id" {...props} />}
          />
        )}
      </MyForm>
    </MyDialog>
  );
};
