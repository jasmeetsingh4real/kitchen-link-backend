import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddLocationInOrdersTable1718321486253
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "orders",
      new TableColumn({
        name: "address",
        type: "text",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("orders", "address");
  }
}
