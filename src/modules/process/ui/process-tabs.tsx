import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/shared/ui/tabs";
import { ProcessCommentList } from "./process-comment-list";
import { ProcessLogList } from "./process-log-list";

export const ProcessTabs = () => {
  return (
    <Tabs>
      <TabsList className="w-full">
        <TabsTrigger value="comments" className="w-full">
          Комментарии
        </TabsTrigger>
        <TabsTrigger value="logs" className="w-full">
          История
        </TabsTrigger>
      </TabsList>
      <TabsContent value="comments">
        <ProcessCommentList />
      </TabsContent>
      <TabsContent value="logs">
        <ProcessLogList />
      </TabsContent>
    </Tabs>
  );
};
