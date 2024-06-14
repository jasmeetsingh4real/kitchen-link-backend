import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableExclusion,
} from "typeorm";

export class AddUserIdInOrdersTable1718238062721 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "orders",
      new TableColumn({
        name: "userId",
        type: "varchar",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("orders", "userId");
  }
}
