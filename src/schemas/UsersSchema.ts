import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string(),
  password: z.string(),
  fullName: z.string(),
});
export const loginUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type TUser = z.infer<typeof createUserSchema>;
