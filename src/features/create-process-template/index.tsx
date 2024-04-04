"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  type CreateProcessTemplateSchema,
  createProcessTemplateSchema,
} from "~/entities/process-template/lib/template-schema";
import { api } from "~/shared/lib/trpc/react";
import { MyDialog } from "~/shared/ui-my/my-dialog";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { Button } from "~/shared/ui/button";
import { Textarea } from "~/shared/ui/textarea";

export const CreateProcessTemplate = () => {
  const router = useRouter();
  const form = useForm<CreateProcessTemplateSchema>({
    resolver: zodResolver(createProcessTemplateSchema),
    defaultValues: {
      name: "",
    },
  });

  const ctx = api.useUtils();
  const { mutate, isPending } = api.processTemplate.create.useMutation({
    onSuccess: ({ id }) => {
      router.push(`/admin/templates/${id}`);
      void ctx.processTemplate.findMany.invalidate();
      toast.success("Успешно!");
    },
    onError: () => {
      toast.error("Ошибка!");
    },
  });

  const onSubmit = form.handleSubmit((data) => mutate({ ...data }));

  return (
    <MyDialog
      title="Создание шаблона"
      trigger={<Button variant={"outline"}>Создать шаблон</Button>}
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
