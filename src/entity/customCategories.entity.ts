import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
@Entity({ name: "custom_categories" })
export class CustomCategoriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  key: string;

  @Column()
  value: string;
}
