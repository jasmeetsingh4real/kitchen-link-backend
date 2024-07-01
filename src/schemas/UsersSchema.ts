import { z } from "zod";
import { EnumUserRole } from "../types/AuthTypes";
import { EnumOrderItemType } from "../types/RestaurentsTypes";

export const createUserSchema = z.object({
  id: z.string().optional(),
  email: z.string().min(1),
  password: z.string().min(1),
  fullName: z.string().min(1),
  role: z.nativeEnum(EnumUserRole).optional(),
});
export const loginUserSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

export type TUser = z.infer<typeof createUserSchema>;

export const delivieryLocationSchema = z.object({
  id: z.number().optional().nullable(),
  userName: z.string().min(1, "Please enter user name"),
  address: z.string().min(1),
  pincode: z.string().min(1, "please provide pincode"),
  cityId: z.number(),
  houseNo: z.string().optional(),
  streetNo: z.string().optional(),
  userId: z.string(),
});
export type TLocation = z.infer<typeof delivieryLocationSchema>;

const orderItemSchema = z.object({
  id: z.string().optional().nullable(),
  name: z.string().min(1),
  itemId: z.string().min(1),
  quantity: z.number(),
  totalAmount: z.number(),
  itemType: z.enum([
    EnumOrderItemType.FOOD_ITEM,
    EnumOrderItemType.FOOD_ITEM_OPTION,
  ]),
});
export type TOrderItem = z.infer<typeof orderItemSchema>;

export const createOrderSchema = z.object({
  totalAmount: z.number(),
  restaurantId: z.string().min(1),
  userId: z.string().min(1),
  address: delivieryLocationSchema,
  orderItems: z.array(orderItemSchema),
});

export type TCreateOrder = z.infer<typeof createOrderSchema>;
