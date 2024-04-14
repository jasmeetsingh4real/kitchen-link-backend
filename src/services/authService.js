"use strict";
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
exports.AuthService = void 0;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var promisify = require("util").promisify;
var genSaltAsync = promisify(bcrypt.genSalt);
var hashAsync = promisify(bcrypt.hash);
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    var _a;
    _a = AuthService;
    AuthService.getAuthToken = function (user) {
        var token = jwt.sign(user, process.env.JWT_SECRET_KEY);
        return token;
    };
    AuthService.encryptPassword = function (password) { return __awaiter(void 0, void 0, void 0, function () {
        var salt, hash;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, genSaltAsync(10)];
                case 1:
                    salt = _b.sent();
                    return [4 /*yield*/, hashAsync(password, salt)];
                case 2:
                    hash = _b.sent();
                    return [2 /*return*/, hash];
            }
        });
    }); };
    AuthService.verifyPassword = function (password, hash) { return __awaiter(void 0, void 0, void 0, function () {
        var match;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, bcrypt.compare(password, hash)];
                case 1:
                    match = _b.sent();
                    return [2 /*return*/, match];
            }
        });
    }); };
    AuthService.verifyAuthToken = function (token) { return __awaiter(void 0, void 0, void 0, function () {
        var tokenVerified;
        return __generator(_a, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, jwt.verify(token, process.env.JWT_SECRET_KEY)];
                case 1:
                    tokenVerified = _b.sent();
                    return [2 /*return*/, tokenVerified];
            }
        });
    }); };
    return AuthService;
}());
exports.AuthService = AuthService;
