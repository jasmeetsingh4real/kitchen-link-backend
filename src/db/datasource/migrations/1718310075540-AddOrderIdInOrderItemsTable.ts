import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableExclusion,
} from "typeorm";

export class AddOrderIdInOrderItemsTable1718310075540
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "order_items",
      new TableColumn({
        name: "orderId",
        type: "varchar",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("order_items", "orderId");
  }
}
