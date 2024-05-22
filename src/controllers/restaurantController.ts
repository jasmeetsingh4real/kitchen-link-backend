import { ZodError } from "zod";
import { myDataSource } from "../db/datasource/app-data-source";
import { RestaurantEntity } from "../entity/restaurant.entity";
import { foodItemSchema, restaurantSchema } from "../schemas/RestaurantSchemas";
import { CountriesService } from "../services/countriesService";
import { AllImagesEntity } from "../entity/allImages.entity";
import { RestaurantService } from "../services/restaurantService";
import { EnumImageType } from "../types/RestaurentsTypes";
import { ImageService } from "../services/imageService";
const fs = require("fs");
const path = require("path");
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
      if (req.body.id) {
        await restaurantRepo.update({ id: req.body.id }, verifiedResData);
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

      const targetPath = process.env.DEV_RESTAURANT_IMAGES_TARGET_PATH;

      const resp = await ImageService.uploadImage({
        file: req.file,
        imageType: EnumImageType.RESTAURANT_IMAGE,
        ownerId: req.userId,
        parentId: null,
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

  static deleteImage = async (req, res) => {
    try {
      const allImagesRepo = myDataSource.getRepository(AllImagesEntity);
      await allImagesRepo.delete({
        id: req.body.id,
      });
      const filePath =
        process.env.DEV_RESTAURANT_IMAGES_TARGET_PATH + req.body.imageName;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return;
        }
        console.log("File deleted successfully");
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
      const validatedFoodItemData = foodItemSchema.safeParse(req.body);

      if (!validatedFoodItemData.success) {
        throw new Error("Invalid data");
      }
      await RestaurantService.saveOrEditFoodItem(validatedFoodItemData.data);
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
      const { restaurantId } = req.body;
      if (!restaurantId) {
        throw new Error("Please provide restaurantId");
      }
      const foodItems = await RestaurantService.getAllFoodItemsByRestaurantId(
        restaurantId
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
}
