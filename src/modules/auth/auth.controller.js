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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.choosen = exports.inviteTeam = exports.resendLink = exports.forgetPassword = exports.forgetChangePassword = exports.changePassword = exports.hashInvitedLogin = exports.hashLogin = exports.login = exports.register = exports.checkToken = void 0;
const service = __importStar(require("./auth.service"));
const userService = __importStar(require("../user/user.service"));
const uuid_1 = require("uuid");
const mailer_1 = __importDefault(require("../../common/utils/mailer"));
const mailHTML_1 = require("../../common/constants/mailHTML");
const jsonwebtoken_1 = require("jsonwebtoken");
const ExternalAccessService = __importStar(require("../externalAccess/externalAccess.service"));
const checkToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = (_a = req.query) === null || _a === void 0 ? void 0 : _a.token.toString();
    if (token == null)
        return res.sendStatus(401);
    (0, jsonwebtoken_1.verify)(token, process.env.ACCESS_TOKEN_SECRET, (err) => {
        if (err) {
            if (err.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token Has Expired" });
            }
            if (err.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Token Has Altered" });
            }
            return res.status(401).json({ message: err.message });
        }
        res.status(201).json({ message: 'Access' });
    });
});
exports.checkToken = checkToken;
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Check For Existing User By Email or username
        const oldUser = yield userService.checkExistingEmailOrUsername(req.body.username, req.body.email);
        //Throws Error if User is Already Exists
        if (oldUser)
            throw new Error(req.i18n.t('UserAlreadyExists'));
        //Create New User
        const user = yield service.create(req.body);
        const hash = (0, uuid_1.v4)();
        yield ExternalAccessService.create(user._id, hash, 'USER_REGISTRATION');
        (0, mailer_1.default)(user.email, 'EMAIL REGISTRATION', (0, mailHTML_1.registrationEmailHtml)(user.name, hash));
        res.status(201).json({
            username: user.username,
            email: user.email,
            message: req.i18n.t('UserRegistrationSuccessfully'),
        });
    }
    catch (e) {
        next(e);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, token } = yield service.login(req.body, req.i18n);
        res.status(201).json({
            message: req.i18n.t('UserLoginSuccessfully'),
            user,
            token,
        });
    }
    catch (e) {
        next(e);
    }
});
exports.login = login;
const hashLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, token } = yield service.hashLogin(req.body.hash, req.i18n);
        res.status(201).json({
            message: req.i18n.t('UserLoginSuccessfully'),
            user,
            token,
        });
    }
    catch (e) {
        next(e);
    }
});
exports.hashLogin = hashLogin;
const hashInvitedLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, token, projectLeader } = yield service.hashInvitedLogin(req.body, req.i18n);
        res.status(201).json({
            message: req.i18n.t('UserLoginSuccessfully'),
            user,
            projectLeader,
            token,
        });
    }
    catch (e) {
        next(e);
    }
});
exports.hashInvitedLogin = hashInvitedLogin;
const changePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service.changePassword(req.body, req.user.id, req.i18n);
        res.status(201).json({
            message: req.i18n.t('PasswordChangedSuccessfully')
        });
    }
    catch (e) {
        next(e);
    }
});
exports.changePassword = changePassword;
const forgetChangePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service.forgetChangePassword(req.body, req.i18n);
        res.status(201).json({
            message: req.i18n.t('PasswordChangedSuccessfully')
        });
    }
    catch (e) {
        next(e);
    }
});
exports.forgetChangePassword = forgetChangePassword;
const forgetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.checkExistingEmailOrUsername(req.body.username, req.body.email);
        if (!user)
            throw new Error(req.i18n.t("UserDoesn'tExists"));
        const hash = (0, uuid_1.v4)();
        yield ExternalAccessService.create(user._id, hash, 'FORGET_PASSWORD');
        (0, mailer_1.default)(user.email, 'FORGET PASSWORD', (0, mailHTML_1.forgetPasswordHTML)(user.name, hash));
        res.status(201).json({
            message: `Email send successfully to ${user.email}`,
        });
    }
    catch (e) {
        next(e);
    }
});
exports.forgetPassword = forgetPassword;
const resendLink = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield userService.checkExistingEmailOrUsername(req.body.username, req.body.email);
        if (!user)
            throw new Error(req.i18n.t("UserDoesn'tExists"));
        const externalAccess = yield ExternalAccessService.invalidPreviousLink(user._id);
        const hash = (0, uuid_1.v4)();
        yield ExternalAccessService.create(user._id, hash, externalAccess.type);
        (0, mailer_1.default)(user.email, externalAccess.type, (0, mailHTML_1.registrationEmailHtml)(user.name, hash));
        res.status(201).json({
            message: req.i18n.t('EmailIsSendToRespectedEmailAddress', { email: user.email }),
        });
    }
    catch (e) {
        next(e);
    }
});
exports.resendLink = resendLink;
const inviteTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service.inviteTeam(req.body, req.user.project);
        res.status(201).json({ message: 'TeammatesInvitedSuccessfully' });
    }
    catch (e) {
        next(e);
    }
});
exports.inviteTeam = inviteTeam;
const choosen = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user, token } = yield service.choosen(req.params.id, req.user.id, req.user.project);
        res.status(201).json({
            message: '',
            user,
            token,
        });
    }
    catch (e) {
        next(e);
    }
});
exports.choosen = choosen;
//# sourceMappingURL=auth.controller.js.map