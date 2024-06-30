import {
  Collection,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { EnumStaffRoles } from "../types/RestaurentsTypes";

@Entity({ name: "restaurant_staff" })
export class RestaurantStaffEntity {
  @PrimaryGeneratedColumn("uuid", {
    name: "id",
  })
  id: string;

  @Column()
  staffName: string;
  @Column()
  restaurantId: string;
  @Column({
    type: "enum",
    enum: EnumStaffRoles,
  })
  role: string;
  @Column()
  age: number;
  @Column()
  phoneNo: string;
  @Column()
  email: string;
  @Column()
  isActive: boolean;
  @Column()
  salary: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}
