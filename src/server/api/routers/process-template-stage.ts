import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const createSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
  templateId: z.number(),
});

const updateSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Обязательное поле"),
});

const findManySchema = z.object({
  take: z.number().optional(),
  page: z.number().optional(),
  templateId: z.number().optional(),
});

export const processTemplateStageRouter = createTRPCRouter({
  create: publicProcedure
    .input(createSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, templateId } = input;

      return ctx.db.processTemplateStage.create({
        data: {
          name,
          templateId,
        },
      });
    }),
  update: publicProcedure
    .input(updateSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, id } = input;

      return ctx.db.processTemplateStage.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return ctx.db.processTemplateStage.delete({
      where: {
        id: input,
      },
    });
  }),
  findUnique: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.processTemplateStage.findUnique({
        where: {
          id: input,
        },
      });
    }),
  findMany: publicProcedure
    .input(findManySchema)
    .query(async ({ ctx, input }) => {
      const { page = 1, take = 50, templateId } = input;

      return ctx.db.processTemplateStage.findMany({
        where: {
          templateId,
        },
        skip: page * take - take,
        take: take,
      });
    }),
});
