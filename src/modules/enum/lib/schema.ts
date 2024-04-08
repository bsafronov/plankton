import { z } from "zod";

export type CreateEnumItemSchema = z.infer<typeof createEnumItemSchema>;
export type CreateEnumItemInputSchema = z.infer<
  typeof createEnumItemInputSchema
>;
export type UpdateEnumItemSchema = z.infer<typeof updateEnumItemSchema>;
export type FindManyEnumItemSchema = z.infer<typeof findManyEnumItemSchema>;

export type CreateEnumSchema = z.infer<typeof createEnumSchema>;
export type UpdateEnumSchema = z.infer<typeof updateEnumSchema>;
export type FindManyEnumSchema = z.infer<typeof findManyEnumSchema>;

export const createEnumSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
});

export const updateEnumSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Обязательное поле"),
});

export const findManyEnumSchema = z.object({
  take: z.number().optional(),
  page: z.number().optional(),
});

export const createEnumItemInputSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
});
export const createEnumItemSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
  enumId: z.number(),
});

export const updateEnumItemSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Обязательное поле"),
});

export const findManyEnumItemSchema = z.object({
  take: z.number().optional(),
  page: z.number().optional(),
  enumId: z.number().optional(),
});
