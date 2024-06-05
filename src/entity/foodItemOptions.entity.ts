import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { FoodItemsEntity } from "./foodItems.entity";

@Entity({ name: "food_item_options" })
export class FoodItemOptionsEntity {
  @PrimaryGeneratedColumn("uuid", {
    name: "id",
  })
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  foodItemId: string;

  @ManyToOne(() => FoodItemsEntity, (foodItem) => foodItem.foodItemOptions)
  @JoinColumn({ name: "foodItemId" })
  foodItem: FoodItemsEntity;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
