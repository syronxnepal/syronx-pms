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
exports.remove = exports.updateRole = exports.update = exports.findById = exports.getTeam = exports.get = exports.list = exports.create = void 0;
const service = __importStar(require("./project.service"));
const UserService = __importStar(require("../user/user.service"));
const externalAccess_service_1 = require("../externalAccess/externalAccess.service");
const auth_service_1 = require("../auth/auth.service");
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.body.hash;
    const type = req.body.type;
    try {
        if (type === 'initial') {
            const externalAccess = yield (0, externalAccess_service_1.findOnlyByHash)(hash);
            if (externalAccess && !externalAccess.project) {
                const user = yield UserService.findById(req.user.id);
                if (!user)
                    throw new Error(req.i18n.t('userNotAvailable'));
                const project = yield service.create(req.body, req.user.id, user);
                yield (0, externalAccess_service_1.updateExternalAccess)(hash, { project: project._id });
                res.status(201).json({
                    _id: project._id,
                    name: project.name,
                    shortName: project.shortName,
                    leader: project.creator.username,
                });
            }
            else if (externalAccess && externalAccess.project) {
                return res
                    .status(201)
                    .json({ path: '/dashboard', project: externalAccess.project });
            }
            else {
                return res.status(201).json({ path: '/login' });
            }
        }
        else {
            if (hash === 'existing_user_new_project') {
                const user = yield UserService.findById(req.user.id);
                if (!user)
                    throw new Error(req.i18n.t('userNotAvailable'));
                const project = yield service.create(req.body, req.user.id, user);
                const token = (0, auth_service_1.createToken)(user);
                res.status(201).json({
                    _id: project._id,
                    name: project.name,
                    shortName: project.shortName,
                    leader: project.creator.username,
                    token
                });
            }
        }
    }
    catch (e) {
        next(e);
    }
});
exports.create = create;
const list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield service.list();
        res.status(201).json(project);
    }
    catch (e) {
        next(e);
    }
});
exports.list = list;
const get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield service.get(req.user.id, req.user.project);
        if (!project)
            return res.status(201).json({ resendEmail: true });
        else
            return res.status(201).json(project);
    }
    catch (e) {
        next(e);
    }
});
exports.get = get;
const getTeam = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield service.getTeam(req.user.id, req.user.project);
        if (!project)
            throw new Error(req.i18n.t('ProjectNotAvailable'));
        res.status(201).json(project);
    }
    catch (e) {
        next(e);
    }
});
exports.getTeam = getTeam;
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const project = yield service.findById(req.params.id);
        if (!project)
            throw new Error(req.i18n.t('ProjectNotAvailable'));
        res.status(201).json(project);
    }
    catch (e) {
        next(e);
    }
});
exports.findById = findById;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service.update(req.params.id, req.body);
        if (!result)
            throw new Error(req.i18n.t('ProjectNotAvailable'));
        res.status(201).json({ message: req.i18n.t('ProjectUpdatedSuccessfully') });
    }
    catch (e) {
        next(e);
    }
});
exports.update = update;
const updateRole = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service.updateRole(req.params.id, req.body);
        if (!result)
            throw new Error(req.i18n.t('ProjectNotAvailable'));
        res.status(201).json({ message: req.i18n.t('ProjectUpdatedSuccessfully') });
    }
    catch (e) {
        next(e);
    }
});
exports.updateRole = updateRole;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service.remove(req.params.id);
        if (!result)
            throw new Error(req.i18n.t('ProjectNotAvailable'));
        res.status(201).json({ message: req.i18n.t('ProjectDeletedSuccessfully') });
    }
    catch (e) {
        next(e);
    }
});
exports.remove = remove;
//# sourceMappingURL=project.controller.js.map