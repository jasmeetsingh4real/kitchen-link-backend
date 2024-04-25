import { ZodError } from "zod";
import { myDataSource } from "../db/datasource/app-data-source";
import { RestaurantEntity } from "../entity/restaurant.entity";
import { restaurantSchema } from "../schemas/RestaurantSchemas";
import { CountriesService } from "../services/countriesService";

export class RestaurantController {
  static createRestaurant = async (req, res) => {
    try {
      const restaurantRepo = myDataSource.getRepository(RestaurantEntity);
      const verifiedResData = restaurantSchema.parse({
        ...req.body,
        ownerId: req.userId,
      });
      await CountriesService.verifyRestaurantLoc(
        verifiedResData.countryId,
        verifiedResData.stateId,
        verifiedResData.cityId
      );
      const response = await restaurantRepo.save(verifiedResData);
      //save images in images table
      return res.json({
        data: response,
        success: true,
        errorMessage: null,
      });
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle ZodError
        return res.json({
          data: null,
          success: false,
          errorMessage: error.errors || "something went wrong",
        });
      } else
        return res.json({
          data: null,
          success: false,
          errorMessage: error.message || "something went wrong",
        });
    }
  };
}
