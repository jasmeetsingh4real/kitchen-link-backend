import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCreatedAtUpdatedAtRestaurantIdInOrdersTable1717788753783
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("orders", [
      new TableColumn({
        name: "createdAt",
        type: "timestamp",
        default: "CURRENT_TIMESTAMP",
      }),
      new TableColumn({
        name: "updatedAt",
        type: "timestamp",
        default: "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
      }),
      new TableColumn({
        name: "retaurantId",
        type: "varchar",
      }),
      new TableColumn({
        name: "tax",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: false,
        default: 0,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("orders", [
      "createdAt",
      "updatedAt",
      "retaurantId",
      "tax",
    ]);
  }
}
