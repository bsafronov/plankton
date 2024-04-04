import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createProcessTemplateStageSchema,
  findManyProcessTemplateStageSchema,
  findUniqueProcessTemplateStageSchema,
  updateProcessTemplateStageSchema,
} from "~/entities/process-template/lib/stage-schema";

export const processTemplateStageRouter = createTRPCRouter({
  create: publicProcedure
    .input(createProcessTemplateStageSchema)
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
    .input(updateProcessTemplateStageSchema)
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
  findUniqueMutation: publicProcedure
    .input(findUniqueProcessTemplateStageSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, withFields } = input;
      return ctx.db.processTemplateStage.findUnique({
        where: {
          id,
        },
        include: {
          fields: withFields,
        },
      });
    }),
  findMany: publicProcedure
    .input(findManyProcessTemplateStageSchema)
    .query(async ({ ctx, input }) => {
      const { page = 1, take = 50, templateId, withFields } = input;

      return ctx.db.processTemplateStage.findMany({
        where: {
          templateId,
        },
        skip: page * take - take,
        take: take,
        include: {
          fields: withFields,
        },
      });
    }),
});
