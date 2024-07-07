import { myDataSource } from "../db/datasource/app-data-source";
import { DeliveriesEntity } from "../entity/deliveries.entity";

export class DeliveryService {
  static getDeliveryDetails = async (deiveryId: number, userId: string) => {
    const deliveryRepo = myDataSource.getRepository(DeliveriesEntity);

    const deliveryDetails = await deliveryRepo.findOne({
      where: {
        id: deiveryId,  
        order: {
          userId,
        },
      },
      relations: {
        order: {
          order_items: true,
        },
      },
    });
    if (!deliveryDetails) {
      throw new Error("Order details not found");
    }
    return deliveryDetails;
  };

  static getDeliveryStatus = async (deliveyId: number) => {
    const deliveryRepo = myDataSource.getRepository(DeliveriesEntity);
    const status = await deliveryRepo.findOne({
      where: {
        id: deliveyId,
      },
      select: {
        status: true,
      },
    });
    if (!status) {
      throw new Error("status not found");
    }
    return status;
  };
}
