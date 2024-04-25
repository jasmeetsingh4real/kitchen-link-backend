import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "cities" })
export class CitiesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: string;

  @Column()
  longitude: string;

  @Column()
  stateCode: string;

  @Column()
  stateId: number;

  @Column()
  countryId: number;

  @Column()
  countryCode: string;
}
