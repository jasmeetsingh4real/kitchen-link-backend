import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class ChangeFoodItemIdToUUIDandPatentIdInIamghesTableToString1717096673195
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("food_items");
    await queryRunner.createTable(
      new Table({
        name: "food_items",
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
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "category",
            type: "varchar",
          },
          {
            name: "price",
            type: "decimal",
            precision: 10, // Total number of digits
            scale: 2, // Number of digits after the decimal point
          },
          {
            name: "ingredients",
            type: "varchar",
          },
          {
            name: "dietryInfo",
            type: "enum",
            enum: ["veg", "non_veg"],
          },
          {
            name: "restaurantId",
            type: "varchar",
          },
          {
            name: "foodItemSlugId",
            type: "int",
            isNullable: true,
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

    await queryRunner.changeColumn(
      "all_images",
      "parentId",
      new TableColumn({
        name: "parentId",
        type: "varchar",
        isNullable: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("food_items");
    await queryRunner.createTable(
      new Table({
        name: "food_items",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "category",
            type: "varchar",
          },
          {
            name: "price",
            type: "decimal",
            precision: 10, // Total number of digits
            scale: 2, // Number of digits after the decimal point
          },
          {
            name: "ingredients",
            type: "varchar",
          },
          {
            name: "dietryInfo",
            type: "enum",
            enum: ["veg", "non_veg"],
          },
          {
            name: "restaurantId",
            type: "int",
          },
          {
            name: "foodItemSlugId",
            type: "int",
            isNullable: true,
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

    await queryRunner.changeColumn(
      "all_images",
      "parentId",
      new TableColumn({
        name: "parentId",
        type: "int",
        isNullable: true,
      })
    );
  }
}
