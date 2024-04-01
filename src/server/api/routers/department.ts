import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import {
  createDepartmentSchema,
  updateDepartmentSchema,
  findManyDepartmentSchema,
} from "~/entities/department/lib/schema";

export const departmentRouter = createTRPCRouter({
  create: publicProcedure
    .input(createDepartmentSchema)
    .mutation(async ({ ctx, input }) => {
      const { name } = input;

      return ctx.db.department.create({
        data: {
          name,
        },
      });
    }),
  update: publicProcedure
    .input(updateDepartmentSchema)
    .mutation(async ({ ctx, input }) => {
      const { name, id } = input;

      return ctx.db.department.update({
        where: {
          id,
        },
        data: {
          name,
        },
      });
    }),
  delete: publicProcedure.input(z.number()).mutation(async ({ ctx, input }) => {
    return ctx.db.department.delete({
      where: {
        id: input,
      },
    });
  }),
  findUnique: publicProcedure
    .input(z.number())
    .query(async ({ ctx, input }) => {
      return ctx.db.department.findUnique({
        where: {
          id: input,
        },
      });
    }),
  findMany: publicProcedure
    .input(findManyDepartmentSchema)
    .query(async ({ ctx, input }) => {
      const { page = 1, take = 50 } = input;

      return ctx.db.department.findMany({
        skip: page * take - take,
        take: take,
      });
    }),
});
