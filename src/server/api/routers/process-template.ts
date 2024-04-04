import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createProcessTemplateSchema,
  findManyProcessTemplateSchema,
  updateProcessTemplateSchema,
} from "~/entities/process-template/lib/template-schema";

export const processTemplateRouter = createTRPCRouter({
  create: publicProcedure
    .input(createProcessTemplateSchema)
    .mutation(async ({ ctx, input }) => {
      const { name } = input;

      return ctx.db.processTemplate.create({
        data: {
          name,
        },
      });
    }),
  update: publicProcedure
    .input(updateProcessTemplateSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, id } = input;

      return ctx.db.processTemplate.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return ctx.db.processTemplate.delete({
      where: {
        id: input,
      },
    });
  }),
  findUnique: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.processTemplate.findUnique({
        where: {
          id: input,
        },
      });
    }),
  findMany: publicProcedure
    .input(findManyProcessTemplateSchema)
    .query(async ({ ctx, input }) => {
      const { page = 1, take = 50 } = input;

      return ctx.db.processTemplate.findMany({
        skip: page * take - take,
        take: take,
      });
    }),
});
