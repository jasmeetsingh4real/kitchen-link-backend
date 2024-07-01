import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";
import { boolean } from "zod";

export class AddStatusInOrderTable1719860015409 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("orders", ["isPaid", "isFulfilled"]);

    await queryRunner.addColumn(
      "orders",
      new TableColumn({
        name: "status",
        type: "enum",
        enum: ["pending", "failed", "successful"],
        default: "'pending'",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("orders", [
      new TableColumn({
        name: "isPaid",
        type: "boolean",
      }),
      new TableColumn({
        name: "isFulfilled",
        type: "boolean",
      }),
    ]);

    await queryRunner.dropColumn("orders", "status");
  }
}
