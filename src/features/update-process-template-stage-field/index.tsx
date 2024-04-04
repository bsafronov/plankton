"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  type UpdateProcessTemplateStageFieldSchema,
  updateProcessTemplateStageFieldSchema,
} from "~/entities/process-template/lib/stage-field-schema";
import { useStageFlow } from "~/entities/process-template/lib/use-stage-flow";
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
  const updateNodeField = useStageFlow.use.updateNodeField();
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
      onSuccess: (data) => {
        void ctx.processTemplateStageField.findMany.invalidate();
        toast.success("Успешно!");
        updateNodeField(data.stageId, data);
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
        description="Находится над полем ввода, необходимо для идентификации поля этапа"
        required
        render={(props) => <Input {...props} />}
      />
      <MyFormField
        control={form.control}
        name="placeholder"
        description="Находится внутри поля ввода и служит подсказкой к вводимому значению"
        label="Плейсхолдер"
        render={(props) => <Input {...props} />}
      />
      <MyFormField
        control={form.control}
        name="description"
        description="Находится ниже поля ввода и описывает роль поля в форме"
        label="Описание"
        render={(props) => <Input {...props} />}
      />
      <MyFormField
        control={form.control}
        name="templateFieldId"
        description="К какому полю шаблона будет привязан результат ввода"
        label="Ссылка на поле шаблона"
        required
        render={(props) => <MySelect options={fields} by="id" {...props} />}
      />
    </MyForm>
  );
};
