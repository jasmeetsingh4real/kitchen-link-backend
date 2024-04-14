"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var authRoutes_1 = require("./routes/authRoutes");
var cors = require("cors");
var bodyParser = require("body-parser");
//establish database connection
var app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//enabling cross origin resource sharing
app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes_1.authRouter);
exports.default = app;
