"use client";

import { forwardRef } from "react";
import { type ControllerRenderProps } from "react-hook-form";
import { api } from "~/shared/lib/trpc/react";
import { MySelect } from "~/shared/ui-my/my-select";

type Props = ControllerRenderProps & {
  enumId: ID;
};

export const SelectEnumItem = forwardRef(({ enumId, ...props }: Props) => {
  const { data } = api.enumItem.findMany.useQuery({ enumId });
  return <MySelect options={data} by="id" {...props} />;
});

SelectEnumItem.displayName = "SelectEnumItem";
