import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFoodItemOptionsTable1717466493025
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "food_item_options",
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
            name: "price",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: false,
            default: 0,
          },
          {
            name: "foodItemId",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("food_item_options");
  }
}
