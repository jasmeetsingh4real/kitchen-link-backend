import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCitiesTable1714007570230 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "cities",
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
            name: "latitude",
            type: "varchar",
          },
          {
            name: "longitude",
            type: "varchar",
          },
          {
            name: "stateCode",
            type: "varchar",
          },
          {
            name: "stateId",
            type: "int",
          },
          {
            name: "countryId",
            type: "int",
          },
          {
            name: "countryCode",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("cities");
  }
}
