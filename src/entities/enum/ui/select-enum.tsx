"use client";

import { forwardRef } from "react";
import { type ControllerRenderProps } from "react-hook-form";
import { api } from "~/shared/lib/trpc/react";
import { MySelect } from "~/shared/ui-my/my-select";

type Props = ControllerRenderProps;

export const SelectEnum = forwardRef(({ ...props }: Props) => {
  const { data } = api.enum.findMany.useQuery({});

  return <MySelect options={data} by="id" {...props} />;
});

SelectEnum.displayName = "SelectEnum";
