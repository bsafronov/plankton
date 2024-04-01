import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createEnumSchema,
  updateEnumSchema,
  findManyEnumSchema,
} from "~/entities/enum/lib/schema";

export const enumRouter = createTRPCRouter({
  create: publicProcedure
    .input(createEnumSchema)
    .mutation(async ({ ctx, input }) => {
      const { name } = input;

      return ctx.db.enum.create({
        data: {
          name,
        },
      });
    }),
  update: publicProcedure
    .input(updateEnumSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, id } = input;

      return ctx.db.enum.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return ctx.db.enum.delete({
      where: {
        id: input,
      },
    });
  }),
  findUnique: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.enum.findUnique({
        where: {
          id: input,
        },
      });
    }),
  findMany: publicProcedure
    .input(findManyEnumSchema)
    .query(async ({ ctx, input }) => {
      const { page = 1, take = 50 } = input;

      return ctx.db.enum.findMany({
        skip: page * take - take,
        take: take,
      });
    }),
});
