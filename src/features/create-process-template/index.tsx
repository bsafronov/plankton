"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { api } from "~/shared/lib/trpc/react";
import { MyDialog } from "~/shared/ui-my/my-dialog";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { Button } from "~/shared/ui/button";
import { Textarea } from "~/shared/ui/textarea";

const createSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
});

export const CreateProcessTemplate = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate } = api.processTemplate.create.useMutation({
    onSuccess: ({ id }) => {
      router.refresh();
      router.push(`/admin/templates/${id}`);
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
      <MyForm form={form} onSubmit={onSubmit} submitText="Создать">
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
