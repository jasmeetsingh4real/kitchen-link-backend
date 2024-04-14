import { ZodError } from "zod";
import { createUserSchema, loginUserSchema } from "../schemas/UsersSchema";
import { myDataSource } from "../db/datasource/app-data-source";
import { KitchenLinkUsersEntity } from "../entity/kitchenLinkUsers.entity";
import { AuthService } from "../services/authService";

export class AuthController {
  static createUser = async (req, res) => {
    try {
      const usersRepo = myDataSource.getRepository(KitchenLinkUsersEntity);
      //verify data
      const verifiedUserData = createUserSchema.parse(req.body);
      const existingUserDetails = await usersRepo.findOne({
        where: {
          email: verifiedUserData.email,
        },
      });
      //verify email
      if (existingUserDetails) {
        throw new Error(
          "Email already exists, Please choose a different email to signin."
        );
      }
      const hashPassword: string = await AuthService.encryptPassword(
        verifiedUserData.password
      );

      // save user data
      const saveUserRes = await usersRepo.save({
        ...verifiedUserData,
        password: hashPassword,
      });
      if (!saveUserRes) {
        throw new Error("Something went wrong while sigining in.");
      }

      //create token
      const token = AuthService.getAuthToken(verifiedUserData);

      res.cookie(token);

      return res.json({
        data: saveUserRes,
        success: true,
        errorMessage: null,
      });
    } catch (error: any) {
      if (error instanceof ZodError) {
        // Handle ZodError
        return res.json({
          data: null,
          success: false,
          errorMessage: error.errors || "something went wrong",
        });
      } else
        return res.json({
          data: null,
          success: false,
          errorMessage: error.message || "something went wrong",
        });
    }
  };

  static loginUser = async (req, res) => {
    try {
      const verifiedUserData = loginUserSchema.parse(req.body);
      const usersRepo = myDataSource.getRepository(KitchenLinkUsersEntity);
      const userDetails = await usersRepo.findOne({
        where: {
          email: verifiedUserData.email,
        },
      });
      if (!userDetails) {
        throw new Error("User not found!");
      }
      const isPasswordValid = await AuthService.verifyPassword(
        verifiedUserData.password,
        userDetails.password
      );
      if (!isPasswordValid) {
        throw new Error("Incorrect password!");
      }

      const token = AuthService.getAuthToken(verifiedUserData);
      res.cookie(token);
      return res.json({
        data: "User verified!",
        success: true,
        errorMessage: null,
      });
    } catch (error: any) {
      if (error instanceof ZodError) {
        // Handle ZodError
        return res.json({
          data: null,
          success: false,
          errorMessage: error.errors || "something went wrong",
        });
      } else
        return res.json({
          data: null,
          success: false,
          errorMessage: error.message || "something went wrong",
        });
    }
  };
  static verifyAuthToken = async (req, res) => {
    try {
      const { token } = req.body;
      const verifiedTokenRes = await AuthService.verifyAuthToken(token);
      if (!verifiedTokenRes) {
        throw new Error("Invalid Auth-Token!");
      }
      return res.json({
        data: "Token verified!",
        success: true,
        errorMessage: null,
      });
    } catch (error) {
      return res.json({
        data: null,
        success: false,
        errorMessage: error.message || "something went wrong",
      });
    }
  };
}
//demo token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkYWRhd2VkYXdkYXdkdyIsInBhc3N3b3JkIjoidGVzdHVzZXIiLCJmdWxsTmFtZSI6Imphc21lZXQiLCJpYXQiOjE3MTMxMjQ1NTZ9.NfNqVJ9QC4PtdMrAB9uVtrZitM4-PQUSOlTnA_ACZ7Y=undefined; Path=/
