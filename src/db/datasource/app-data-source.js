"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.myDataSource = void 0;
var typeorm_1 = require("typeorm");
var path = require('path');
exports.myDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "Root@123",
    database: "kitchenlinkdb",
    synchronize: false, // if true, you don't really need migrations,
    entities: ["src/**/*.entity{.js,.ts}"],
    migrations: ["src/db/datasource/migrations/*.ts"],
    logging: true,
});
