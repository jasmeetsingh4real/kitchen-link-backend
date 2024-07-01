import { DataSource } from "typeorm";
const path = require("path");
require("dotenv").config();

export const myDataSource = new DataSource({
  type: "mysql",
  host: process.env.MY_SQL_HOST,
  port: 3306,
  username: process.env.MY_SQL_USERNAME,
  password: process.env.MY_SQL_PASS,
  database: process.env.MY_SQL_DBNAME,
  synchronize: false, // if true, you don't really need migrations,
  entities: ["src/**/*.entity{.js,.ts}"],
  migrations: ["src/db/datasource/migrations/*.ts"],
  logging: true,
});
