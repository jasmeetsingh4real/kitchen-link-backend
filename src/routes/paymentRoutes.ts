import { PaymentController } from "../controllers/paymentController";

const express = require("express");
export const paymentRouter = express.Router();

paymentRouter.post("/initializePayment", PaymentController.initializePayment);

paymentRouter.post("/verifyPayment", PaymentController.verifyPayment);
