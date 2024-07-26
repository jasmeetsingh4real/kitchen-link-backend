import {
  createOrderSchema,
  delivieryLocationSchema,
} from "../schemas/UsersSchema";
import { UserService } from "../services/userService";

export class UserController {
  static saveUserDeliveryLocation = async (req, res) => {
    try {
      const validatedLocationDetails = delivieryLocationSchema.safeParse({
        ...req.body,
        userId: req.userId,
      });

      if (!validatedLocationDetails.success) {
        throw new Error("Invalid Data");
      }

      await UserService.saveUserDeliveryLocation({
        ...validatedLocationDetails.data,
      });

      return res.json({
        success: true,
        errorMessage: null,
        result: null,
      });
    } catch (err: any) {
      return res.json({
        success: false,
        errorMessage: err.message || "Something went wrong",
        result: null,
      });
    }
  };
  static getSavedLocationDetailsByUserId = async (req, res) => {
    try {
      const location = await UserService.getSavedLocationDetailsByUserId(
        req.userId
      );
      return res.json({
        success: true,
        errorMessage: null,
        result: location,
      });
    } catch (err) {
      return res.json({
        success: false,
        errorMessage: err.message || "Something went wrong",
        result: null,
      });
    }
  };
  static deleteUserLocation = async (req, res) => {
    try {
      await UserService.deleteUserLocation(req.userId);

      return res.json({
        success: true,
        errorMessage: null,
        result: "location deleted",
      });
    } catch (err: any) {
      return res.json({
        success: false,
        errorMessage: err.message || "Something went wrong",
        result: null,
      });
    }
  };
  static createOrder = async (req, res) => {
    try {
      const validatedOrderDetails = createOrderSchema.safeParse({
        ...req.body,
        userId: req.userId,
        address: { ...req.body.address, userId: req.userId },
      });

      if (!validatedOrderDetails.success) {
        throw new Error("Invalid order details");
      }
      //saving user address
      if (req.body.saveLocationDetails) {
        await UserService.saveUserDeliveryLocation(
          validatedOrderDetails.data.address
        );
      }
      //creating order
      const orderId = await UserService.createOrder(validatedOrderDetails.data);

      return res.json({
        success: true,
        errorMessage: null,
        result: orderId,
      });
    } catch (err) {
      return res.json({
        success: false,
        errorMessage: err.message || "Something went wrong",
        result: null,
      });
    }
  };

  static getOrderDetails = async (req, res) => {
    try {
      if (!req?.body?.orderId) {
        throw new Error("OrderId not found");
      }

      const orderDetails = await UserService.getOrderDetails(
        req?.body?.orderId
      );

      return res.json({
        result: orderDetails,
        success: true,
        errorMessage: null,
      });
    } catch (err) {
      return res.json({
        success: false,
        errorMessage: err.message || "Something went wrong",
        result: null,
      });
    }
  };

  static getAllOrders = async (req, res) => {
    try {
      const userId = req.userId;

      const orders = await UserService.getAllOrders(userId);

      return res.json({
        result: orders,
        success: true,
        errorMessage: null,
      });
    } catch (err: any) {
      return res.json({
        success: false,
        errorMessage: err.message || "Something went wrong",
        result: null,
      });
    }
  };
}
