import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createProcessTemplateFieldSchema,
  findManyProcessTemplateFieldSchema,
  updateProcessTemplateFieldSchema,
} from "~/entities/process-template/lib/schema";

export const processTemplateFieldRouter = createTRPCRouter({
  create: publicProcedure
    .input(createProcessTemplateFieldSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, type, enumId, templateId } = input;

      return ctx.db.processTemplateField.create({
        data: {
          templateId,
          name,
          type,
          enumId,
        },
      });
    }),
  update: publicProcedure
    .input(updateProcessTemplateFieldSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, id, enumId, type } = input;

      return ctx.db.processTemplateField.update({
        where: {
          id,
        },
        data: {
          name,
          enumId,
          type,
        },
      });
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return ctx.db.processTemplateField.delete({
      where: {
        id: input,
      },
    });
  }),
  findUnique: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.processTemplateField.findUnique({
        where: {
          id: input,
        },
      });
    }),
  findMany: publicProcedure
    .input(findManyProcessTemplateFieldSchema)
    .query(async ({ ctx, input }) => {
      const { page = 1, take = 50, templateId } = input;

      return ctx.db.processTemplateField.findMany({
        where: {
          templateId,
        },
        skip: page * take - take,
        take: take,
        include: {
          _count: true,
        },
      });
    }),
});
