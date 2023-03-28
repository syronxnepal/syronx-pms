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
exports.groupDelete = exports.remove = exports.updateMass = exports.update = exports.findById = exports.backlog = exports.sprintTask = exports.sprintList = exports.list = exports.initialCreate = exports.create = void 0;
const service = __importStar(require("./task.service"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield service.create(req.body, req.user.project, req.user.id, req.i18n);
        res.status(201).json({ message: req.i18n.t('TaskCreatedSuccessfully'), task });
    }
    catch (e) {
        next(e);
    }
});
exports.create = create;
const initialCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service.initialCreate(req.body, req.user.project, req.user.id, req.i18n);
        res.status(200).json({ message: 'CreatedSuccesfully' });
    }
    catch (e) {
        next(e);
    }
});
exports.initialCreate = initialCreate;
const list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const query = (_a = req.query.check) === null || _a === void 0 ? void 0 : _a.toString();
    const page = (_b = req.query) === null || _b === void 0 ? void 0 : _b.page;
    const limit = (_c = req.query) === null || _c === void 0 ? void 0 : _c.size;
    let startIndex;
    if (page && limit) {
        startIndex = (Number(page) - 1) * Number(limit);
    }
    try {
        const task = yield service.list(query, req.user.id, req.user.project, limit ? Number(limit) : undefined, startIndex ? startIndex : 0);
        res.status(200).json(task);
    }
    catch (e) {
        next(e);
    }
});
exports.list = list;
const sprintList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield service.sprintList(req.user.project);
        res.status(200).json(task);
    }
    catch (e) {
        next(e);
    }
});
exports.sprintList = sprintList;
const sprintTask = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield service.sprintTask(req.user.id, req.user.project, req.i18n);
        res.status(200).json(task);
    }
    catch (e) {
        next(e);
    }
});
exports.sprintTask = sprintTask;
const backlog = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield service.backlog(req.user.project);
        res.status(200).json(task);
    }
    catch (e) {
        next(e);
    }
});
exports.backlog = backlog;
const findById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task = yield service.findByIdPopulated(req.params.id);
        if (!task)
            throw new Error(req.i18n.t('TaskNotAvailable'));
        res.status(200).json(task);
    }
    catch (e) {
        next(e);
    }
});
exports.findById = findById;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newData = yield service.update(req.params.id, req.body, req.i18n);
        res.status(200).json({
            newData,
            message: req.i18n.t('SuccessfullyAddedToCurrentSprint'),
        });
    }
    catch (e) {
        next(e);
    }
});
exports.update = update;
const updateMass = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service.updateMass(req.body);
        res
            .status(200)
            .json({ message: req.i18n.t('SuccessfullyAddedToCurrentSprint') });
    }
    catch (e) {
        next(e);
    }
});
exports.updateMass = updateMass;
const remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service.remove(req.params.id);
        if (!result)
            throw new Error(req.i18n.t('TaskNotAvailable'));
        res.status(200).json({ message: req.i18n.t('TaskDeletedSuccessfully') });
    }
    catch (e) {
        next(e);
    }
});
exports.remove = remove;
const groupDelete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service.groupDelete(req.body);
        res.status(200).json({ message: req.i18n.t('TaskDeletedSuccessfully') });
    }
    catch (e) {
        next(e);
    }
});
exports.groupDelete = groupDelete;
//# sourceMappingURL=task.controller.js.map