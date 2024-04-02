"use client";

import { ChevronLeft, Loader2 } from "lucide-react";
import { useSelectedStage } from "~/entities/process-template/lib/use-selected-stage";
import { CreateProcessTemplateStageField } from "~/features/create-process-template-stage-field";
import { UpdateProcessTemplateStage } from "~/features/update-process-template-stage";
import { api } from "~/shared/lib/trpc/react";
import { Button } from "~/shared/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/shared/ui/tabs";
import { StageFieldList } from "./stage-field-list";

export const StageItemWrapper = () => {
  const { stageId, setStageId } = useSelectedStage();
  const { data: stage } = api.processTemplateStage.findUnique.useQuery(
    stageId!,
  );

  if (!stage) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Loader2 className="size-16 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col border-b">
        <div className="p-2">
          <Button
            onClick={() => setStageId(null)}
            size={"sm"}
            variant={"ghost"}
          >
            <ChevronLeft />
            Назад
          </Button>
        </div>
        <div className="border-t p-2 text-center text-xs text-muted-foreground">
          {stage?.name}
        </div>
      </div>
      <div>
        <Tabs defaultValue="stage" className="p-2">
          <TabsList className="w-full">
            <TabsTrigger value="stage" className="w-full">
              Этап
            </TabsTrigger>
            <TabsTrigger value="field" className="w-full">
              Поля
            </TabsTrigger>
          </TabsList>
          <TabsContent value="stage">
            <UpdateProcessTemplateStage stage={stage} />
          </TabsContent>
          <TabsContent value="field">
            <CreateProcessTemplateStageField
              stageId={stage.id}
              templateId={stage.templateId}
            />
            <div className="mt-4">
              <StageFieldList
                params={{ stageId: stage.id }}
                templateId={stage.templateId}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
