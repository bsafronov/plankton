import { z } from "zod";

export const findManyProcessFieldSchema = z.object({
  processId: z.number().optional(),
  take: z.number().optional(),
  page: z.number().optional(),
});
