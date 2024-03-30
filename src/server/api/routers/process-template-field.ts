import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const createSchema = z.object({
  name: z.string().min(1, "Обязательное поле"),
  type: z.enum(["STRING", "NUMBER", "BOOLEAN", "ENUM"]),
  enumId: z.number().nullable(),
  templateId: z.number(),
});

const updateSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Обязательное поле"),
  type: z.enum(["STRING", "NUMBER", "BOOLEAN", "ENUM"]).optional(),
  enumId: z.number().optional(),
});

const findManySchema = z.object({
  templateId: z.number().optional(),
  take: z.number().optional(),
  page: z.number().optional(),
});

export const processTemplateFieldRouter = createTRPCRouter({
  create: publicProcedure
    .input(createSchema)
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
    .input(updateSchema)
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
    .input(findManySchema)
    .query(async ({ ctx, input }) => {
      const { page = 1, take = 50, templateId } = input;

      return ctx.db.processTemplateField.findMany({
        where: {
          templateId,
        },
        skip: page * take - take,
        take: take,
      });
    }),
});
