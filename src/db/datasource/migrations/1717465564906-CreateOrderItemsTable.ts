import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { EnumOrderItemType } from "../../../types/RestaurentsTypes";

export class CreateOrderItemsTable1717465564906 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "order_items",
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
            name: "itemId",
            type: "varchar",
          },
          {
            name: "quantity",
            type: "int",
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
            name: "itemType",
            type: "enum",
            enum: [
              EnumOrderItemType.FOOD_ITEM,
              EnumOrderItemType.FOOD_ITEM_OPTION,
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
    await queryRunner.dropTable("order_items");
  }
}
