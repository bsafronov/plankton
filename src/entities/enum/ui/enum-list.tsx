"use client";

import { api } from "~/shared/lib/trpc/react";

export const EnumList = () => {
  const { data } = api.enum.findMany.useQuery({});

  return <div>{data?.map((item) => <div key={item.id}>{item.name}</div>)}</div>;
};
