"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.createUserSchema = void 0;
var zod_1 = require("zod");
exports.createUserSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    fullName: zod_1.z.string(),
});
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
