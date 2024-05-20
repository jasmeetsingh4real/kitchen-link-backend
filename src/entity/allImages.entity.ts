import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EnumImageType } from "../types/RestaurentsTypes";

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

  @Column({
    type: "enum",
    enum: EnumImageType,
  })
  imageType: EnumImageType;
}
