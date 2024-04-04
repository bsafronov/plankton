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

export type CreateProcessTemplateFieldSchema = z.infer<
  typeof createProcessTemplateFieldSchema
>;
export type UpdateProcessTemplateFieldSchema = z.infer<
  typeof updateProcessTemplateFieldSchema
>;
export type FindManyProcessTemplateFieldSchema = z.infer<
  typeof findManyProcessTemplateFieldSchema
>;

export type CreateProcessTemplateStageSchema = z.infer<
  typeof createProcessTemplateStageSchema
>;
export type UpdateProcessTemplateStageSchema = z.infer<
  typeof updateProcessTemplateStageSchema
>;
export type FindManyProcessTemplateStageSchema = z.infer<
  typeof findManyProcessTemplateStageSchema
>;

export type CreateProcessTemplateStageFieldSchema = z.infer<
  typeof createProcessTemplateStageFieldSchema
>;
export type UpdateProcessTemplateStageFieldSchema = z.infer<
  typeof updateProcessTemplateStageFieldSchema
>;
export type FindManyProcessTemplateStageFieldSchema = z.infer<
  typeof findManyProcessTemplateStageFieldSchema
>;

export type CreateProcessTemplateStageFlowchema = z.infer<
  typeof createProcessTemplateStageFlowSchema
>;
export type UpdateProcessTemplateStageFlowSchema = z.infer<
  typeof updateProcessTemplateStageFlowSchema
>;
export type FindManyProcessTemplateStageFlowSchema = z.infer<
  typeof findManyProcessTemplateStageFlowSchema
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

export const createProcessTemplateStageFlowSchema = z.object({
  fromStageId: z.number(),
  toStageId: z.number(),
  stageFieldId: z.number().optional(),
  stageFieldValue: z.string().optional(),
});

export const updateProcessTemplateStageFlowSchema = z.object({
  id: z.number(),
  fromStageId: z.number().optional(),
  toStageId: z.number().optional(),
  stageFieldId: z.number().optional(),
  stageFieldValue: z.string().optional(),
});

export const findManyProcessTemplateStageFlowSchema = z.object({
  take: z.number().optional(),
  page: z.number().optional(),
  templateId: z.number().optional(),
  stageId: z.number().optional(),
});
