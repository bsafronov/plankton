import { createProcessSchema } from "~/modules/process/lib/process-schema";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const processRouter = createTRPCRouter({
  create: publicProcedure
    .input(createProcessSchema)
    .mutation(async ({ ctx, input }) => {
      const { templateId } = input;

      const startNode = await ctx.db.processTemplateFlowNode.findFirst({
        where: {
          templateId,
          targetFlowEdges: {
            none: {},
          },
        },
        include: {
          stage: true,
        },
      });

      if (!startNode) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Начальный этап не найден!",
        });
      }

      const process = await ctx.db.process.create({
        data: {
          templateId,
        },
        include: {
          template: {
            include: {
              fields: true,
              stages: true,
            },
          },
        },
      });

      await ctx.db.processField.createMany({
        data: process.template.fields.map((field) => ({
          processId: process.id,
          templateFieldId: field.id,
        })),
      });

      await ctx.db.processStage.createMany({
        data: process.template.stages.map((stage) => ({
          processId: process.id,
          templateStageId: stage.id,
        })),
      });

      const firstStage = await ctx.db.processStage.findFirst({
        where: {
          templateStageId: startNode.stageId,
        },
      });

      await ctx.db.process.update({
        where: {
          id: process.id,
        },
        data: {
          currentStageId: firstStage?.id,
        },
      });

      return process;
    }),
  findMany: publicProcedure.query(({ ctx }) => {
    return ctx.db.process.findMany({
      include: {
        currentStage: {
          select: {
            templateStage: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
  }),
});
