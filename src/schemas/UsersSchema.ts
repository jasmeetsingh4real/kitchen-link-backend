import { z } from "zod";
import { EnumUserRole } from "../types/AuthTypes";

export const createUserSchema = z.object({
  id: z.string().optional(),
  email: z.string(),
  password: z.string(),
  fullName: z.string(),
  role: z.nativeEnum(EnumUserRole).optional(),
});
export const loginUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type TUser = z.infer<typeof createUserSchema>;
