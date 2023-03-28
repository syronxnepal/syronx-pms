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
exports.remove = exports.update = exports.updateByUserName = exports.getByUserName = exports.findById = exports.list = exports.inviteTeam = exports.create = void 0;
const service = __importStar(require("./user.service"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield service.create(req.body);
        res.status(201).json({
            message: req.i18n.t('UserCreatedSuccessfully'),
            user: {
                username: user.username,
                email: user.email,
            },
        });
    }
    catch (e) {
        next(e);
    }
});
exports.create = create;
const inviteTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service.inviteTeam(req.body, req.user.project, req.user.id);
        res.status(201).json({ message: 'TeammatesInvitedSuccessfully' });
    }
    catch (e) {
        next(e);
    }
});
exports.inviteTeam = inviteTeam;
const list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield service.list();
        res.status(201).json(user);
    }
    catch (e) {
        next();
    }
});
exports.list = list;
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = yield service.findById(req.params.id);
        if (!User)
            throw new Error(req.i18n.t('UserNoTAvailable'));
        res.status(201).json(User);
    }
    catch (e) {
        next(e);
    }
});
exports.findById = findById;
const getByUserName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const User = yield service.findByUsername(req.params.username);
        if (!User)
            throw new Error(req.i18n.t('UserNoTAvailable'));
        res.status(201).json(User);
    }
    catch (e) {
        next(e);
    }
});
exports.getByUserName = getByUserName;
const updateByUserName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield service.updateByUserName(req.params.username, req.body);
        res.status(201).json({
            user: data,
            message: req.i18n.t('UserUpdatedSuccessfully'),
        });
    }
    catch (e) {
        next(e);
    }
});
exports.updateByUserName = updateByUserName;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service.update(req.params.id, req.body);
        if (!result)
            throw new Error(req.i18n.t('UserNotAvailable'));
        res.status(201).json({
            message: req.i18n.t('UserUpdatedSuccessfully'),
        });
    }
    catch (e) {
        next(e);
    }
});
exports.update = update;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service.remove(req.params.id);
        if (!result)
            throw new Error(req.i18n.t('UserNotAvailable'));
        res.status(201).json({
            message: req.i18n.t('UserDeletedSuccessfully'),
        });
    }
    catch (e) {
        next(e);
    }
});
exports.remove = remove;
//# sourceMappingURL=user.controller.js.map