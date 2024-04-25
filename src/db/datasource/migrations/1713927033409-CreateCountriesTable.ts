import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCountriesTable1713927033409 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "countries",
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
            name: "iso2",
            type: "varchar",
          },
          {
            name: "iso3",
            type: "varchar",
          },
          {
            name: "phonecode",
            type: "varchar",
          },
          {
            name: "capital",
            type: "varchar",
          },
          {
            name: "currency",
            type: "varchar",
          },
          {
            name: "native",
            type: "varchar",
            default: null,
            isNullable: true,
          },
          {
            name: "emoji",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("countries");
  }
}
