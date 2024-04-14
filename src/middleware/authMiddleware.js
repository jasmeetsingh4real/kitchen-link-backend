"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
var jwt = require("jsonwebtoken");
var verifyToken = function (req, res, next) {
    var token = req.header("authToken");
    if (!token)
        return res.status(401).json({ error: "Access denied" });
    try {
        var decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Invalid token" });
    }
};
exports.verifyToken = verifyToken;
