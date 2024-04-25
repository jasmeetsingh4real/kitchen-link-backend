import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "countries" })
export class CountriesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  iso2: string;

  @Column()
  iso3: string;

  @Column()
  phonecode: string;

  @Column()
  capital: string;

  @Column()
  currency: string;

  @Column()
  native: string;

  @Column()
  emoji: string;
}
