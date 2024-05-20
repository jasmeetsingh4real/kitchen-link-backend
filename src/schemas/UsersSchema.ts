import { z } from "zod";
import { EnumUserRole } from "../types/AuthTypes";

export const createUserSchema = z.object({
  id: z.string().optional(),
  email: z.string().min(1),
  password: z.string().min(1),
  fullName: z.string().min(1),
  role: z.nativeEnum(EnumUserRole).optional(),
});
export const loginUserSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type TUser = z.infer<typeof createUserSchema>;
