import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFoodItemCategoriesTable1716404861858
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "custom_categories",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },

          {
            name: "value",
            type: "varchar",
          },
          {
            name: "key",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("custom_categories");
  }
}
