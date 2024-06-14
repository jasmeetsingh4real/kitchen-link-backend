import { UserController } from "../controllers/userController";

const multer = require("multer");

const express = require("express");
export const userRouter = express.Router();

userRouter.post(
  "/saveUserDeliveryLocation",
  UserController.saveUserDeliveryLocation
);
userRouter.get(
  "/getSavedLocationDetailsByUserId",
  UserController.getSavedLocationDetailsByUserId
);
userRouter.get("/deleteUserLocation", UserController.deleteUserLocation);

userRouter.post("/createOrder", UserController.createOrder);

userRouter.post("/getOrderDetails", UserController.getOrderDetails);
