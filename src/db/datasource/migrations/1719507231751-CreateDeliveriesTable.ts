import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { EnumDeliveryStatus } from "../../../types/RestaurentsTypes";

export class CreateDeliveriesTable1719507231751 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "deliveries",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            generationStrategy: "increment",
            isGenerated: true,
          },
          {
            name: "orderId",
            type: "varchar",
          },
          {
            name: "assignedToStaff",
            type: "varchar",
          },
          {
            name: "pickupTime",
            type: "timestamp",
          },
          {
            name: "deliveryTime",
            type: "timestamp",
          },
          {
            name: "deliveryNotes",
            type: "varchar",
          },
          {
            name: "status",
            type: "enum",
            enum: [
              EnumDeliveryStatus.DELIVERED,
              EnumDeliveryStatus.FAILED,
              EnumDeliveryStatus.IN_TRANSIT,
              "preparing",
            ],
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
    await queryRunner.dropTable("deliveries");
  }
}
