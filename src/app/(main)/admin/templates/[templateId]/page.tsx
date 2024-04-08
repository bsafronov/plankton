"use client";

import Link from "next/link";
import { ProcessTemplateFieldList } from "~/entities/process-template/ui/process-template-field-list";
import { CreateProcessTemplateField } from "~/features/create-process-template-field";
import { BorderingStages } from "~/modules/process-template/bordering-stages";
import { api } from "~/shared/lib/trpc/react";
import { parseIds } from "~/shared/lib/utils";
import { MyBreadcrumb } from "~/shared/ui-my/my-breadcrumb";
import { Button } from "~/shared/ui/button";

type Props = {
  params: {
    templateId: string;
  };
};

export default function Page({ params }: Props) {
  const { templateId } = parseIds(params);
  const { data: template } =
    api.processTemplate.findUnique.useQuery(templateId);

  return (
    <>
      <MyBreadcrumb
        items={[
          {
            title: "Панель управления",
            href: "/admin",
          },
          {
            title: "Шаблоны",
            href: "/admin/templates",
          },
          {
            title: template?.name,
            href: `/admin/templates/${template?.id}`,
          },
        ]}
      />

      <div className="space-y-4 p-4">
        <div className="flex gap-2">
          <CreateProcessTemplateField templateId={templateId} />
          <Button asChild variant={"outline"}>
            <Link href={`/admin/templates/${template?.id}/schema`}>Схема</Link>
          </Button>
        </div>
        <ProcessTemplateFieldList templateId={templateId} />
        <BorderingStages templateId={templateId} />
      </div>
    </>
  );
}
