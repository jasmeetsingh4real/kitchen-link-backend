import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFoodItemsTable1716136170214 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("food_items");
  }
}
