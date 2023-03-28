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
exports.dRemove = exports.remove = exports.update = exports.dList = exports.list = exports.dCreate = exports.create = void 0;
const service = __importStar(require("./gantt-task.service"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const story = yield service.create(req.body, req.user.project);
        res
            .status(201)
            .json({ message: req.i18n.t('TaskCreatedSuccessfully'), story });
    }
    catch (e) {
        next(e);
    }
});
exports.create = create;
const dCreate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const story = yield service.dCreate(req.body, req.user.project);
        res
            .status(201)
            .json({ message: req.i18n.t('DependencyCreatedSuccessfully'), story });
    }
    catch (e) {
        next(e);
    }
});
exports.dCreate = dCreate;
const list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const story = yield service.list(req.user.project);
        res.status(201).json(story);
    }
    catch (e) {
        next(e);
    }
});
exports.list = list;
const dList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const story = yield service.dList(req.user.project);
        res.status(201).json(story);
    }
    catch (e) {
        next(e);
    }
});
exports.dList = dList;
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service.update(req.params.id, req.body);
        if (!result)
            throw new Error(req.i18n.t('TaskNotAvailable'));
        res.status(201).json({
            message: req.i18n.t('TaskUpdatedSuccessfully'),
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
            throw new Error(req.i18n.t('TaskNotAvailable'));
        res.status(201).json({
            message: req.i18n.t('TaskDeletedSuccessfully'),
        });
    }
    catch (e) {
        next(e);
    }
});
exports.remove = remove;
const dRemove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service.dRemove(req.params.id);
        if (!result)
            throw new Error(req.i18n.t('DependencyNotAvailable'));
        res.status(201).json({
            message: req.i18n.t('DependencyDeletedSuccessfully'),
        });
    }
    catch (e) {
        next(e);
    }
});
exports.dRemove = dRemove;
//# sourceMappingURL=gantt-task.controller.js.map