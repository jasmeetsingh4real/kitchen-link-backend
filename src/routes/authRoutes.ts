import { AuthController } from "../controllers/authController";
import { verifyToken } from "../middleware/authMiddleware";

const express = require("express");
export const authRouter = express.Router();

authRouter.post("/createAccount", AuthController.createUser);
//{fullName , email , password , role='seller' }

authRouter.post("/login", AuthController.loginUser);

authRouter.post("/verifyAuthToken", AuthController.verifyAuthToken);

// authRouter.post("/sellerLogin", AuthController.sellerLogin);
