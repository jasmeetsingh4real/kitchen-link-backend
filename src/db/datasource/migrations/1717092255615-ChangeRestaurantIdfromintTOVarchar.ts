import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeRestaurantIdfromintTOVarchar1717092255615
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "food_items",
      "restaurantId",
      new TableColumn({
        name: "restaurantId",
        type: "varchar",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      "food_items",
      "restaurantId",
      new TableColumn({
        name: "restaurantId",
        type: "int",
      })
    );
  }
}
