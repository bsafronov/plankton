import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createProcessTemplateStageFlowSchema,
  findManyProcessTemplateStageFlowSchema,
  updateProcessTemplateStageFlowSchema,
} from "~/entities/process-template/lib/schema";

export const processTemplateStageFlowRouter = createTRPCRouter({
  create: publicProcedure
    .input(createProcessTemplateStageFlowSchema)
    .mutation(async ({ ctx, input }) => {
      const { fromStageId, toStageId, stageFieldId, stageFieldValue } = input;

      return ctx.db.processTemplateStageFlow.create({
        data: {
          fromStageId,
          toStageId,
          stageFieldId,
          stageFieldValue,
        },
      });
    }),
  update: publicProcedure
    .input(updateProcessTemplateStageFlowSchema)
    .mutation(async ({ ctx, input }) => {
      const { id, fromStageId, stageFieldId, stageFieldValue, toStageId } =
        input;

      return ctx.db.processTemplateStageFlow.update({
        where: {
          id,
        },
        data: {
          fromStageId,
          toStageId,
          stageFieldId,
          stageFieldValue,
        },
      });
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return ctx.db.processTemplateStageFlow.delete({
      where: {
        id: input,
      },
    });
  }),
  findUnique: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.processTemplateStageFlow.findUnique({
        where: {
          id: input,
        },
      });
    }),
  findMany: publicProcedure
    .input(findManyProcessTemplateStageFlowSchema)
    .query(async ({ ctx, input }) => {
      const { page = 1, take = 50, templateId } = input;

      return ctx.db.processTemplateStageFlow.findMany({
        where: {
          fromStage: {
            templateId,
          },
        },
        skip: page * take - take,
        take: take,
      });
    }),
});
