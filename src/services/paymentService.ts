import { deliveryProxy } from "../axios/deliveryProxy";
import { myDataSource } from "../db/datasource/app-data-source";
import { OrdersEntity } from "../entity/orders.entity";
import { TransactionsEntity } from "../entity/transactions.entity";
import {
  EnumOrderStatus,
  EnumTransactionStatus,
} from "../types/RestaurentsTypes";

export class PaymentService {
  static verifyOrderId = async (orderId: string, userId: string) => {
    const ordersRepo = myDataSource.getRepository(OrdersEntity);
    const orderDetails = await ordersRepo.findOne({
      where: {
        id: orderId,
        status: EnumOrderStatus.PENDING,
        userId,
      },
    });
    if (!orderDetails) {
      throw new Error("Invalid Order-id");
    }
    return orderDetails;
  };

  static initializePaymentGatewayTransaction = async (paymentDetails: {
    orderId: string;
    amount: number;
    mode: "cod" | "upi";
    restaurantId: string;
    userId: string;
  }) => {
    const transactionsRepo = myDataSource.getRepository(TransactionsEntity);
    await transactionsRepo.save({
      orderId: paymentDetails.orderId,
      amount: paymentDetails.amount,
      states: EnumTransactionStatus.INITIALIZED,
      remark: "kitchen-link payment",
      userId: paymentDetails.userId,
      restaurantId: paymentDetails.restaurantId,
      transactionMode: paymentDetails.mode,
    });
  };

  static updatePaymentStatus = async (
    orderId: string,
    status: EnumTransactionStatus
  ) => {
    const transactionsRepo = myDataSource.getRepository(TransactionsEntity);
    const ordersRepo = myDataSource.getRepository(OrdersEntity);

    await transactionsRepo.update(
      {
        orderId,
      },
      {
        status,
      }
    );
    await ordersRepo.update(
      {
        id: orderId,
      },
      {
        status: EnumOrderStatus.SUCCESSFUL,
      }
    );
  };

  static initiateDelivery = async (data: {
    orderId: string;
    delivereyNotes?: string;
  }) => {
    await deliveryProxy("post", "/delivery/createDelivery", data);
  };
}
