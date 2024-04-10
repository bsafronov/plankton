"use client";

import { type ForwardedRef, forwardRef } from "react";
import { type ControllerRenderProps } from "react-hook-form";
import { api } from "~/shared/lib/trpc/react";
import { MySelect } from "~/shared/ui-my/my-select";

type Props = ControllerRenderProps & {
  enumId: ID;
};

export const SelectEnumItem = forwardRef(
  ({ enumId, ...props }: Props, _ref: ForwardedRef<HTMLButtonElement>) => {
    const { data } = api.enumItem.findMany.useQuery({ enumId });
    return <MySelect options={data} by="id" {...props} />;
  },
);

SelectEnumItem.displayName = "SelectEnumItem";

export const SelectEnumItemByName = forwardRef(
  ({ enumId, ...props }: Props, _ref: ForwardedRef<HTMLButtonElement>) => {
    const { data } = api.enumItem.findMany.useQuery({ enumId });
    return <MySelect options={data} by="name" {...props} />;
  },
);

SelectEnumItemByName.displayName = "SelectEnumItemByName";
