import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";
import { EnumRestaurantStatus } from "../../../types/RestaurentsTypes";

export class ChangeRestaurantIdToUUID1717088376370
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("restaurants");
    await queryRunner.createTable(
      new Table({
        name: "restaurants",
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
            type: "timestamp",
          },
          {
            name: "closingTime",
            type: "timestamp",
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
    await queryRunner.dropTable("restaurants");
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
            type: "timestamp",
          },
          {
            name: "closingTime",
            type: "timestamp",
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
}
