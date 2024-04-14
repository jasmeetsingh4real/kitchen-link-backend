"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatasource = void 0;
var app_data_source_1 = require("./datasource/app-data-source");
var connectDatasource = function () {
    app_data_source_1.myDataSource
        .initialize()
        .then(function () {
        console.log("Datasource has been initialized!");
    })
        .catch(function (err) {
        console.log("Error during datasouce initilization: ", err);
    });
};
exports.connectDatasource = connectDatasource;
