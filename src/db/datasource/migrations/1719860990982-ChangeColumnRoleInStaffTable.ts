import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeColumnRoleInStaffTable1719860990982
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "restaurant_staff",
      "role",
      new TableColumn({
        name: "role",
        type: "enum",
        enum: ["admin", "delivery", "employee", "chef"],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "restaurant_staff",
      "role",
      new TableColumn({
        name: "role",
        type: "enum",
        enum: ["admin", "delivery", "employee"],
      })
    );
  }
}
