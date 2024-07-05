import { PaymentService } from "../services/paymentService";
import { EnumTransactionStatus } from "../types/RestaurentsTypes";

export class PaymentController {
  static initializePayment = async (req, res) => {
    try {
      if (!req.body.orderId || !req.body.mode) {
        throw new Error("Order-id not found");
      }
      const verifiedOrderDetails = await PaymentService.verifyOrderId(
        req.body.orderId,
        req.userId
      );

      await PaymentService.initializePaymentGatewayTransaction({
        orderId: req.body.orderId,
        amount: verifiedOrderDetails.totalAmount + verifiedOrderDetails.tax,
        mode: req.body.mode,
        restaurantId: verifiedOrderDetails.restaurantId,
        userId: verifiedOrderDetails.userId,
      });
      return res.json({
        result: null,
        success: true,
        errorMessage: null,
      });
    } catch (err: any) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "something went wrong",
      });
    }
  };

  static verifyPayment = async (req, res) => {
    try {
      if (!req.body.orderId) {
        throw new Error("Invalid Data");
      }

      //verify payment from payment gateway

      //on successful verification update status else throw error

      await PaymentService.updatePaymentStatus(
        req.body.orderId,
        EnumTransactionStatus.SUCCESS
      );

      //initialize delivery service

      return res.json({
        result: null,
        success: true,
        errorMessage: null,
      });
    } catch (err: any) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "something went wrong",
      });
    }
  };
  static initiateDelivery = async (req, res) => {
    try {
      if (!req.body.orderId) {
        throw new Error("Order id not found");
      }

      await PaymentService.initiateDelivery({
        orderId: req.body.orderId,
        delivereyNotes: req.body.delivereyNotes.trim(),
      });

      return res.json({
        result: null,
        success: true,
        errorMessage: null,
      });
    } catch (err: any) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "something went wrong",
      });
    }
  };
}
