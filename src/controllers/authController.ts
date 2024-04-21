import { ZodError } from "zod";
import { createUserSchema, loginUserSchema } from "../schemas/UsersSchema";
import { myDataSource } from "../db/datasource/app-data-source";
import { KitchenLinkUsersEntity } from "../entity/kitchenLinkUsers.entity";
import { AuthService } from "../services/authService";
import { EnumUserRole } from "../types/AuthTypes";

export class AuthController {
  static createUser = async (req, res) => {
    try {
      const transactionResponse = await myDataSource.manager.transaction(
        async (myDataSourceTxn) => {
          const usersRepo = myDataSourceTxn.getRepository(
            KitchenLinkUsersEntity
          );
          //verify data
          const verifiedUserData = createUserSchema.parse(req.body.userDetails);
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

          return res.json({
            data: saveUserRes,
            success: true,
            errorMessage: null,
          });
        }
      );

      return transactionResponse;
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
      const isSeller = userDetails.role === EnumUserRole.SELLER;
      const token = AuthService.getAuthToken(verifiedUserData, isSeller);
      if (isSeller) {
        res.cookie("sellerAuthToken", token);
      } else {
        res.cookie("authToken", token);
      }
      //password is encrypted but still not sending to frontend.. #gang_shit
      return res.json({
        data: { ...userDetails, password: "" },
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
      const { token, isSeller } = req.body;
      const verifiedTokenRes = await AuthService.verifyAuthToken(
        token,
        isSeller
      );
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
