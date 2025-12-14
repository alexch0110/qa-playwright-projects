import { z } from "zod";

export const projectCreateSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(120),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const projectUpdateSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(120),
  }),
  params: z.object({
    id: z.coerce.number().int().positive(),
  }),
  query: z.object({}).optional(),
});
