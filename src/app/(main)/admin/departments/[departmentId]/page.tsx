"use client";

import { api } from "~/shared/lib/trpc/react";
import { parseIds } from "~/shared/lib/utils";
import { MyBreadcrumb } from "~/shared/ui-my/my-breadcrumb";

type Props = {
  params: {
    departmentId: string;
  };
};

export default function Page({ params }: Props) {
  const { departmentId } = parseIds(params);

  const { data } = api.department.findUnique.useQuery(departmentId);

  return (
    <>
      <MyBreadcrumb
        items={[
          {
            title: "Панель управления",
            href: "/admin",
          },
          {
            title: "Отделы",
            href: "/admin/departments",
          },
          {
            title: data?.name,
            href: `/admin/departments/${data?.id}`,
          },
        ]}
      />
    </>
  );
}
