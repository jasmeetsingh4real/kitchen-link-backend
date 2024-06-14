import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddItemNameInOrderItems1718319712711
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "order_items",
      new TableColumn({
        name: "name",
        type: "varchar",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("order_items", "name");
  }
}
