import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EnumRestaurantStatus } from "../types/RestaurentsTypes";

@Entity({ name: "restaurants" })
export class RestaurantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  restaurantName: string;

  @Column()
  ownerId: string;

  @Column({
    type: "timestamp",
  })
  openingTime: Date;

  @Column({
    type: "timestamp",
  })
  closingTime: Date;

  @Column()
  restaurantEmail: string;

  @Column()
  restaurantContact: string;

  @Column()
  stateId: number;

  @Column()
  countryId: number;

  @Column()
  cityId: number;

  @Column()
  streetAddress: string;

  @Column({
    type: "enum",
    enum: EnumRestaurantStatus,
    default: EnumRestaurantStatus.ACTIVE,
  })
  status: string;
}
