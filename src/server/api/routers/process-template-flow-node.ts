import { z } from "zod";
import {
  createProcessTemplateFlowNodeSchema,
  findManyProcessTemplateFlowNodeSchema,
  updateProcessTemplateFlowNodeSchema,
} from "~/entities/process-template/lib/flow-node-schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const processTemplateFlowNodeRouter = createTRPCRouter({
  create: publicProcedure
    .input(createProcessTemplateFlowNodeSchema)
    .mutation(async ({ ctx, input }) => {
      const { posX, posY, stageId, templateId } = input;

      return ctx.db.processTemplateFlowNode.create({
        data: {
          posX,
          posY,
          stageId,
          templateId,
        },
      });
    }),
  update: publicProcedure
    .input(updateProcessTemplateFlowNodeSchema)
    .mutation(async ({ ctx, input }) => {
      const { posX, posY, id } = input;

      return ctx.db.processTemplateFlowNode.update({
        where: {
          id,
        },
        data: {
          posX,
          posY,
        },
      });
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return ctx.db.processTemplateFlowNode.delete({
      where: {
        id: input,
      },
    });
  }),
  findUnique: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.processTemplateFlowNode.findUnique({
        where: {
          id: input,
        },
      });
    }),
  findMany: publicProcedure
    .input(findManyProcessTemplateFlowNodeSchema)
    .query(async ({ ctx, input }) => {
      const { page = 1, take = 50, templateId } = input;

      return ctx.db.processTemplateFlowNode.findMany({
        where: {
          templateId,
        },
        skip: page * take - take,
        take: take,
      });
    }),
});
