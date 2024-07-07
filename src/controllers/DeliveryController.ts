import { DeliveryService } from "../services/DeliveryService";

export class DeliveryController {
  static getDeliveryDetails = async (req, res) => {
    try {
      if (!req.body.deliveryId || !req.userId) {
        throw new Error("Invalid request");
      }
      const deliveryDetails = await DeliveryService.getDeliveryDetails(
        req.body.deliveryId,
        req.userId
      );
      return res.json({
        result: deliveryDetails,
        success: true,
        errorMessage: null,
      });
    } catch (err: any) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "Something went wrong",
      });
    }
  };

  static getDeliveryStatus = async (req, res) => {
    try {
      if (!req.body.deliveryId) {
        throw new Error("Invalid request");
      }
      const status = await DeliveryService.getDeliveryStatus(
        req.body.deliveryId
      );
      return res.json({
        result: status,
        success: true,
        errorMessage: null,
      });
    } catch (err: any) {
      return res.json({
        result: null,
        success: false,
        errorMessage: err.message || "Something went wrong",
      });
    }
  };
}
