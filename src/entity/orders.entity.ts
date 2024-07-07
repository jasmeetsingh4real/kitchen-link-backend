import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EnumOrderStatus } from "../types/RestaurentsTypes";
import { DeliveriesEntity } from "./deliveries.entity";
import { OrdersItemsEntity } from "./ordersItems.entity";

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

  @OneToOne(() => DeliveriesEntity, (delivery) => delivery.orderId)
  delivery: DeliveriesEntity;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
