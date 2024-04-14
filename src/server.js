"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var connection_1 = require("./db/connection");
//setting up config file
require("dotenv").config();
console.log(process.env.PORT);
//connecting to database
(0, connection_1.connectDatasource)();
app_1.default.listen(process.env.PORT, function () {
    console.log("Server started on PORT: ".concat(process.env.PORT, " in ").concat(process.env.NODE_ENV, " mode."));
});
