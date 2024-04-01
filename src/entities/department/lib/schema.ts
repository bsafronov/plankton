import { z } from "zod";

export type CreateDepartmentSchema = z.infer<typeof createDepartmentSchema>;
export type UpdateDepartmentSchema = z.infer<typeof updateDepartmentSchema>;
export type FindManyDepartmentSchema = z.infer<typeof findManyDepartmentSchema>;

export const createDepartmentSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
});

export const updateDepartmentSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Обязательное поле"),
});

export const findManyDepartmentSchema = z.object({
  take: z.number().optional(),
  page: z.number().optional(),
});
