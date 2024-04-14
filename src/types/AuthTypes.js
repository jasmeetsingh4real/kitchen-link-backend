"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumUserStatus = exports.EnumUserRole = void 0;
var EnumUserRole;
(function (EnumUserRole) {
    EnumUserRole["ADMIN"] = "admin";
    EnumUserRole["SUPPLIER"] = "seller";
    EnumUserRole["USER"] = "user";
})(EnumUserRole || (exports.EnumUserRole = EnumUserRole = {}));
var EnumUserStatus;
(function (EnumUserStatus) {
    EnumUserStatus["ACTIVE"] = "active";
    EnumUserStatus["INACTIVE"] = "inactive";
    EnumUserStatus["BLOCKED"] = "blocked";
})(EnumUserStatus || (exports.EnumUserStatus = EnumUserStatus = {}));
