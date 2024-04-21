import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EnumUserRole, EnumUserStatus } from "../types/AuthTypes";

@Entity({ name: "kitchenlinkusers" })
export class KitchenLinkUsersEntity {
  @PrimaryGeneratedColumn("uuid", {
    name: "id",
  })
  id: string;

  @Column({ type: "enum", enum: EnumUserRole })
  role: string;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: EnumUserStatus })
  status: string;
}
