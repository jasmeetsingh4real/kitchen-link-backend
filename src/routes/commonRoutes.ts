import { CommonController } from "../controllers/commonController";
import { RestaurantController } from "../controllers/restaurantController";

const express = require("express");
export const commonRouter = express.Router();

commonRouter.post("/getCountriesByName", CommonController.getCountriesByName);
commonRouter.post(
  "/getStatesByCountryCode",
  CommonController.getStatesByCountryCode
);
commonRouter.post(
  "/getCitiesByStateCode",
  CommonController.getCitiesByStateCode
);
commonRouter.post("/getCountryById", CommonController.getCountryById);

commonRouter.post("/searchRestaurants", CommonController.searchRestaurants);

commonRouter.post(
  "/getRestaurantsByStateName",
  CommonController.getRestaurantsByStateName
);
commonRouter.post(
  "/getRestaurantDetailsById",
  RestaurantController.getRestaurantDetailsById
);
commonRouter.post(
  "/getRestaurantFoodItems",
  RestaurantController.getRestaurantFoodItems
);
