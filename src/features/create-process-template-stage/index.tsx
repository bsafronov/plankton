"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useBoolean } from "usehooks-ts";
import {
  type CreateProcessTemplateStageSchema,
  createProcessTemplateStageSchema,
} from "~/entities/process-template/lib/stage-schema";
import { api } from "~/shared/lib/trpc/react";
import { MyDialog } from "~/shared/ui-my/my-dialog";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { Button } from "~/shared/ui/button";
import { Textarea } from "~/shared/ui/textarea";

type Props = {
  templateId: ID;
};
export const CreateProcessTemplateStage = ({ templateId }: Props) => {
  const { value: open, toggle } = useBoolean();
  const form = useForm<CreateProcessTemplateStageSchema>({
    resolver: zodResolver(createProcessTemplateStageSchema),
    defaultValues: {
      name: "",
      templateId,
    },
  });

  const ctx = api.useUtils();
  const { mutate, isPending } = api.processTemplateStage.create.useMutation({
    onSuccess: () => {
      void ctx.processTemplateStage.findMany.invalidate();
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
      title="Создание этап шаблона"
      trigger={
        <Button variant={"outline"} className="w-full">
          <PlusCircle className="size-4" />
          Добавить этап
        </Button>
      }
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
          render={(props) => <Textarea {...props} />}
        />
      </MyForm>
    </MyDialog>
  );
};
