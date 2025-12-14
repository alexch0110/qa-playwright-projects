import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(6).max(72),
  }),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

export const loginSchema = registerSchema;
