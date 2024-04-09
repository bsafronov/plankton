import { findManyProcessFieldSchema } from "~/modules/process/lib/field-schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const processFieldRouter = createTRPCRouter({
  findMany: publicProcedure
    .input(findManyProcessFieldSchema)
    .query(({ ctx, input }) => {
      const { processId, page = 1, take = 50 } = input;

      return ctx.db.processField.findMany({
        where: {
          processId,
        },
        take,
        skip: page * take - take,
      });
    }),
});
