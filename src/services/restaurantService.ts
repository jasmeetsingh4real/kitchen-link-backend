import { myDataSource } from "../db/datasource/app-data-source";
import { CitiesEntity } from "../entity/cities.entity";
import { CountriesEntity } from "../entity/countries.entity";
import { AllImagesEntity } from "../entity/allImages.entity";
import { StatesEntity } from "../entity/states.entity";
import {
  TFoodItem,
  TFoodItemOption,
  TRestaurantStaffDetails,
} from "../schemas/RestaurantSchemas";
import { FoodItemsEntity } from "../entity/foodItems.entity";
import { CustomCategoriesEntity } from "../entity/customCategories.entity";
import { EntityManager, Like } from "typeorm";
import { ImageService } from "./imageService";
import { EnumImageType } from "../types/RestaurentsTypes";
import { RestaurantEntity } from "../entity/restaurant.entity";
import { FoodItemOptionsEntity } from "../entity/foodItemOptions.entity";
import { RestaurantStaffEntity } from "../entity/restaurantStaff.entity";
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

  static getAllFoodItemsByOwnerId = async (
    userId: string,

    page: number
  ) => {
    const restaurantRepo = myDataSource.getRepository(RestaurantEntity);

    const restaurantDetails = await restaurantRepo.findOne({
      where: {
        ownerId: userId,
      },
    });
    const pagination = {
      perPage: 5,
      recordsToSkip: 0,
      page: page,
      totalRecords: 0,
      totalPages: 1,
    };
    const foodItemsRepo = myDataSource.getRepository(FoodItemsEntity);
    const [foodItems, totalItems] = await foodItemsRepo.findAndCount({
      where: {
        restaurantId: restaurantDetails.id,
      },
      relations: {
        images: true,
      },
      skip: (page - 1) * pagination.perPage,
      take: pagination.perPage,
    });
    pagination.recordsToSkip = pagination.perPage * (page - 1);
    pagination.totalRecords = totalItems;
    pagination.totalPages = Math.ceil(
      pagination.totalRecords / pagination.perPage
    );

    return { pagination, foodItems };
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
    pagination?: {
      perPage: number;
      recordsToSkip: number;
      page: number;
      totalRecords: number;
      totalPages: number;
    };
  }) => {
    const restaurantRepo = myDataSource.getRepository(RestaurantEntity);
    const query = {};
    if (props.keyword) {
      query["restaurantName"] = Like(`%${props.keyword}%`);
    }
    if (props.stateId) {
      query["stateId"] = Like(`%${props.stateId}%`);
    }
    if (props.pagination) {
      return restaurantRepo.findAndCount({
        where: query,
        relations: {
          foodItems: true,
          images: true,
        },
        skip: (props.pagination.page - 1) * props.pagination.perPage,
        take: props.pagination.perPage,
      });
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
  static getRestaurantDetailsById = async (id: string) => {
    const restaurantsRepo = myDataSource.getRepository(RestaurantEntity);
    return restaurantsRepo.findOne({
      where: {
        id,
      },
      relations: {
        images: true,
      },
    });
  };
  static getRestaurantFoodItems = async (restaurantId) => {
    const foodItemsRepo = myDataSource.getRepository(FoodItemsEntity);
    return foodItemsRepo.find({
      where: {
        restaurantId,
      },
      relations: {
        images: true,
        foodItemOptions: true,
      },
    });
  };
  static getRestaurantsByStateName = async (
    stateName: string,
    page: number
  ) => {
    const StatesRepo = myDataSource.getRepository(StatesEntity);
    const pagination = {
      perPage: 6,
      recordsToSkip: 0,
      page,
      totalRecords: 0,
      totalPages: 1,
    };
    const stateDetails = await StatesRepo.findOne({
      where: {
        name: stateName,
      },
    });
    if (!stateDetails) {
      throw new Error("Location data not found");
    }
    const [restaurants, totalItems] = await this.searchRestaurants({
      keyword: "",
      stateId: stateDetails.id,
      pagination,
    });
    if (typeof totalItems !== "number") {
      throw new Error("");
    }
    pagination.recordsToSkip = pagination.perPage * (page - 1);
    pagination.totalRecords = totalItems;
    pagination.totalPages = Math.ceil(
      pagination.totalRecords / pagination.perPage
    );
    return { restaurants, pagination };
  };

  static addFoodItemOption = async (
    foodItemOptionData: TFoodItemOption,
    userId: string
  ) => {
    if (!userId) {
      throw new Error("Please provide userId");
    }
    const foodItemOptionRepo = myDataSource.getRepository(
      FoodItemOptionsEntity
    );

    const foodItemsRepo = myDataSource.getRepository(FoodItemsEntity);

    const foodItemDetails = await foodItemsRepo.findOne({
      where: {
        id: foodItemOptionData.foodItemId,
      },
      relations: {
        restaurant: true,
      },
    });
    if (!foodItemDetails || foodItemDetails.restaurant.ownerId !== userId) {
      throw new Error("Invalid foodItem id");
    }

    await foodItemOptionRepo.save(foodItemOptionData);
  };

  static deleteFoodOption = async (id: string) => {
    const foodOptionRepo = myDataSource.getRepository(FoodItemOptionsEntity);
    await foodOptionRepo.delete({ id });
  };
  static getFoodOptionsByFoodItemId = async (id) => {
    const foodOptionRepo = myDataSource.getRepository(FoodItemOptionsEntity);
    return foodOptionRepo.find({
      where: {
        foodItemId: id,
      },
    });
  };
  static createStaff = async (data: TRestaurantStaffDetails) => {
    const restaurantStaffRepo = myDataSource.getRepository(
      RestaurantStaffEntity
    );
    const existigStaff = await restaurantStaffRepo.findOne({
      where: {
        staffName: data.staffName,
        restaurantId: data.restaurantId,
      },
    });
    if (existigStaff) {
      throw new Error(
        "Staff with similar name already exists, please choose a different name."
      );
    }
    await restaurantStaffRepo.save({
      ...data,
      age: parseInt(data.age),
      salary: parseFloat(data.salary),
    });
  };
  static getRestaurantDetailsByOwnerId = async (id: string) => {
    if (!id) {
      throw new Error("Owner id not found");
    }
    const restaurantRepo = myDataSource.getRepository(RestaurantEntity);
    const restaurantDetails = await restaurantRepo.findOne({
      where: {
        ownerId: id,
      },
    });
    if (!restaurantDetails) {
      throw new Error("Restairant details not found");
    }
    return restaurantDetails;
  };
}
