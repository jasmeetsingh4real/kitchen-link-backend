"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var authController_1 = require("../controllers/authController");
var express = require("express");
exports.authRouter = express.Router();
exports.authRouter.post("/createAccount", authController_1.AuthController.createUser);
exports.authRouter.post("/login", authController_1.AuthController.loginUser);
exports.authRouter.post("/verifyAuthToken", authController_1.AuthController.verifyAuthToken);
