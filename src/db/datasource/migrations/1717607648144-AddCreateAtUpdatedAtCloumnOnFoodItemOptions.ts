import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCreateAtUpdatedAtCloumnOnFoodItemOptions1717607648144
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("food_item_options", [
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
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("food_item_options", [
      "createdAt",
      "updatedAt",
    ]);
  }
}
