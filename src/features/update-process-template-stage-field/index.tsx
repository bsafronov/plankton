"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  updateProcessTemplateStageFieldSchema,
  type UpdateProcessTemplateStageFieldSchema,
} from "~/entities/process-template/lib/schema";
import { api } from "~/shared/lib/trpc/react";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { MySelect } from "~/shared/ui-my/my-select";
import { Input } from "~/shared/ui/input";

type Props = {
  stageFieldId: ID;
  templateId: ID;
  onSuccess?: () => void;
};

export const UpdateProcessTemplateStageField = ({
  stageFieldId,
  templateId,
  onSuccess,
}: Props) => {
  const { data: stageField } =
    api.processTemplateStageField.findUnique.useQuery(stageFieldId);

  const form = useForm<UpdateProcessTemplateStageFieldSchema>({
    resolver: zodResolver(updateProcessTemplateStageFieldSchema),
    values: {
      id: stageField?.id ?? 0,
      templateFieldId: stageField?.templateFieldId ?? 0,
      name: stageField?.name ?? "",
      description: stageField?.description ?? "",
      placeholder: stageField?.placeholder ?? "",
    },
  });

  const { data: fields } = api.processTemplateField.findMany.useQuery({
    templateId,
  });

  const ctx = api.useUtils();
  const { mutate, isPending } =
    api.processTemplateStageField.update.useMutation({
      onSuccess: () => {
        void ctx.processTemplateStageField.findMany.invalidate({
          stageId: stageField?.stageId,
        });
        toast.success("Успешно!");
        onSuccess?.();
      },
      onError: () => {
        toast.error("Ошибка!");
      },
    });

  const onSubmit = form.handleSubmit((data) => mutate({ ...data }));

  return (
    <MyForm
      form={form}
      onSubmit={onSubmit}
      isLoading={isPending}
      submitText="Изменить"
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
        name="placeholder"
        label="Плейсхолдер"
        required
        render={(props) => <Input {...props} />}
      />
      <MyFormField
        control={form.control}
        name="description"
        label="Описание"
        required
        render={(props) => <Input {...props} />}
      />
      <MyFormField
        control={form.control}
        name="templateFieldId"
        label="Ссылка на поле шаблона"
        render={(props) => <MySelect options={fields} by="id" {...props} />}
      />
    </MyForm>
  );
};
