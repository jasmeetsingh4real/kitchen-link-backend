import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "restaurant_images" })
export class RestaurantImagesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fileName: string;

  @Column()
  ownerId: string;
}
