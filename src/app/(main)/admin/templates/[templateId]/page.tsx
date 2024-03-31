"use client";

import { api } from "~/shared/lib/trpc/react";
import { parseIds } from "~/shared/lib/utils";
import { MyBreadcrumb } from "~/shared/ui-my/my-breadcrumb";

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
    </>
  );
}
