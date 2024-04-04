import { z } from "zod";

export type CreateProcessTemplateSchema = z.infer<
  typeof createProcessTemplateSchema
>;
export type UpdateProcessTemplateSchema = z.infer<
  typeof updateProcessTemplateSchema
>;
export type FindManyProcessTemplateSchema = z.infer<
  typeof findManyProcessTemplateSchema
>;

export const createProcessTemplateSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
});

export const updateProcessTemplateSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Обязательное поле"),
});

export const findManyProcessTemplateSchema = z.object({
  take: z.number().optional(),
  page: z.number().optional(),
});
