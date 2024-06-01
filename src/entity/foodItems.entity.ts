import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EnumDietryInfo } from "../types/RestaurentsTypes";
import { AllImagesEntity } from "./allImages.entity";
import { RestaurantEntity } from "./restaurant.entity";

@Entity({ name: "food_items" })
export class FoodItemsEntity {
  @PrimaryGeneratedColumn("uuid", {
    name: "id",
  })
  id: string;

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
  restaurantId: string;

  @Column({
    default: null,
  })
  foodItemSlugId: number;

  @OneToMany(() => AllImagesEntity, (image) => image.foodItem, {
    cascade: true,
  })
  images: AllImagesEntity[];

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.foodItems)
  @JoinColumn({ name: "restaurantId" })
  restaurant: RestaurantEntity;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
