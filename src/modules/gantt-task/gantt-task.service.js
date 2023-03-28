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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dRemove = exports.remove = exports.update = exports.dList = exports.list = exports.dCreate = exports.create = void 0;
const gantt_task_model_1 = __importDefault(require("./gantt-task.model"));
const gantt_dependency_task_model_1 = __importDefault(require("./gantt-dependency-task.model"));
const functions_1 = require("./../../common/utils/functions");
const create = (data, project) => __awaiter(void 0, void 0, void 0, function* () { return yield gantt_task_model_1.default.create(Object.assign(Object.assign({}, data), { title: (0, functions_1.Capitalize)(data.title), project })); });
exports.create = create;
const dCreate = (data, project) => __awaiter(void 0, void 0, void 0, function* () { return yield gantt_dependency_task_model_1.default.create(Object.assign(Object.assign({}, data), { project })); });
exports.dCreate = dCreate;
const list = (project) => __awaiter(void 0, void 0, void 0, function* () { return yield gantt_task_model_1.default.find({ project }); });
exports.list = list;
const dList = (project) => __awaiter(void 0, void 0, void 0, function* () { return yield gantt_dependency_task_model_1.default.find({ project }); });
exports.dList = dList;
const update = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.title)
        data.title = (0, functions_1.Capitalize)(data.title);
    return yield gantt_task_model_1.default.findOneAndUpdate({ id: id }, data);
});
exports.update = update;
const remove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield gantt_task_model_1.default.findOneAndDelete({ parentId: id });
    return yield gantt_task_model_1.default.findOneAndDelete({ id: id });
});
exports.remove = remove;
const dRemove = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield gantt_dependency_task_model_1.default.findOneAndDelete({ id: id });
});
exports.dRemove = dRemove;
//# sourceMappingURL=gantt-task.service.js.map