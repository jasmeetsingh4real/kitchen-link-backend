import { z } from "zod";
import { EnumRestaurantStatus } from "../types/RestaurentsTypes";

export const restaurantSchema = z.object({
  ownerId: z.string().min(1),
  restaurantName: z.string().min(1),
  openingTime: z.date(),
  closingTime: z.date(),
  restaurantEmail: z.string().email(),
  restaurantContact: z.string().min(1),
  stateId: z.number(),
  countryId: z.number(),
  cityId: z.number(),
  streetAddress: z.string().min(1),
  status: z.nativeEnum(EnumRestaurantStatus).optional(),
});

export type TRestaurant = z.infer<typeof restaurantSchema>;
