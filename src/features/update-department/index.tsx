"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Department } from "@prisma/client";
import { Edit } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useBoolean } from "usehooks-ts";
import {
  updateDepartmentSchema,
  type UpdateDepartmentSchema,
} from "~/entities/department/lib/schema";
import { api } from "~/shared/lib/trpc/react";
import { MyDialog } from "~/shared/ui-my/my-dialog";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { IconButton } from "~/shared/ui/icon-button";
import { Input } from "~/shared/ui/input";

export const UpdateDepartment = (department: Department) => {
  const { value: open, toggle } = useBoolean();

  const form = useForm<UpdateDepartmentSchema>({
    resolver: zodResolver(updateDepartmentSchema),
    defaultValues: {
      id: department.id,
      name: department.name,
    },
  });
  const ctx = api.useUtils();
  const { mutate, isPending } = api.department.update.useMutation({
    onSuccess: () => {
      void ctx.department.findMany.invalidate({});
      toast.success("Успешно!");
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
      title="Редактирование отдела"
      trigger={<IconButton icon={Edit} variant={"edit"} />}
    >
      <MyForm
        form={form}
        onSubmit={onSubmit}
        submitText="Изменить"
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
