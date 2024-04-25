import { AuthController } from "../controllers/authController";

const express = require("express");
export const authRouter = express.Router();

authRouter.post("/createAccount", AuthController.createUser);

authRouter.post("/login", AuthController.loginUser);

authRouter.post("/verifyAuthToken", AuthController.verifyAuthToken);
