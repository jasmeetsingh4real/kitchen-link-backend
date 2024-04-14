import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableExclusion,
} from "typeorm";
import { EnumUserRole, EnumUserStatus } from "../../../types/AuthTypes";

export class CreatekitchenLinkUsersTable1713100947359
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "kitchenLinkUsers",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            generationStrategy: "increment",
            isGenerated: true,
          },
          {
            name: "role",
            type: "enum",
            enum: ["user", "seller", "admin"],
            default: "'user'",
          },
          {
            name: "status",
            type: "enum",
            enum: ["active", "inactive", "blocked"],
            default: "'active'",
          },
          {
            name: "fullName",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },

          {
            name: "password",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("kitchenLinkUsers");
  }
}
