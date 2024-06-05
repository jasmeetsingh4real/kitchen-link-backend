import { RestaurantController } from "../controllers/restaurantController";
import { upload } from "../helpers/multerHelper";
const multer = require("multer");

const express = require("express");
export const restaurantRouter = express.Router();

restaurantRouter.post(
  "/createRestaurant",
  RestaurantController.createRestaurant
);

restaurantRouter.post(
  "/uploadResImage",
  upload.single("image"),
  RestaurantController.uploadResImage
);
restaurantRouter.post(
  "/getRestaurantImages",
  RestaurantController.getRestaurantImages
);
restaurantRouter.post(
  "/getRestaurantLocation",
  RestaurantController.getRestaurantLocation
);
restaurantRouter.post(
  "/deleteRestaurantImage",
  RestaurantController.deleteRestaurantImage
);

restaurantRouter.get("/getAllFoodItems", RestaurantController.getAllFoodItems);

restaurantRouter.get(
  "/getCustomCategories",
  RestaurantController.getCustomCategories
);

restaurantRouter.post(
  "/saveOrEditFoodItem",
  upload.single("image"),
  RestaurantController.saveOrEditFoodItem
);

restaurantRouter.post(
  "/deleteFoodItemImage",
  RestaurantController.deleteFoodItemImage
);
restaurantRouter.post("/deleteFoodItem", RestaurantController.deleteFoodItem);

restaurantRouter.post(
  "/addFoodItemOption",
  RestaurantController.addFoodItemOption
);
restaurantRouter.post(
  "/editFoodItemOption",
  RestaurantController.editFoodItemOption
);
restaurantRouter.post(
  "/deleteFoodOption",
  RestaurantController.deleteFoodOption
);
restaurantRouter.post(
  "/getFoodOptionsByFoodItemId",
  RestaurantController.getFoodOptionsByFoodItemId
);
