import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EnumOrderStatus } from "../types/RestaurentsTypes";

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

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
