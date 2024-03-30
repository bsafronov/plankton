import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const createSchema = z.object({
  fromStageId: z.number(),
  toStageId: z.number(),
  stageFieldId: z.number().optional(),
  stageFieldValue: z.string().optional(),
});

const updateSchema = z.object({
  id: z.number(),
  fromStageId: z.number().optional(),
  toStageId: z.number().optional(),
  stageFieldId: z.number().optional(),
  stageFieldValue: z.string().optional(),
});

const findManySchema = z.object({
  take: z.number().optional(),
  page: z.number().optional(),
  templateId: z.number().optional(),
  stageId: z.number().optional(),
});

export const processTemplateStageFlowRouter = createTRPCRouter({
  create: publicProcedure
    .input(createSchema)
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
    .input(updateSchema)
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
    .input(findManySchema)
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
