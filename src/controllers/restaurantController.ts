import { ZodError, date } from "zod";
import { myDataSource } from "../db/datasource/app-data-source";
import { RestaurantEntity } from "../entity/restaurant.entity";
import {
  foodItemOptionSchema,
  foodItemSchema,
  restaurantSchema,
} from "../schemas/RestaurantSchemas";
import { CountriesService } from "../services/countriesService";
import { AllImagesEntity } from "../entity/allImages.entity";
import { RestaurantService } from "../services/restaurantService";
import { EnumImageType } from "../types/RestaurentsTypes";
import { ImageService } from "../services/imageService";
import { EntityManager } from "typeorm";
import moment = require("moment");
const fs = require("fs");
const path = require("path");
export class RestaurantController {
  static createRestaurant = async (req, res) => {
    try {
      const restaurantRepo = myDataSource.getRepository(RestaurantEntity);
      let verifiedResData = restaurantSchema.parse({
        ...req.body,
        ownerId: req.userId,
      });
      verifiedResData.openingTime = moment(verifiedResData.openingTime)
        .year(2024)
        .format("YYYY-MM-DD HH:mm:ss");
      verifiedResData.closingTime = moment(verifiedResData.closingTime)
        .year(2024)
        .format("YYYY-MM-DD HH:mm:ss");

      await CountriesService.verifyRestaurantLoc(
        verifiedResData.countryId,
        verifiedResData.stateId,
        verifiedResData.cityId
      );
      if (req.body.id) {
        await restaurantRepo.update(
          { id: req.body.id },
          {
            ...verifiedResData,
          }
        );
        const updateResponse = await restaurantRepo.findOne({
          where: { id: req.body.id },
        });
        return res.json({
          data: updateResponse,
          success: true,
          errorMessage: null,
        });
      }
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

  static uploadResImage = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).send("No files were uploaded.");
      }
      const restaurantRepo = myDataSource.getRepository(RestaurantEntity);
      const targetPath = process.env.DEV_RESTAURANT_IMAGES_TARGET_PATH;

      const restaurantDetails = await restaurantRepo.findOne({
        where: {
          ownerId: req.userId,
        },
      });
      if (!restaurantDetails) {
        throw new Error("Restaurant not found");
      }
      const resp = await ImageService.uploadImage({
        file: req.file,
        imageType: EnumImageType.RESTAURANT_IMAGE,
        ownerId: req.userId,
        parentId: restaurantDetails.id,
        targetPath,
      });
      console.log(resp);

      return res.json({
        data: "Image saved",
        success: true,
        errorMessage: null,
      });
    } catch (err) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "Something went wrong",
      });
    }
  };

  static getRestaurantImages = async (req, res) => {
    try {
      const allImagesRepo = myDataSource.getRepository(AllImagesEntity);
      const images = await allImagesRepo.find({
        where: {
          ownerId: req.userId,
          imageType: EnumImageType.RESTAURANT_IMAGE,
        },
      });

      return res.json({
        result: images,
        success: true,
        errorMessage: null,
      });
    } catch (err) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "Something went wrong",
      });
    }
  };

  static deleteRestaurantImage = async (req, res) => {
    try {
      if (!req.body.imageName || !req.body.id) {
        ("invalid details");
      }
      const filePath =
        process.env.DEV_RESTAURANT_IMAGES_TARGET_PATH + req.body.imageName;
      await ImageService.deleteImage({
        id: req.body.id,
        filePath,
      });
      return res.json({
        result: "image deleted",
        success: true,
        errorMessage: null,
      });
    } catch (err) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "Something went wrong",
      });
    }
  };

  static getRestaurantLocation = async (req, res) => {
    try {
      const { stateId, countryId, cityId } = req.body;
      if (!stateId || !countryId || !cityId) {
        throw new Error("Please provide restaurant id");
      }
      const RestaurantLocation = await RestaurantService.getRestaurantLocation({
        stateId,
        countryId,
        cityId,
      });
      if (!RestaurantLocation) {
        throw new Error("Restaurant loc not found");
      }
      return res.json({
        result: RestaurantLocation,
        success: true,
        errorMessage: null,
      });
    } catch (err) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "Something went wrong",
      });
    }
  };

  static saveOrEditFoodItem = async (req, res) => {
    try {
      const foodItemDetails = JSON.parse(req.body.foodItemDetails);

      if (!req.file && !foodItemDetails.id) {
        throw new Error("No files were uploaded.");
      }
      await myDataSource.transaction(async (txn: EntityManager) => {
        const restaurantRepo = txn.getRepository(RestaurantEntity);

        const restaurantDetails = await restaurantRepo.findOne({
          where: {
            ownerId: req.userId,
          },
        });
        if (!restaurantDetails) {
          throw new Error("Restaurnt details not found!");
        }
        foodItemDetails["restaurantId"] = restaurantDetails.id;
        const validatedFoodItemData = foodItemSchema.safeParse(foodItemDetails);

        if (!validatedFoodItemData.success) {
          throw new Error("Invalid data");
        }
        if (foodItemDetails) {
          validatedFoodItemData.data["id"] = foodItemDetails.id;
        } else {
          validatedFoodItemData.data["id"] = undefined;
        }
        const saveResponse = await RestaurantService.saveOrEditFoodItem(
          validatedFoodItemData.data,
          txn
        );
        if (!foodItemDetails.id) {
          await RestaurantService.saveFoodItemImage(
            req.file,
            req.userId,
            saveResponse.id,
            txn
          );
        }
      });
      return res.json({
        result: null,
        success: true,
        errorMessage: null,
      });
    } catch (err: any) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "Something went wrong",
      });
    }
  };

  static getAllFoodItems = async (req, res) => {
    try {
      const foodItems = await RestaurantService.getAllFoodItemsByOwnerId(
        req.userId
      );

      return res.json({
        result: foodItems,
        success: true,
        errorMessage: null,
      });
    } catch (err) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "Something went wrong",
      });
    }
  };
  static getCustomCategories = async (req, res) => {
    try {
      const customCategories = await RestaurantService.getCustomCategories();

      return res.json({
        result: customCategories,
        success: true,
        errorMessage: null,
      });
    } catch (err) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "Something went wrong",
      });
    }
  };
  static deleteFoodItemImage = async (req, res) => {
    try {
      if (!req.body.imageName || !req.body.id) {
        ("invalid details");
      }
      const filePath =
        process.env.DEV_FOOD_ITEM_IMAGES_TARGET_PATH + req.body.imageName;
      await ImageService.deleteImage({
        id: req.body.id,
        filePath,
      });

      return res.json({
        result: "",
        success: true,
        errorMessage: null,
      });
    } catch (err) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "Something went wrong",
      });
    }
  };
  static deleteFoodItem = async (req, res) => {
    try {
      if (!req.body.id) {
        throw new Error("Invalid request");
      }
      await RestaurantService.deleteFoodItemById(req.body.id);

      return res.json({
        result: "",
        success: true,
        errorMessage: null,
      });
    } catch (err) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "Something went wrong",
      });
    }
  };
  static getRestaurantDetailsById = async (req, res) => {
    try {
      if (!req.body.id) {
        throw new Error("Invalid request");
      }
      const restaurantDetails =
        await RestaurantService.getRestaurantDetailsById(req.body.id);
      if (!restaurantDetails) {
        throw new Error("Restaurant details not found");
      }
      return res.json({
        result: restaurantDetails,
        success: true,
        errorMessage: null,
      });
    } catch (err) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "something went wrong",
      });
    }
  };

  static getRestaurantFoodItems = async (req, res) => {
    try {
      if (!req.body.restaurantId) {
        throw new Error("Something went wrong");
      }

      const foodItems = await RestaurantService.getRestaurantFoodItems(
        req.body.restaurantId
      );

      return res.json({
        result: foodItems,
        success: true,
        errorMessage: null,
      });
    } catch (err) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "something went wrong",
      });
    }
  };
  static addFoodItemOption = async (req, res) => {
    try {
      const validatedData = foodItemOptionSchema.safeParse(req.body);
      if (!validatedData.success) {
        throw new Error("Invalid data");
      }
      await RestaurantService.addFoodItemOption(validatedData.data, req.userId);

      return res.json({
        result: "Food Option Added",
        success: true,
        errorMessage: null,
      });
    } catch (err) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "something went wrong",
      });
    }
  };

  static editFoodItemOption = async (req, res) => {
    try {
      if (!req.body.id) {
        throw new Error("Food Option id not found");
      }
      const validatedData = foodItemOptionSchema.safeParse(req.body);
      if (!validatedData.success) {
        throw new Error("Invalid data");
      }
      await RestaurantService.addFoodItemOption(validatedData.data, req.userId);
      return res.json({
        result: "Food Option Saved",
        success: true,
        errorMessage: null,
      });
    } catch (err) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "something went wrong",
      });
    }
  };
  static deleteFoodOption = async (req, res) => {
    try {
      if (!req.body.id) {
        throw new Error("FoodOption id not found");
      }
      await RestaurantService.deleteFoodOption(req.body.id);
      return res.json({
        result: "Food Option Saved",
        success: true,
        errorMessage: null,
      });
    } catch (error) {
      return res.json({
        result: null,
        success: false,
        errorMessage: error.message || "something went wrong",
      });
    }
  };
  static getFoodOptionsByFoodItemId = async (req, res) => {
    try {
      if (!req.body.id) {
        throw new Error("Please provide food option id");
      }
      const foodOptions = await RestaurantService.getFoodOptionsByFoodItemId(
        req.body.id
      );
      return res.json({
        result: foodOptions,
        success: true,
        errorMessage: null,
      });
    } catch (error) {
      return res.json({
        result: null,
        success: false,
        errorMessage: error.message || "something went wrong",
      });
    }
  };
}
