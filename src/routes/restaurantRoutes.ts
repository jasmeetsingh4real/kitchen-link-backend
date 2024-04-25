import { RestaurantController } from "../controllers/restaurantController";

const express = require("express");
export const restaurantRouter = express.Router();

restaurantRouter.post(
  "/createRestaurant",
  RestaurantController.createRestaurant
);
