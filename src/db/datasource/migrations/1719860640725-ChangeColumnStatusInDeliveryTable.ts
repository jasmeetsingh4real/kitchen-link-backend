import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeColumnStatusInDeliveryTable1719860640725
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "deliveries",
      "status",
      new TableColumn({
        name: "status",
        type: "enum",
        enum: [
          "pending",
          "being_prepared",
          "in_transit",
          "delivered",
          "failed",
        ],
        default: "'pending'",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "deliveries",
      "status",
      new TableColumn({
        name: "status",
        type: "enum",
        enum: ["in_transit", "delivered", "failed", "preparing"],
      })
    );
  }
}
