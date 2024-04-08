import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createProductSchema,
  findManyProductSchema,
  updateProductSchema,
} from "~/modules/product/lib/product-schema";

export const productRouter = createTRPCRouter({
  create: publicProcedure
    .input(createProductSchema)
    .mutation(async ({ ctx, input }) => {
      const { name } = input;

      return ctx.db.product.create({
        data: {
          name,
        },
      });
    }),
  update: publicProcedure
    .input(updateProductSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, id } = input;

      return ctx.db.product.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return ctx.db.product.delete({
      where: {
        id: input,
      },
    });
  }),
  findUnique: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.product.findUnique({
        where: {
          id: input,
        },
      });
    }),
  findMany: publicProcedure
    .input(findManyProductSchema)
    .query(async ({ ctx, input }) => {
      const { page = 1, take = 50 } = input;

      return ctx.db.product.findMany({
        skip: page * take - take,
        take: take,
      });
    }),
});
