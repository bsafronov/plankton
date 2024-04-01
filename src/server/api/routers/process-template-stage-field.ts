import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createProcessTemplateStageFieldSchema,
  findManyProcessTemplateStageFieldSchema,
  updateProcessTemplateStageFieldSchema,
} from "~/entities/process-template/lib/schema";

export const processTemplateStageFieldRouter = createTRPCRouter({
  create: publicProcedure
    .input(createProcessTemplateStageFieldSchema)
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
    .input(updateProcessTemplateStageFieldSchema)
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
    .input(findManyProcessTemplateStageFieldSchema)
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
