import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableExclusion,
} from "typeorm";

export class CreatedeliveryLocationTablr1718126612354
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "delivery_locations",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            generationStrategy: "increment",
            isGenerated: true,
          },
          {
            name: "cityId",
            type: "int",
          },
          {
            name: "address",
            type: "varchar",
          },
          {
            name: "pincode",
            type: "varchar",
          },
          {
            name: "houseNo",
            type: "varchar",
          },
          {
            name: "streetNo",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "userId",
            type: "varchar",
            isNullable: true,
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("delivery_locations");
  }
}
