import { myDataSource } from "../db/datasource/app-data-source";
import { CitiesEntity } from "../entity/cities.entity";
import { CountriesEntity } from "../entity/countries.entity";
import { AllImagesEntity } from "../entity/allImages.entity";
import { StatesEntity } from "../entity/states.entity";
import { TFoodItem } from "../schemas/RestaurantSchemas";
import { FoodItemsEntity } from "../entity/foodItems.entity";
import { CustomCategoriesEntity } from "../entity/customCategories.entity";
import { EntityManager, Like } from "typeorm";
import { ImageService } from "./imageService";
import { EnumImageType } from "../types/RestaurentsTypes";
import { RestaurantEntity } from "../entity/restaurant.entity";
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

  static saveOrEditFoodItem = async (
    foodItemData: TFoodItem,
    txn: EntityManager
  ) => {
    if (!foodItemData.id) {
      foodItemData.id = undefined;
    }
    const foodItemsRepo = txn.getRepository(FoodItemsEntity);
    return await foodItemsRepo.save(foodItemData);
  };

  static getAllFoodItemsByRestaurantId = async (userId: string) => {
    const restaurantRepo = myDataSource.getRepository(RestaurantEntity);
    const restaurantDetails = await restaurantRepo.findOne({
      where: {
        ownerId: userId,
      },
    });
    const foodItemsRepo = myDataSource.getRepository(FoodItemsEntity);
    return await foodItemsRepo.find({
      where: {
        restaurantId: restaurantDetails.id,
      },
      relations: {
        images: true,
      },
    });
  };
  static getCustomCategories = async () => {
    const customCategoriesRepo = myDataSource.getRepository(
      CustomCategoriesEntity
    );
    return await customCategoriesRepo.find();
  };
  static saveFoodItemImage = async (
    file,
    ownerId,
    foodItemId,
    txn: EntityManager
  ) => {
    const targetPath = process.env.DEV_FOOD_ITEM_IMAGES_TARGET_PATH;
    await ImageService.uploadImage({
      file,
      imageType: EnumImageType.FOOD_ITEM_IMAGE,
      ownerId,
      parentId: foodItemId,
      targetPath,
      txn,
    });
  };

  static deleteFoodItemById = async (id: string) => {
    await myDataSource.transaction(async (txn: EntityManager) => {
      const imagesRepo = txn.getRepository(AllImagesEntity);
      const imageDetails = await imagesRepo.findOne({
        where: {
          parentId: id,
        },
      });
      if (imageDetails) {
        const filePath =
          process.env.DEV_FOOD_ITEM_IMAGES_TARGET_PATH + imageDetails.fileName;
        ImageService.deleteImage({
          filePath,
          id: imageDetails.id,
        }),
          txn;
      }
      const foodItemsRepo = txn.getRepository(FoodItemsEntity);
      await foodItemsRepo.delete({
        id,
      });
    });
  };
  static searchRestaurants = async (props: {
    stateId: number;
    keyword: string;
  }) => {
    const restaurantRepo = myDataSource.getRepository(RestaurantEntity);
    const query = {};
    if (props.keyword) {
      query["restaurantName"] = Like(`%${props.keyword}%`);
    }
    if (props.stateId) {
      query["stateId"] = Like(`%${props.stateId}%`);
    }

    return restaurantRepo.find({
      where: query,
      relations: {
        foodItems: true,
        images: true,
      },
      take: 10,
    });
  };
}
