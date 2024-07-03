import {
  Collection,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import {
  EnumTransactionMode,
  EnumTransactionStatus,
} from "../types/RestaurentsTypes";
@Entity({
  name: "transactions",
})
export class TransactionsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column({
    type: "enum",
    enum: EnumTransactionStatus,
  })
  status: string;

  @Column()
  remark: string;

  @Column()
  orderId: string;

  @Column()
  restaurantId: string;

  @Column()
  userId: string;

  @Column({
    type: "enum",
    enum: EnumTransactionMode,
  })
  transactionMode: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
