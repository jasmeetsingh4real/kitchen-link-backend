import { ZodError } from "zod";
import { myDataSource } from "../db/datasource/app-data-source";
import { RestaurantEntity } from "../entity/restaurant.entity";
import { restaurantSchema } from "../schemas/RestaurantSchemas";
import { CountriesService } from "../services/countriesService";
import { RestaurantImagesEntity } from "../entity/restaurantImages.entity";
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
      const restaurantImagesRepo = myDataSource.getRepository(
        RestaurantImagesEntity
      );
      const tempPath = req.file.path;

      const targetPath =
        process.env.DEV_RESTAURANT_IMAGES_TARGET_PATH + req.file.filename;

      // Move file
      fs.rename(tempPath, targetPath, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error saving the file");
        }
        try {
          const savedImgRes = await restaurantImagesRepo.save({
            fileName: req.file.filename,
            ownerId: req.userId,
          });
          if (!savedImgRes) {
            throw new Error("Error saving the file");
          }
          res.json({
            result: savedImgRes,
            success: true,
            errorMessage: null,
          });
        } catch (err) {
          throw new Error(
            err.message || "Something wrong while saving the image"
          );
        }
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
      const restaurantImagesRepo = myDataSource.getRepository(
        RestaurantImagesEntity
      );
      const images = await restaurantImagesRepo.find({
        where: {
          ownerId: req.userId,
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
      const restaurantImagesRepo = myDataSource.getRepository(
        RestaurantImagesEntity
      );
      await restaurantImagesRepo.delete({
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
}
