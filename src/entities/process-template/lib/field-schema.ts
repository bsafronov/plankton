import { z } from "zod";

export type CreateProcessTemplateFieldSchema = z.infer<
  typeof createProcessTemplateFieldSchema
>;
export type UpdateProcessTemplateFieldSchema = z.infer<
  typeof updateProcessTemplateFieldSchema
>;
export type FindManyProcessTemplateFieldSchema = z.infer<
  typeof findManyProcessTemplateFieldSchema
>;

export const createProcessTemplateFieldSchema = z
  .object({
    name: z.string().min(1, "Обязательное поле"),
    type: z.enum(["STRING", "NUMBER", "BOOLEAN", "ENUM"]),
    enumId: z.number().nullable(),
    templateId: z.number(),
  })
  .superRefine(({ type, enumId }, ctx) => {
    if (type === "ENUM" && !enumId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Обязательное поле",
        path: ["enumId"],
      });
    }
  });

export const updateProcessTemplateFieldSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Обязательное поле"),
  type: z.enum(["STRING", "NUMBER", "BOOLEAN", "ENUM"]).optional(),
  enumId: z.number().optional(),
});

export const findManyProcessTemplateFieldSchema = z.object({
  templateId: z.number().optional(),
  take: z.number().optional(),
  page: z.number().optional(),
});
