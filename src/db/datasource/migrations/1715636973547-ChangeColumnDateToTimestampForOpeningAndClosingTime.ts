import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class ChangeColumnDateToTimestampForOpeningAndClosingTime1715636973547
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("restaurants", [
      "openingTime",
      "closingTime",
    ]);
    await queryRunner.addColumns("restaurants", [
      new TableColumn({
        name: "openingTime",
        type: "timestamp",
      }),
      new TableColumn({
        name: "closingTime",
        type: "timestamp",
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumns("restaurants", [
      "openingTime",
      "closingTime",
    ]);
    await queryRunner.addColumns("restaurants", [
      new TableColumn({
        name: "openingTime",
        type: "date",
      }),
      new TableColumn({
        name: "closingTime",
        type: "date",
      }),
    ]);
  }
}
