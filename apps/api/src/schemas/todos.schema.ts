import { z } from "zod";

export const todoCreateSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200),
  }),
  params: z.object({
    projectId: z.coerce.number().int().positive(),
  }),
  query: z.object({}).optional(),
});

export const todoUpdateSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(200).optional(),
    completed: z.boolean().optional(),
  }),
  params: z.object({
    projectId: z.coerce.number().int().positive(),
    id: z.coerce.number().int().positive(),
  }),
  query: z.object({}).optional(),
});

export const todoDeleteSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({
    projectId: z.coerce.number().int().positive(),
    id: z.coerce.number().int().positive(),
  }),
  query: z.object({}).optional(),
});
