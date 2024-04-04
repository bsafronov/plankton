import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { processTemplateRouter } from "./routers/process-template";
import { processTemplateFieldRouter } from "./routers/process-template-field";
import { enumRouter } from "./routers/enum";
import { enumItemRouter } from "./routers/enum-item";
import { positionRouter } from "./routers/position";
import { processTemplateStageRouter } from "./routers/process-template-stage";
import { processTemplateStageFieldRouter } from "./routers/process-template-stage-field";
import { departmentRouter } from "./routers/department";
import { processTemplateFlowNodeRouter } from "./routers/process-template-flow-node";
import { processTemplateFlowEdgeRouter } from "./routers/process-template-flow-edge";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  enum: enumRouter,
  enumItem: enumItemRouter,
  department: departmentRouter,
  position: positionRouter,
  processTemplate: processTemplateRouter,
  processTemplateField: processTemplateFieldRouter,
  processTemplateStage: processTemplateStageRouter,
  processTemplateStageField: processTemplateStageFieldRouter,
  processTemplateFlowNode: processTemplateFlowNodeRouter,
  processTemplateFlowEdge: processTemplateFlowEdgeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
