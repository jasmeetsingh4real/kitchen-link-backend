import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "orders" })
export class OrdersEntity {
  @PrimaryGeneratedColumn("uuid", {
    name: "id",
  })
  id: string;

  @Column()
  isFulfilled: boolean;

  @Column()
  isPaid: boolean;

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

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
