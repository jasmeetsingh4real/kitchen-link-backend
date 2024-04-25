import { z } from "zod";
import { EnumRestaurantStatus } from "../types/RestaurentsTypes";

export const restaurantSchema = z.object({
  ownerId: z.string(),
  restaurantName: z.string(),
  openingTime: z.string(),
  closingTime: z.string(),
  restaurantEmail: z.string().email(),
  restaurantContact: z.string(),
  stateId: z.number(),
  countryId: z.number(),
  cityId: z.number(),
  streetAddress: z.string(),
  status: z.nativeEnum(EnumRestaurantStatus).optional(),
});

export type TRestaurant = z.infer<typeof restaurantSchema>;
