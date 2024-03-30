import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const createSchema = z.object({
  stageId: z.number(),
  name: z.string().min(1, "Обязательное поле"),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  templateFieldId: z.number().optional(),
});

const updateSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Обязательное поле"),
  description: z.string().optional(),
  placeholder: z.string().optional(),
  templateFieldId: z.number().optional(),
});

const findManySchema = z.object({
  take: z.number().optional(),
  page: z.number().optional(),
  templateId: z.number().optional(),
  stageId: z.number().optional(),
});

export const processTemplateStageFieldRouter = createTRPCRouter({
  create: publicProcedure
    .input(createSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, stageId, description, placeholder, templateFieldId } =
        input;

      return ctx.db.processTemplateStageField.create({
        data: {
          stageId,
          name,
          description,
          placeholder,
          templateFieldId,
        },
      });
    }),
  update: publicProcedure
    .input(updateSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, id, description, placeholder, templateFieldId } = input;

      return ctx.db.processTemplateStageField.update({
        where: {
          id,
        },
        data: {
          name,
          description,
          placeholder,
          templateFieldId,
        },
      });
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return ctx.db.processTemplateStageField.delete({
      where: {
        id: input,
      },
    });
  }),
  findUnique: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.processTemplateStageField.findUnique({
        where: {
          id: input,
        },
      });
    }),
  findMany: publicProcedure
    .input(findManySchema)
    .query(async ({ ctx, input }) => {
      const { page = 1, take = 50, templateId, stageId } = input;

      return ctx.db.processTemplateStageField.findMany({
        where: {
          stageId,
          stage: {
            templateId,
          },
        },
        skip: page * take - take,
        take: take,
      });
    }),
});
