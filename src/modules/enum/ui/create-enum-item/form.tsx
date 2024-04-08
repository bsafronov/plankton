"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useBoolean } from "usehooks-ts";
import { api } from "~/shared/lib/trpc/react";
import { useZodForm } from "~/shared/lib/use-form";
import { MyDialog } from "~/shared/ui-my/my-dialog";
import { MyForm } from "~/shared/ui-my/my-form";
import { MyFormField } from "~/shared/ui-my/my-form-field";
import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";
import { createEnumItemInputSchema } from "../../lib/schema";

type Props = {
  enumId: ID;
};
export const CreateEnumItem = ({ enumId }: Props) => {
  const { value: open, toggle } = useBoolean();
  const router = useRouter();
  const form = useZodForm(createEnumItemInputSchema);

  const { mutate, isPending } = api.enumItem.create.useMutation({
    onSuccess: () => {
      router.refresh();
      toast.success("Успешно!");
      form.reset();
      toggle();
    },
    onError: () => {
      toast.error("Ошибка!");
    },
  });

  const onSubmit = form.handleSubmit(({ name }) => mutate({ name, enumId }));

  return (
    <MyDialog
      open={open}
      onOpenChange={toggle}
      title="Новый элемент перечисления"
      trigger={<Button variant={"outline"}>Добавить элемент</Button>}
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
      </MyForm>
    </MyDialog>
  );
};
