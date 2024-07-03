import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddColumnTransactionMode1720033023376
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("transactions", [
      new TableColumn({
        name: "transactionMode",
        type: "enum",
        enum: ["upi", "cod"],
      }),
      new TableColumn({
        name: "orderId",
        type: "varchar",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("transactions", [
      "transactionMode",
      "orderId",
    ]);
  }
}
