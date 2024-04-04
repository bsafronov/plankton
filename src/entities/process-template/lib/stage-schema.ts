import { z } from "zod";

export type CreateProcessTemplateStageSchema = z.infer<
  typeof createProcessTemplateStageSchema
>;
export type UpdateProcessTemplateStageSchema = z.infer<
  typeof updateProcessTemplateStageSchema
>;
export type FindUniqueProcessTemplateStageSchema = z.infer<
  typeof findUniqueProcessTemplateStageSchema
>;
export type FindManyProcessTemplateStageSchema = z.infer<
  typeof findManyProcessTemplateStageSchema
>;

export const createProcessTemplateStageSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
  templateId: z.number(),
});

export const updateProcessTemplateStageSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Обязательное поле"),
});

export const findUniqueProcessTemplateStageSchema = z.object({
  id: z.number(),
  withFields: z.boolean().optional(),
});

export const findManyProcessTemplateStageSchema = z.object({
  take: z.number().optional(),
  page: z.number().optional(),
  templateId: z.number().optional(),
  withFields: z.boolean().optional(),
});
