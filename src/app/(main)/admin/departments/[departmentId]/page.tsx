"use client";

import { links } from "~/modules/_app/lib/links";
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
          links.adminPanel.index,
          links.adminPanel.departments.index,
          links.adminPanel.departments.id(data?.name, departmentId),
        ]}
      />
    </>
  );
}
