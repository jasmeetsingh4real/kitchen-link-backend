import { z } from "zod";
import {
  EnumDietryInfo,
  EnumRestaurantStatus,
} from "../types/RestaurentsTypes";

export const restaurantSchema = z.object({
  id: z.string().optional(),
  ownerId: z.string().min(1),
  restaurantName: z.string().min(1),
  openingTime: z.string().min(1),
  closingTime: z.string().min(1),
  restaurantEmail: z.string().email(),
  restaurantContact: z.string().min(1),
  stateId: z.number(),
  countryId: z.number(),
  cityId: z.number(),
  streetAddress: z.string().min(1),
  status: z.nativeEnum(EnumRestaurantStatus).optional(),
});

export type TRestaurant = z.infer<typeof restaurantSchema>;

export const foodItemSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  price: z.number().positive(),
  ingredients: z.string().optional(),
  dietryInfo: z.nativeEnum(EnumDietryInfo),
  foodItemSlugId: z.number().optional(),
  restaurantId: z.string(),
});
type TZodFoodItem = z.infer<typeof foodItemSchema>;

export type TFoodItem = TZodFoodItem & {
  id?: string;
};

export const foodItemOptionSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  price: z.number(),
  foodItemId: z.string().min(1),
});

export type TFoodItemOption = z.infer<typeof foodItemOptionSchema>;

export const restaurantStaffSchema = z.object({
  id: z.number().optional(),
  staffName: z.string().min(1),
  role: z.enum(["delivery", "admin", "employee", "chef"]),
  age: z.string().min(1),
  phoneNo: z.string().min(1),
  email: z.string().email(),
  isActive: z.boolean(),
  salary: z.string().min(1),
  password: z.string().min(1),
});

type TRestaurantStaff = z.infer<typeof restaurantStaffSchema>;
export type TRestaurantStaffDetails = TRestaurantStaff & {
  restaurantId: string;
};
