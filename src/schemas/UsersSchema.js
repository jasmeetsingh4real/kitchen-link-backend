"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.createUserSchema = void 0;
var zod_1 = require("zod");
var AuthTypes_1 = require("../types/AuthTypes");
exports.createUserSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
    fullName: zod_1.z.string(),
    role: zod_1.z.nativeEnum(AuthTypes_1.EnumUserRole).optional(),
});
exports.loginUserSchema = zod_1.z.object({
    email: zod_1.z.string(),
    password: zod_1.z.string(),
});
