"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type ProcessTemplateStage } from "@prisma/client";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  updateProcessTemplateStageSchema,
  type UpdateProcessTemplateStageSchema,
} from "~/entities/process-template/lib/schema";
import { api } from "~/shared/lib/trpc/react";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { Textarea } from "~/shared/ui/textarea";

type Props = {
  stage: ProcessTemplateStage;
  onSuccess?: () => void;
};

export const UpdateProcessTemplateStage = ({ stage, onSuccess }: Props) => {
  const form = useForm<UpdateProcessTemplateStageSchema>({
    resolver: zodResolver(updateProcessTemplateStageSchema),
    values: {
      id: stage?.id ?? 0,
      name: stage?.name ?? "",
    },
  });

  const ctx = api.useUtils();
  const { mutate, isPending } = api.processTemplateStage.update.useMutation({
    onSuccess: () => {
      void ctx.processTemplateStage.findMany.invalidate({
        templateId: stage.templateId,
      });
      void ctx.processTemplateStage.findUnique.invalidate(stage.id);
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
        render={(props) => <Textarea {...props} />}
      />
    </MyForm>
  );
};
