import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateOrdersTable1717464774096 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "orders",
        columns: [
          {
            name: "id",
            type: "varchar",
            isPrimary: true,
            generationStrategy: "uuid",
            isGenerated: true,
            isUnique: true,
          },
          {
            name: "isFulfilled",
            type: "boolean",
          },
          {
            name: "isPaid",
            type: "boolean",
          },
          {
            name: "totalAmount",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: false,
            default: 0,
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
    await queryRunner.dropTable("orders");
  }
}
