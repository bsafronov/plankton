import { z } from "zod";

export type CreatePositionSchema = z.infer<typeof createPositionSchema>;
export type UpdatePositionSchema = z.infer<typeof updatePositionSchema>;
export type FindManyPositionSchema = z.infer<typeof findManyPositionSchema>;

export const createPositionSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
});

export const updatePositionSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Обязательное поле"),
});

export const findManyPositionSchema = z.object({
  take: z.number().optional(),
  page: z.number().optional(),
});
