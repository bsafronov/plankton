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
import { useStageFlow } from "~/entities/process-template/lib/use-stage-flow";
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
  const addNodeField = useStageFlow.use.addNodeField();
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
      onSuccess: (data) => {
        void ctx.processTemplateStageField.findMany.invalidate();
        addNodeField(data.stageId, data);

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
          description="Находится над полем ввода, необходимо для идентификации поля этапа"
          required
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
      </MyForm>
    </MyDialog>
  );
};
