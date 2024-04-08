import { z } from "zod";

export type CreateProductSchema = z.infer<typeof createProductSchema>;
export type UpdateProductSchema = z.infer<typeof updateProductSchema>;
export type FindManyProductSchema = z.infer<typeof findManyProductSchema>;

export const createProductSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
});

export const updateProductSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Обязательное поле"),
});

export const findManyProductSchema = z.object({
  take: z.number().optional(),
  page: z.number().optional(),
});
