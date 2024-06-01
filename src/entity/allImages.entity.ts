import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EnumImageType } from "../types/RestaurentsTypes";
import { FoodItemsEntity } from "./foodItems.entity";
import { RestaurantEntity } from "./restaurant.entity";

@Entity({ name: "all_images" })
export class AllImagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  ownerId: string;

  @Column()
  imageURL: string;

  @Column({
    default: null,
  })
  parentId: string;

  @ManyToOne(() => FoodItemsEntity, (foodItem) => foodItem.images)
  @JoinColumn({ name: "parentId" })
  foodItem: FoodItemsEntity;

  @ManyToOne(() => RestaurantEntity, (restaurant) => restaurant.images)
  @JoinColumn({ name: "parentId" })
  restaurant: RestaurantEntity;

  @Column({
    type: "enum",
    enum: EnumImageType,
  })
  imageType: EnumImageType;
}
