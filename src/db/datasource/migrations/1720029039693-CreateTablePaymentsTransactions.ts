import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTablePaymentsTransactions1720029039693
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transactions",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "amount",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: false,
            default: 0,
          },
          {
            name: "status",
            type: "enum",
            enum: ["initialized", "pending", "failed", "success"],
          },
          {
            name: "remark",
            type: "varchar",
          },
          {
            name: "restaurantId",
            type: "varchar",
          },
          {
            name: "userId",
            type: "varchar",
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
    await queryRunner.dropTable("transactions");
  }
}
