import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EnumDietryInfo } from "../types/RestaurentsTypes";

@Entity({ name: "food_items" })
export class FoodItemsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  category: string;

  @Column()
  price: number;

  @Column()
  ingredients: string;

  @Column({
    type: "enum",
    enum: EnumDietryInfo,
  })
  dietryInfo: EnumDietryInfo;

  @Column()
  restaurantId: number;

  @Column({
    default: null,
  })
  foodItemSlugId: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
