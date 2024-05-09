import { RestaurantController } from "../controllers/restaurantController";
const multer = require("multer");

const express = require("express");
export const restaurantRouter = express.Router();

restaurantRouter.post(
  "/createRestaurant",
  RestaurantController.createRestaurant
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

restaurantRouter.post(
  "/uploadResImage",
  upload.single("image"),
  RestaurantController.uploadResImage
);
restaurantRouter.post(
  "/getRestaurantImages",
  RestaurantController.getRestaurantImages
);
restaurantRouter.post("/deleteImage", RestaurantController.deleteImage);
