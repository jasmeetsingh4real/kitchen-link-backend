import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EnumImageType } from "../types/RestaurentsTypes";
import { FoodItemsEntity } from "./foodItems.entity";

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
  parentId: number;

  @ManyToOne(() => FoodItemsEntity, (foodItem) => foodItem.images)
  @JoinColumn({ name: "parentId" })
  foodItem: FoodItemsEntity;

  @Column({
    type: "enum",
    enum: EnumImageType,
  })
  imageType: EnumImageType;
}
