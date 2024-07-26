import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EnumOrderStatus } from "../types/RestaurentsTypes";
import { DeliveriesEntity } from "./deliveries.entity";
import { OrdersItemsEntity } from "./ordersItems.entity";
import { RestaurantEntity } from "./restaurant.entity";

@Entity({ name: "orders" })
export class OrdersEntity {
  @PrimaryGeneratedColumn("uuid", {
    name: "id",
  })
  id: string;

  @Column()
  totalAmount: number;

  @Column()
  tax: number;

  @Column()
  address: string;

  @Column()
  restaurantId: string;

  @Column()
  userId: string;

  @Column({
    type: "enum",
    enum: EnumOrderStatus,
  })
  status: string;

  @OneToMany(() => OrdersItemsEntity, (order_items) => order_items.order)
  order_items: OrdersItemsEntity;

  @OneToOne(() => DeliveriesEntity, (delivery) => delivery.order)
  delivery: DeliveriesEntity;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.orders)
  restaurant: RestaurantEntity;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
