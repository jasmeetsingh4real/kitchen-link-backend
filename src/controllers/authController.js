"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
var zod_1 = require("zod");
var UsersSchema_1 = require("../schemas/UsersSchema");
var app_data_source_1 = require("../db/datasource/app-data-source");
var kitchenLinkUsers_entity_1 = require("../entity/kitchenLinkUsers.entity");
var authService_1 = require("../services/authService");
var AuthController = /** @class */ (function () {
    function AuthController() {
    }
    var _a;
    _a = AuthController;
    AuthController.createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var usersRepo, verifiedUserData, existingUserDetails, hashPassword, saveUserRes, token, error_1;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    usersRepo = app_data_source_1.myDataSource.getRepository(kitchenLinkUsers_entity_1.KitchenLinkUsersEntity);
                    verifiedUserData = UsersSchema_1.createUserSchema.parse(req.body);
                    return [4 /*yield*/, usersRepo.findOne({
                            where: {
                                email: verifiedUserData.email,
                            },
                        })];
                case 1:
                    existingUserDetails = _b.sent();
                    //verify email
                    if (existingUserDetails) {
                        throw new Error("Email already exists, Please choose a different email to signin.");
                    }
                    return [4 /*yield*/, authService_1.AuthService.encryptPassword(verifiedUserData.password)];
                case 2:
                    hashPassword = _b.sent();
                    return [4 /*yield*/, usersRepo.save(__assign(__assign({}, verifiedUserData), { password: hashPassword }))];
                case 3:
                    saveUserRes = _b.sent();
                    if (!saveUserRes) {
                        throw new Error("Something went wrong while sigining in.");
                    }
                    token = authService_1.AuthService.getAuthToken(verifiedUserData);
                    res.cookie(token);
                    return [2 /*return*/, res.json({
                            data: saveUserRes,
                            success: true,
                            errorMessage: null,
                        })];
                case 4:
                    error_1 = _b.sent();
                    if (error_1 instanceof zod_1.ZodError) {
                        // Handle ZodError
                        return [2 /*return*/, res.json({
                                data: null,
                                success: false,
                                errorMessage: error_1.errors || "something went wrong",
                            })];
                    }
                    else
                        return [2 /*return*/, res.json({
                                data: null,
                                success: false,
                                errorMessage: error_1.message || "something went wrong",
                            })];
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    AuthController.loginUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var verifiedUserData, usersRepo, userDetails, isPasswordValid, token, error_2;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    verifiedUserData = UsersSchema_1.loginUserSchema.parse(req.body);
                    usersRepo = app_data_source_1.myDataSource.getRepository(kitchenLinkUsers_entity_1.KitchenLinkUsersEntity);
                    return [4 /*yield*/, usersRepo.findOne({
                            where: {
                                email: verifiedUserData.email,
                            },
                        })];
                case 1:
                    userDetails = _b.sent();
                    if (!userDetails) {
                        throw new Error("User not found!");
                    }
                    return [4 /*yield*/, authService_1.AuthService.verifyPassword(verifiedUserData.password, userDetails.password)];
                case 2:
                    isPasswordValid = _b.sent();
                    if (!isPasswordValid) {
                        throw new Error("Incorrect password!");
                    }
                    token = authService_1.AuthService.getAuthToken(verifiedUserData);
                    res.cookie(token);
                    return [2 /*return*/, res.json({
                            data: "User verified!",
                            success: true,
                            errorMessage: null,
                        })];
                case 3:
                    error_2 = _b.sent();
                    if (error_2 instanceof zod_1.ZodError) {
                        // Handle ZodError
                        return [2 /*return*/, res.json({
                                data: null,
                                success: false,
                                errorMessage: error_2.errors || "something went wrong",
                            })];
                    }
                    else
                        return [2 /*return*/, res.json({
                                data: null,
                                success: false,
                                errorMessage: error_2.message || "something went wrong",
                            })];
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    AuthController.verifyAuthToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
        var token, verifiedTokenRes, error_3;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    token = req.body.token;
                    return [4 /*yield*/, authService_1.AuthService.verifyAuthToken(token)];
                case 1:
                    verifiedTokenRes = _b.sent();
                    if (!verifiedTokenRes) {
                        throw new Error("Invalid Auth-Token!");
                    }
                    return [2 /*return*/, res.json({
                            data: "Token verified!",
                            success: true,
                            errorMessage: null,
                        })];
                case 2:
                    error_3 = _b.sent();
                    return [2 /*return*/, res.json({
                            data: null,
                            success: false,
                            errorMessage: error_3.message || "something went wrong",
                        })];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return AuthController;
}());
exports.AuthController = AuthController;
//demo token
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkYWRhd2VkYXdkYXdkdyIsInBhc3N3b3JkIjoidGVzdHVzZXIiLCJmdWxsTmFtZSI6Imphc21lZXQiLCJpYXQiOjE3MTMxMjQ1NTZ9.NfNqVJ9QC4PtdMrAB9uVtrZitM4-PQUSOlTnA_ACZ7Y=undefined; Path=/
