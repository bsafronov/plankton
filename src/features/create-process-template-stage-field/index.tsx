"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useBoolean } from "usehooks-ts";
import {
  type CreateProcessTemplateStageFieldSchema,
  createProcessTemplateStageFieldSchema,
} from "~/entities/process-template/lib/schema";
import { api } from "~/shared/lib/trpc/react";
import { MyDialog } from "~/shared/ui-my/my-dialog";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { MySelect } from "~/shared/ui-my/my-select";
import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";

type Props = {
  stageId: ID;
  templateId: ID;
};
export const CreateProcessTemplateStageField = ({
  stageId,
  templateId,
}: Props) => {
  const { value: open, toggle } = useBoolean();
  const form = useForm<CreateProcessTemplateStageFieldSchema>({
    resolver: zodResolver(createProcessTemplateStageFieldSchema),
    defaultValues: {
      name: "",
      description: "",
      placeholder: "",
      stageId,
    },
  });
  const { data: fields } = api.processTemplateField.findMany.useQuery({
    templateId,
  });
  const ctx = api.useUtils();
  const { mutate, isPending } =
    api.processTemplateStageField.create.useMutation({
      onSuccess: () => {
        void ctx.processTemplateStageField.findMany.invalidate();
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
      title="Создание поля этапа шаблона"
      trigger={
        <Button variant={"outline"} className="w-full">
          <PlusCircle className="size-4" />
          Добавить поле
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
    </MyDialog>
  );
};
