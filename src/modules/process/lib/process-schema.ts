import { z } from "zod";

export const createProcessSchema = z.object({
  templateId: z.number({ required_error: "Обязательное поле" }).min(1),
});
