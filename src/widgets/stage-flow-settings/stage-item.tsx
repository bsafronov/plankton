"use client";

import { useSelectedStage } from "~/entities/process-template/lib/use-selected-stage";
import { UpdateProcessTemplateStage } from "~/features/update-process-template-stage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/shared/ui/tabs";

export const StageItem = () => {
  const stageId = useSelectedStage().stageId;

  if (!stageId) {
    return (
      <div className="flex h-full items-center justify-center">
        <h5 className="text-2xl font-semibold text-muted-foreground">
          Выберите этап
        </h5>
      </div>
    );
  }

  return (
    <div>
      <Tabs defaultValue="stage">
        <TabsList className="w-full rounded-none">
          <TabsTrigger value="stage">Этап</TabsTrigger>
          <TabsTrigger value="field">Поля</TabsTrigger>
        </TabsList>
        <TabsContent value="stage" className="p-2">
          <UpdateProcessTemplateStage stageId={stageId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
