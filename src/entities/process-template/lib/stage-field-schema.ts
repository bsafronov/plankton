import { z } from "zod";

export type CreateProcessTemplateStageFieldSchema = z.infer<
  typeof createProcessTemplateStageFieldSchema
>;
export type UpdateProcessTemplateStageFieldSchema = z.infer<
  typeof updateProcessTemplateStageFieldSchema
>;
export type FindManyProcessTemplateStageFieldSchema = z.infer<
  typeof findManyProcessTemplateStageFieldSchema
>;

export const createProcessTemplateStageFieldSchema = z.object({
  stageId: z.number(),
  templateFieldId: z.number({ required_error: "Обязательное поле" }),
  name: z.string().min(1, "Обязательное поле"),
  description: z.string().optional(),
  placeholder: z.string().optional(),
});

export const updateProcessTemplateStageFieldSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Обязательное поле"),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  templateFieldId: z.number().optional(),
});

export const findManyProcessTemplateStageFieldSchema = z.object({
  take: z.number().optional(),
  page: z.number().optional(),
  templateId: z.number().optional(),
  stageId: z.number().optional(),
  templateFieldId: z.number().optional(),
  withStage: z.boolean().optional(),
});
