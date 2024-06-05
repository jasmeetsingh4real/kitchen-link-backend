import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EnumOrderItemType } from "../types/RestaurentsTypes";

@Entity({ name: "order_items" })
export class OrdersItemsEntity {
  @PrimaryGeneratedColumn("uuid", {
    name: "id",
  })
  id: string;

  @Column()
  itemId: string;

  @Column()
  quantitiy: number;

  @Column()
  totalAmount: number;

  @Column({ type: "enum", enum: EnumOrderItemType })
  itemType: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
