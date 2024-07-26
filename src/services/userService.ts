import { EntityManager, In } from "typeorm";
import { myDataSource } from "../db/datasource/app-data-source";
import { CitiesEntity } from "../entity/cities.entity";
import { DeliveryLocationEntity } from "../entity/deliveryLocation.entity";
import { TCreateOrder, TLocation, TOrderItem } from "../schemas/UsersSchema";
import { OrdersEntity } from "../entity/orders.entity";
import { EnumOrderItemType } from "../types/RestaurentsTypes";
import { FoodItemsEntity } from "../entity/foodItems.entity";
import { FoodItemOptionsEntity } from "../entity/foodItemOptions.entity";
import { OrdersItemsEntity } from "../entity/ordersItems.entity";
import { RestaurantEntity } from "../entity/restaurant.entity";
import { RestaurantService } from "./restaurantService";

export class UserService {
  static saveUserDeliveryLocation = async (locatonData: TLocation) => {
    const cityRepo = myDataSource.getRepository(CitiesEntity);

    const cityData = await cityRepo.findOne({
      where: {
        id: locatonData.cityId,
      },
    });
    if (!cityData) {
      throw new Error("Invalid city");
    }

    const locationRepo = myDataSource.getRepository(DeliveryLocationEntity);

    const existingLocation = await locationRepo.findOne({
      where: {
        userId: locatonData.userId,
      },
    });
    if (existingLocation) {
      await locationRepo.update(
        {
          userId: locatonData.userId,
        },
        locatonData
      );
    } else {
      await locationRepo.save(locatonData);
    }
  };

  static getSavedLocationDetailsByUserId = async (id: string) => {
    if (!id) {
      throw new Error("Please provide user id");
    }
    const locationRepo = myDataSource.getRepository(DeliveryLocationEntity);
    const location = await locationRepo.findOne({
      where: {
        userId: id,
      },
    });
    if (!location) {
      throw new Error("location not found");
    } else {
      return location;
    }
  };
  static deleteUserLocation = async (id) => {
    if (!id) {
      throw new Error("User-Id not found");
    }
    const userLocationRepo = myDataSource.getRepository(DeliveryLocationEntity);
    await userLocationRepo.delete({ userId: id });
  };

  static getTotalOrderAmmount = async (
    orderItems: TOrderItem[],
    restaurantId: string
  ) => {
    const foodItemRepo = myDataSource.getRepository(FoodItemsEntity);
    const foodOptionsRepo = myDataSource.getRepository(FoodItemOptionsEntity);
    let totalFoodOptionsAmount = 0;
    let totalFoodItemsAmount = 0;

    let foodItemsInDb: FoodItemsEntity[] | undefined = undefined;
    let foodOptionsInDb: FoodItemOptionsEntity[] | undefined = undefined;
    const foodItems = orderItems.filter(
      (item) => item.itemType === EnumOrderItemType.FOOD_ITEM
    );

    if (foodItems.length > 0) {
      const foodItemIds = foodItems.map((foodItem) => foodItem.itemId);

      foodItemsInDb = await foodItemRepo.find({
        where: {
          id: In(foodItemIds),
          restaurantId,
        },
      });

      if (foodItemsInDb.length !== foodItems.length) {
        throw new Error("invalid order details");
      }

      foodItemsInDb.forEach((foodItemInDb) => {
        const itemDetails = foodItems.find(
          (item) => item.itemId === foodItemInDb.id
        );
        totalFoodItemsAmount += foodItemInDb.price * itemDetails.quantity;
      });
    }
    const foodOptions = orderItems.filter(
      (item) => item.itemType === EnumOrderItemType.FOOD_ITEM_OPTION
    );
    if (foodOptions.length > 0) {
      const foodOptionIds = foodOptions.map((foodOption) => foodOption.itemId);
      //TODO : ADD RESTAURANT_ID IN FOOD_OPTIONS TABLE
      foodOptionsInDb = await foodOptionsRepo.find({
        where: {
          id: In(foodOptionIds),
        },
      });

      if (foodOptionsInDb.length !== foodOptions.length) {
        throw new Error("invalid order details");
      }

      foodOptionsInDb.forEach((foodOptionInDb) => {
        const foodOptionsDetails = foodOptions.find(
          (item) => item.itemId === foodOptionInDb.id
        );
        totalFoodOptionsAmount +=
          foodOptionInDb.price * foodOptionsDetails.quantity;
      });
    }
    return totalFoodOptionsAmount + totalFoodItemsAmount;
  };

  static createOrder = async (orderDetails: TCreateOrder) => {
    const restaurantRepo = myDataSource.getRepository(RestaurantEntity);

    const existingResaturant = await restaurantRepo.findOne({
      where: {
        id: orderDetails.restaurantId,
      },
    });

    if (!existingResaturant) {
      throw new Error("Restaurant doesn't exists");
    }
    return myDataSource.transaction(async (txn: EntityManager) => {
      const orderRepo = txn.getRepository(OrdersEntity);
      const orderItemsRepo = txn.getRepository(OrdersItemsEntity);
      const calaulatedTotalAmount = await UserService.getTotalOrderAmmount(
        orderDetails.orderItems,
        orderDetails.restaurantId
      );
      if (orderDetails.totalAmount !== calaulatedTotalAmount) {
        throw new Error("Invalid Order details");
      }
      const savedOrder = await orderRepo.save({
        address: JSON.stringify(orderDetails.address),
        isFulfilled: false,
        isPaid: false,
        restaurantId: orderDetails.restaurantId,
        totalAmount: calaulatedTotalAmount,
        userId: orderDetails.userId,
        tax: 0,
      });

      orderDetails.orderItems.forEach(
        (orderItem) => (orderItem["orderId"] = savedOrder.id)
      );
      await orderItemsRepo.save(orderDetails.orderItems);

      return savedOrder.id;
    });
  };

  static getOrderDetails = async (orderId: string) => {
    const orderRepo = myDataSource.getRepository(OrdersEntity);
    const orderItemsRepo = myDataSource.getRepository(OrdersItemsEntity);
    const cityRepo = myDataSource.getRepository(CitiesEntity);
    const orderDetails = await orderRepo.findOne({
      where: {
        id: orderId,
      },
    });

    const address: TLocation = JSON.parse(orderDetails.address);

    const cityDetails = await cityRepo.findOne({
      where: {
        id: address.cityId,
      },
    });

    const addressString = await RestaurantService.getRestaurantLocation({
      cityId: cityDetails.id,
      countryId: cityDetails.countryId,
      stateId: cityDetails.stateId,
    });
    orderDetails.address = "";
    const OrderInfo = {
      ...orderDetails,
      addressInfo: {
        ...address,
        locationString: addressString,
      },
    };

    if (!orderDetails) {
      throw new Error("Order details not found");
    }
    const orderItems = await orderItemsRepo.find({
      where: {
        orderId,
      },
    });

    return { OrderInfo, orderItems };
  };

  static getAllOrders = async (userId: string) => {
    const ordersRepo = myDataSource.getRepository(OrdersEntity);

    const allOrders = await ordersRepo.find({
      where: {
        userId,
      },
      select: {
        delivery: {
          id: true,
          status: true,
        },
      },
      relations: {
        order_items: true,
        restaurant: true,
        delivery: true,
      },
      order: {
        createdAt: "DESC",
      },
    });
    return allOrders;
  };
}
