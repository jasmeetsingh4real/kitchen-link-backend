import { DeliveryController } from "../controllers/DeliveryController";

const express = require("express");
export const deliveryRouter = express.Router();

deliveryRouter.post(
  "/getDeliveryDetails",
  DeliveryController.getDeliveryDetails
);

deliveryRouter.post("/getDeliveryStatus", DeliveryController.getDeliveryStatus);
