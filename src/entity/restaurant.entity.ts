import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EnumRestaurantStatus } from "../types/RestaurentsTypes";
import { FoodItemsEntity } from "./foodItems.entity";
import { AllImagesEntity } from "./allImages.entity";
import { OrdersEntity } from "./orders.entity";

@Entity({ name: "restaurants" })
export class RestaurantEntity {
  @PrimaryGeneratedColumn("uuid", {
    name: "id",
  })
  id: string;

  @Column()
  restaurantName: string;

  @Column()
  ownerId: string;

  @Column({
    type: "timestamp",
  })
  openingTime: Date;

  @Column({
    type: "timestamp",
  })
  closingTime: Date;

  @Column()
  restaurantEmail: string;

  @Column()
  restaurantContact: string;

  @Column()
  stateId: number;

  @Column()
  countryId: number;

  @Column()
  cityId: number;

  @Column()
  streetAddress: string;

  @OneToMany(() => FoodItemsEntity, (foodItem) => foodItem.restaurant, {
    cascade: true,
  })
  foodItems: FoodItemsEntity[];

  @OneToMany(() => AllImagesEntity, (image) => image.restaurant, {
    cascade: true,
  })
  images: AllImagesEntity[];

  @OneToMany(() => OrdersEntity, (orders) => orders.restaurantId)
  orders: OrdersEntity[];

  @Column({
    type: "enum",
    enum: EnumRestaurantStatus,
    default: EnumRestaurantStatus.ACTIVE,
  })
  status: string;
}
