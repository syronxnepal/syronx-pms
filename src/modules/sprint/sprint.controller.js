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
exports.report = exports.remove = exports.updateTask = exports.close = exports.update = exports.findById = exports.current = exports.details = exports.list = exports.create = void 0;
const service = __importStar(require("./sprint.service"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sprint = yield service.create(req.user.project, req.body, req.i18n);
        res
            .status(201)
            .json({ message: req.i18n.t('SprintCreatedSuccessfully'), sprint });
    }
    catch (e) {
        next(e);
    }
});
exports.create = create;
const list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const active = req.query.active;
        const sprint = yield service.list(req.user.project, active);
        res.status(201).json(sprint);
    }
    catch (e) {
        next(e);
    }
});
exports.list = list;
const details = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sprint = yield service.details(req.user.project);
        res.status(201).json(sprint);
    }
    catch (e) {
        next(e);
    }
});
exports.details = details;
const current = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sprint = yield service.current(req.user.project);
        if (!sprint)
            throw new Error(req.i18n.t('SprintNotAvailable'));
        res.status(201).json(sprint);
    }
    catch (e) {
        next(e);
    }
});
exports.current = current;
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sprint = yield service.findById(req.params.id);
        if (!sprint)
            throw new Error(req.i18n.t('SprintNotAvailable'));
        res.status(201).json(sprint);
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
            throw new Error(req.i18n.t('SprintNotAvailable'));
        res.status(201).json({ message: req.i18n.t('SprintUpdatedSuccessfully') });
    }
    catch (e) {
        next(e);
    }
});
exports.update = update;
const close = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service.close(req.params.id);
        if (!result)
            throw new Error(req.i18n.t('SprintNotAvailable'));
        res.status(201).json({ message: req.i18n.t('SprintClosedSuccessfully') });
    }
    catch (e) {
        next(e);
    }
});
exports.close = close;
const updateTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service.updateTask(req.params.id, req.body);
        if (!result)
            throw new Error(req.i18n.t('SprintNotAvailable'));
        res.status(201).json({ message: req.i18n.t('SprintUpdatedSuccessfully') });
    }
    catch (e) {
        next(e);
    }
});
exports.updateTask = updateTask;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service.remove(req.params.id);
        if (!result)
            throw new Error(req.i18n.t('SprintNotAvailable'));
        res.status(201).json({ message: req.i18n.t('SprintDeletedSuccessfully') });
    }
    catch (e) {
        next(e);
    }
});
exports.remove = remove;
const report = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service.report(req.params.id, req.user.project);
        res.status(201).json(result);
    }
    catch (e) {
        next(e);
    }
});
exports.report = report;
//# sourceMappingURL=sprint.controller.js.map