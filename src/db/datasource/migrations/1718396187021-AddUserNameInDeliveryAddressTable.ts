import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddUserNameInDeliveryAddressTable1718396187021
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "delivery_locations",
      new TableColumn({
        name: "userName",
        type: "varchar",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("delivery_locations", "userName");
  }
}
