import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "states" })
export class StatesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  iso2: string;

  @Column()
  country_code: string;

  @Column()
  country_id: string;
}
