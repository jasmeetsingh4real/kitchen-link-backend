import { myDataSource } from "../db/datasource/app-data-source";
import { CitiesEntity } from "../entity/cities.entity";
import { CountriesEntity } from "../entity/countries.entity";
import { AllImagesEntity } from "../entity/allImages.entity";
import { StatesEntity } from "../entity/states.entity";
import { TFoodItem } from "../schemas/RestaurantSchemas";
import { FoodItemsEntity } from "../entity/foodItems.entity";
const fs = require("fs");
export class RestaurantService {
  static uploadRestaurantImage = async (imageDetails: {
    targetPath: string;
    fileName: string;
    path: string;
    ownerId: string;
  }) => {
    const allImagesRepo = myDataSource.getRepository(AllImagesEntity);
    const imagePath = imageDetails.path + imageDetails.fileName;
    // Move file
    return fs.rename(imageDetails.targetPath, imagePath, async (err) => {
      if (err) {
        console.error(err);
        throw new Error("Error saving the file");
      }
      try {
        const savedImgRes = await allImagesRepo.save({
          fileName: imageDetails.fileName,
          ownerId: imageDetails.ownerId,
        });
        if (!savedImgRes) {
          throw new Error("Error saving the file");
        }
        return savedImgRes;
      } catch (err) {
        throw new Error(err.message || "Error saving the file");
      }
    });
  };
  static getRestaurantLocation = async (locationDetails: {
    stateId: number;
    countryId: number;
    cityId: number;
  }) => {
    const stateRepo = myDataSource.getRepository(StatesEntity);
    const countryRepo = myDataSource.getRepository(CountriesEntity);
    const cityRepo = myDataSource.getRepository(CitiesEntity);

    const restaurantState = await stateRepo.findOne({
      where: { id: locationDetails.stateId },
    });
    const restaurantCity = await cityRepo.findOne({
      where: { id: locationDetails.cityId },
    });
    const restaurantCountry = await countryRepo.findOne({
      where: { id: locationDetails.countryId },
    });

    return `${restaurantCity.name}, ${restaurantState.name}, ${restaurantCountry.name}`;
  };

  static saveOrEditFoodItem = async (foodItemData: TFoodItem) => {
    const foodItemsRepo = myDataSource.getRepository(FoodItemsEntity);
    if (!foodItemData.id) {
      await foodItemsRepo.save(foodItemData);
    } else {
      await foodItemsRepo.update(
        {
          id: foodItemData.id,
        },
        foodItemData
      );
    }
  };
  static getAllFoodItemsByRestaurantId = async (restaurantId: number) => {
    const foodItemsRepo = myDataSource.getRepository(FoodItemsEntity);
    return await foodItemsRepo.find({
      where: {
        restaurantId,
      },
    });
  };
}
