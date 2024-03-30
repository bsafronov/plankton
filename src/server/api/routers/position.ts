import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const createSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
});

const updateSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Обязательное поле"),
});

const findManySchema = z.object({
  take: z.number().optional(),
  page: z.number().optional(),
});

export const positionRouter = createTRPCRouter({
  create: publicProcedure
    .input(createSchema)
    .mutation(async ({ ctx, input }) => {
      const { name } = input;

      return ctx.db.position.create({
        data: {
          name,
        },
      });
    }),
  update: publicProcedure
    .input(updateSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, id } = input;

      return ctx.db.position.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return ctx.db.position.delete({
      where: {
        id: input,
      },
    });
  }),
  findUnique: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.position.findUnique({
        where: {
          id: input,
        },
      });
    }),
  findMany: publicProcedure
    .input(findManySchema)
    .query(async ({ ctx, input }) => {
      const { page = 1, take = 50 } = input;

      return ctx.db.position.findMany({
        skip: page * take - take,
        take: take,
      });
    }),
});
