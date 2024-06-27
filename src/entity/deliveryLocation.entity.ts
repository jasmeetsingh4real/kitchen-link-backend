import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "delivery_locations" })
export class DeliveryLocationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cityId: number;

  @Column()
  address: string;

  @Column()
  pincode: string;

  @Column()
  houseNo: string;

  @Column()
  userName: string;

  @Column()
  streetNo: string;

  @Column()
  userId: string;
}
