import { z } from "zod";

export type CreateProcessTemplateFlowNodeSchema = z.infer<
  typeof createProcessTemplateFlowNodeSchema
>;
export type UpdateProcessTemplateFlowNodeSchema = z.infer<
  typeof updateProcessTemplateFlowNodeSchema
>;
export type FindManyProcessTemplateFlowNodeSchema = z.infer<
  typeof findManyProcessTemplateFlowNodeSchema
>;

export const createProcessTemplateFlowNodeSchema = z.object({
  posX: z.number(),
  posY: z.number(),
  stageId: z.number(),
  templateId: z.number(),
});

export const updateProcessTemplateFlowNodeSchema = z.object({
  id: z.number(),
  posX: z.number(),
  posY: z.number(),
});

export const findManyProcessTemplateFlowNodeSchema = z.object({
  take: z.number().optional(),
  page: z.number().optional(),
  templateId: z.number().optional(),
});
