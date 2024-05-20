import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class RenameRestaurantImagesTableAndAddSomeColumns1716166573238
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns("all_images", [
      new TableColumn({
        name: "imageType",
        type: "enum",
        enum: ["restaurant_image", "food_item_image", "food_item_option_image"],
      }),
      new TableColumn({
        name: "parentId",
        type: "int",
        isNullable: true,
      }),
      new TableColumn({
        name: "imageURL",
        type: "varchar",
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("all_images", [
      "imageType",
      "parentId",
      "imageURL",
    ]);
  }
}
