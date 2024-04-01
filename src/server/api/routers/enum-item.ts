import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createEnumItemSchema,
  findManyEnumItemSchema,
  updateEnumItemSchema,
} from "~/entities/enum/lib/schema";

export const enumItemRouter = createTRPCRouter({
  create: publicProcedure
    .input(createEnumItemSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, enumId } = input;

      return ctx.db.enumItem.create({
        data: {
          enumId,
          name,
        },
      });
    }),
  update: publicProcedure
    .input(updateEnumItemSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, id } = input;

      return ctx.db.enumItem.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return ctx.db.enumItem.delete({
      where: {
        id: input,
      },
    });
  }),
  findUnique: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.enumItem.findUnique({
        where: {
          id: input,
        },
      });
    }),
  findMany: publicProcedure
    .input(findManyEnumItemSchema)
    .query(async ({ ctx, input }) => {
      const { page = 1, take = 50, enumId } = input;

      return ctx.db.enumItem.findMany({
        where: {
          enumId,
        },
        skip: page * take - take,
        take: take,
      });
    }),
});
