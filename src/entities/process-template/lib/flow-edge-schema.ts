import { z } from "zod";

export type CreateProcessTemplateFlowEdgeSchema = z.infer<
  typeof createProcessTemplateFlowEdgeSchema
>;
// export type UpdateProcessTemplateFlowEdgeSchema = z.infer<
//   typeof updateProcessTemplateFlowEdgeSchema
// >;
export type FindManyProcessTemplateFlowEdgeSchema = z.infer<
  typeof findManyProcessTemplateFlowEdgeSchema
>;

export const createProcessTemplateFlowEdgeSchema = z.object({
  templateId: z.number(),
  sourceHandle: z.string(),
  targetHandle: z.string(),
  sourceId: z.number(),
  targetId: z.number(),
  stageFieldId: z.number().optional(),
  value: z.string().optional(),
});

// export const updateProcessTemplateFlowEdgeSchema = z.object({
//   id: z.number(),
// });

export const findManyProcessTemplateFlowEdgeSchema = z.object({
  take: z.number().optional(),
  page: z.number().optional(),
  templateId: z.number().optional(),
});
