import { z } from "zod";
import {
  createProcessTemplateFlowEdgeSchema,
  findManyProcessTemplateFlowEdgeSchema,
} from "~/entities/process-template/lib/flow-edge-schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const processTemplateFlowEdgeRouter = createTRPCRouter({
  create: publicProcedure
    .input(createProcessTemplateFlowEdgeSchema)
    .mutation(async ({ ctx, input }) => {
      const {
        sourceHandle,
        sourceId,
        targetId,
        targetHandle,
        templateId,
        stageFieldId,
        value,
      } = input;

      return ctx.db.processTemplateFlowEdge.create({
        data: {
          templateId,
          sourceHandle,
          targetHandle,
          sourceId,
          targetId,
          stageFieldId,
          value,
        },
      });
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return ctx.db.processTemplateFlowEdge.delete({
      where: {
        id: input,
      },
    });
  }),
  findUnique: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.processTemplateFlowEdge.findUnique({
        where: {
          id: input,
        },
      });
    }),
  findMany: publicProcedure
    .input(findManyProcessTemplateFlowEdgeSchema)
    .query(async ({ ctx, input }) => {
      const { page = 1, take = 50, templateId } = input;

      return ctx.db.processTemplateFlowEdge.findMany({
        where: {
          templateId,
        },
        skip: page * take - take,
        take: take,
      });
    }),
});
