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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const authenticateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            // console.log("ERROR TOKEN", err)
            if (err.name === "TokenExpiredError") {
                return res.sendStatus(403).json({ message: "Token Has Expired" });
            }
            if (err.name === "JsonWebTokenError") {
                return res.sendStatus(403).json({ message: "Token Has Altered/Expired" });
            }
            return res.sendStatus(403);
        }
        req.user = user;
        // console.log("USER AUTH", user)
        next();
    });
});
exports.authenticateToken = authenticateToken;
//# sourceMappingURL=auth.middleware.js.map