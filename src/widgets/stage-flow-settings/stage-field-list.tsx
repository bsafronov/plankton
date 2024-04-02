"use client";

import { Loader2 } from "lucide-react";
import { type FindManyProcessTemplateStageFieldSchema } from "~/entities/process-template/lib/schema";
import { api } from "~/shared/lib/trpc/react";
import {
  Command,
  CommandEmpty,
  CommandItem,
  CommandList,
} from "~/shared/ui/command";

export const StageFieldList = (
  props: FindManyProcessTemplateStageFieldSchema,
) => {
  const { data } = api.processTemplateStageField.findMany.useQuery(props);

  return <div>{data?.map(({ id, name }) => <div key={id}>{name}</div>)}</div>;
};
