import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EnumDeliveryStatus } from "../types/RestaurentsTypes";
import { OrdersEntity } from "./orders.entity";

@Entity({ name: "deliveries" })
export class DeliveriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  orderId: string;

  @Column()
  assignedToStaff: string;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  pickupTime: Date;

  @Column({
    type: "timestamp",
    nullable: true,
  })
  deliveryTime: Date;

  @Column()
  deliveryNotes: string;

  @Column({
    type: "enum",
    enum: EnumDeliveryStatus,
  })
  status: string;

  @OneToOne(() => OrdersEntity, (order) => order.id)
  @JoinColumn()
  order: OrdersEntity;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
