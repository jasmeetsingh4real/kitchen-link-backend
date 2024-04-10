"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_data_source_1 = require("../app-data-source");
//establish database connection
app_data_source_1.myDataSource
    .initialize()
    .then(function () {
    console.log("Datasource has been initialized!");
})
    .catch(function (err) {
    console.log("Error during datasouce initilization: ", err);
});
var app = express();
app.use(express.json());
app.get("/users", function (req, res) {
    res.send("working...");
});
app.listen(3000, function () {
    console.log("listning on port 3000");
});
