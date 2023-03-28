"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.verify = void 0;
const service = __importStar(require("./externalAccess.service"));
const userService = __importStar(require("../user/user.service"));
const verify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = req.params.hash;
        const externalAccess = yield service.verify(hash);
        if (externalAccess.type === 'USER_REGISTRATION') {
            const user = yield userService.findById(externalAccess.user);
            if (!user)
                throw new Error(req.i18n.t("UserDoesn'tExists"));
            return res.status(301).redirect(`${process.env.CLIENT_HOST}/initial?hash=${externalAccess.hash}&username=${user.username}`);
        }
        if (externalAccess.type === 'INVITATION') {
            const prevUser = yield userService.findByEmail(externalAccess.email);
            if (!prevUser) {
                return res.status(301).redirect(`${process.env.CLIENT_HOST}/welcome?hash=${externalAccess.hash}&new=true`);
            }
            else {
                return res.status(301).redirect(`${process.env.CLIENT_HOST}/welcome?hash=${externalAccess.hash}`);
            }
        }
        if (externalAccess.type === 'FORGET_PASSWORD') {
            const user = yield userService.findById(externalAccess.user);
            if (!user)
                throw new Error(req.i18n.t("UserDoesn'tExists"));
            return res.status(301).redirect(`${process.env.CLIENT_HOST}/changePassword?hash=${externalAccess.hash}&email=${user.email}`);
        }
        res.status(301).redirect(`${process.env.CLIENT_HOST}/login`);
    }
    catch (e) {
        res.status(301).redirect(`${process.env.CLIENT_HOST}/link-error`);
    }
});
exports.verify = verify;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hash = req.params.hash;
        yield service.verify(hash);
        res.status(301).redirect(`${process.env.CLIENT_HOST}/set-password`);
    }
    catch (e) {
        res.status(301).redirect(`${process.env.CLIENT_HOST}/error`);
    }
});
exports.changePassword = changePassword;
//# sourceMappingURL=externalAccess.controller.js.map