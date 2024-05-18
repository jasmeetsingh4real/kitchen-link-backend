import { CommonController } from "../controllers/commonController";

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
