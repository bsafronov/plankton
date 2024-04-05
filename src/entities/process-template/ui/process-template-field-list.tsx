"use client";

import { Check, Info, Loader2, X } from "lucide-react";
import { api } from "~/shared/lib/trpc/react";
import { Badge } from "~/shared/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/shared/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "~/shared/ui/popover";
import { fieldTypes } from "../lib/consts";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/shared/ui/tooltip";
import type { FindManyProcessTemplateFieldSchema } from "../lib/field-schema";

export const ProcessTemplateFieldList = (
  props: FindManyProcessTemplateFieldSchema,
) => {
  const { data, isLoading } = api.processTemplateField.findMany.useQuery(props);

  return (
    <Command>
      <CommandInput />
      {isLoading && (
        <div className="p-2">
          <Loader2 className="block animate-spin" />
        </div>
      )}
      {data && (
        <CommandList className="p-1">
          <CommandEmpty />
          {data.map(({ id, name, type, _count }) => (
            <CommandItem value={name} key={id} asChild className="items-start">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center gap-2">
                  <div>
                    <Tooltip>
                      <TooltipTrigger>
                        {_count.stageFields > 0 ? (
                          <Check className="size-4 text-emerald-500" />
                        ) : (
                          <X className="size-4 text-destructive" />
                        )}
                      </TooltipTrigger>
                      <TooltipContent>
                        {_count.stageFields > 0 ? (
                          <p>Поля привязаны</p>
                        ) : (
                          <p>Поля не привязаны</p>
                        )}
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div>
                    <Popover>
                      <PopoverTrigger className="flex items-center justify-center">
                        <Info className="size-4 text-muted-foreground" />
                      </PopoverTrigger>
                      <PopoverContent align="start">
                        <Details templateFieldId={id} />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span>{name}</span>
                  <Badge>
                    {fieldTypes.find((v) => v.value === type)?.label}
                  </Badge>
                </div>
              </div>
            </CommandItem>
          ))}
        </CommandList>
      )}
    </Command>
  );
};

const Details = ({ templateFieldId }: { templateFieldId: ID }) => {
  const { data } = api.processTemplateStageField.findMany.useQuery({
    templateFieldId,
    withStage: true,
  });

  return (
    <div className="flex flex-col gap-2">
      {data?.map(({ name, id, stage }) => (
        <div
          key={id}
          className="rounded-md border bg-muted/30 p-2 text-sm text-muted-foreground"
        >
          <p>
            Этап: <span className="text-foreground">{stage.name}</span>
          </p>
          <p>
            Поле: <span className="text-foreground">{name}</span>
          </p>
        </div>
      ))}
    </div>
  );
};
