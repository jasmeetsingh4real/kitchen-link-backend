import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRestaurantImagesTable1715115049544
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "all_images",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "fileName",
            type: "varchar",
          },
          {
            name: "ownerId",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("all_images");
  }
}
