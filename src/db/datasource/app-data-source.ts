import { DataSource } from "typeorm";
const path = require('path');

export const myDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "Root@123",
  database: "kitchenlinkdb",
  synchronize: false, // if true, you don't really need migrations,
  entities: [ "src/**/*.entity{.js,.ts}"],
  migrations :  [ "src/db/datasource/migrations/*.ts"],
  logging: true,

});
