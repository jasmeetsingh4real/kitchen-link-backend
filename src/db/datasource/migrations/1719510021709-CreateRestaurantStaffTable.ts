import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { EnumStaffRoles } from "../../../types/RestaurentsTypes";

export class CreateRestaurantStaffTable1719510021709
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "restaurant_staff",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            generationStrategy: "increment",
            isGenerated: true,
          },
          {
            name: "staffName",
            type: "varchar",
          },
          {
            name: "restaurantId",
            type: "varchar",
          },
          {
            name: "role",
            type: "enum",
            enum: [
              EnumStaffRoles.ADMIN,
              EnumStaffRoles.DELIVERY,
              EnumStaffRoles.EMPLOYEE,
            ],
          },
          {
            name: "age",
            type: "int",
          },
          {
            name: "phoneNo",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
          {
            name: "isActive",
            type: "boolean",
          },
          {
            name: "salary",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: false,
            default: 0,
          },
          {
            name: "createdAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updatedAt",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("restaurant_staff");
  }
}
