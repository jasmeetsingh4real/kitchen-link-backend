import { MigrationInterface, QueryRunner, Table } from "typeorm";
import { EnumRestaurantStatus } from "../../../types/RestaurentsTypes";

export class CreateRestaurantTable1713925349396 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "Restaurants",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "restaurantName",
            type: "varchar",
            length: "255",
          },
          {
            name: "ownerId",
            type: "varchar",
            isUnique: true,
          },
          {
            name: "openingTime",
            type: "date",
          },
          {
            name: "closingTime",
            type: "date",
          },
          {
            name: "restaurantEmail",
            type: "varchar",
          },
          {
            name: "restaurantContact",
            type: "varchar",
          },
          {
            name: "countryId",
            type: "int",
          },
          {
            name: "stateId",
            type: "int",
          },
          {
            name: "cityId",
            type: "int",
          },
          {
            name: "streetAddress",
            type: "varchar",
          },
          {
            name: "status",
            type: "enum",
            enum: Object.values(EnumRestaurantStatus),
            default: "'active'",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("Restaurants");
  }
}
